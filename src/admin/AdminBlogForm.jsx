import React, { useEffect, useState, useRef, forwardRef, lazy, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
// TinyMCE bileşenini dinamik import ile yükle - ESM formatında
const Editor = lazy(() => import('@tinymce/tinymce-react')
  .then(module => {
    // ESM modülü doğrudan döndür
    return { default: module.Editor };
  })
);
// Highlight.js temel modülünü içe aktar
import hljs from 'highlight.js/lib/core';
// Yalnızca en yaygın kullanılan dilleri kaydet
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
// Tema stilini import et
import 'highlight.js/styles/atom-one-dark.css';

// Dilleri kaydedelim
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);

import { 
  fetchBlogById, 
  addBlogWithThumbnail, 
  updateBlogWithThumbnail, 
  deleteBlog,
  activateBlog,
  deactivateBlog
} from '../store/slices/blogSlice';
import { 
  IconPhoto, 
  IconX, 
  IconCheck, 
  IconTrash, 
  IconDeviceFloppy, 
  IconEye, 
  IconEyeOff,
  IconArrowLeft,
  IconEyeShare,
  IconExclamationCircle
} from '@tabler/icons-react';

// TinyMCE için yeni bir bileşen oluşturuyorum
const TinyEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  
  const init = {
    height: 500,
    menubar: true,
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount codesample',
    toolbar: 'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | codesample code | help',
    relative_urls: false,
    remove_script_host: false,
    convert_urls: true,
    content_style: `
      body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
      pre[class*="language-"] {
        position: relative;
        padding: 1.5rem !important;
        margin: 1rem 0;
        overflow: auto;
        border-radius: 0.5rem;
        background-color: #282c34 !important;
        border: 1px solid #444;
        padding-top: 2.5rem !important;
      }
      .mce-content-body pre[class*="language-"]::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding: 3px 10px;
        font-size: 12px;
        color: #ccc;
        background-color: #2d2d2d;
        text-align: left;
        font-family: monospace;
        border-bottom: 1px solid #444;
      }
      .mce-content-body pre.language-javascript::before { content: "JavaScript"; }
      .mce-content-body pre.language-css::before { content: "CSS"; }
      .mce-content-body pre.language-html::before, 
      .mce-content-body pre.language-markup::before { content: "HTML"; }
      .mce-content-body pre.language-typescript::before { content: "TypeScript"; }
      .mce-content-body pre.language-python::before { content: "Python"; }
      .mce-content-body pre.language-php::before { content: "PHP"; }
      .mce-content-body pre.language-java::before { content: "Java"; }
      .mce-content-body pre.language-csharp::before { content: "C#"; }
      .mce-content-body pre.language-cpp::before { content: "C++"; }
      .mce-content-body pre.language-c::before { content: "C"; }
      .mce-content-body pre.language-bash::before { content: "Bash"; }
      .mce-content-body pre.language-sql::before { content: "SQL"; }
      .mce-content-body pre.language-json::before { content: "JSON"; }
    `,
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'CSS', value: 'css' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
      { text: 'TypeScript', value: 'typescript' },
      { text: 'SQL', value: 'sql' },
      { text: 'Bash', value: 'bash' },
      { text: 'JSON', value: 'json' },
    ],
    language: 'en',
    codesample_global_prismjs: false, // Prism.js yerine highlight.js kullanacağımız için false
    skin: 'oxide-dark',
    content_css: 'dark',
    // Kod bloğu sonrası boşluk için
    end_container_on_empty_block: true,
    // Kod bloğu sorunu için özel ayarlar ve olay dinleyiciler
    setup: function(editor) {
      editor.on('init', function() {
        editor.getDoc().addEventListener('click', function(e) {
          // Kod bloğuna tıklandığında içerisinde bir kod elemanı yoksa oluştur
          if (e.target.nodeName === 'PRE' && e.target.className.includes('language-') && !e.target.querySelector('code')) {
            const code = editor.getDoc().createElement('code');
            code.className = e.target.className;
            code.innerHTML = e.target.innerHTML;
            e.target.innerHTML = '';
            e.target.appendChild(code);
            console.log('Kod elementi oluşturuldu');
          }
        });
        
        // Düzenleyicideki kod bloklarını highlight.js ile vurgula
        const highlightCodeBlocks = () => {
          try {
            const codeBlocks = editor.getDoc().querySelectorAll('pre code');
            if (codeBlocks.length > 0) {
              codeBlocks.forEach(block => {
                hljs.highlightElement(block);
              });
            }
          } catch (error) {
            console.error('Kod vurgulama hatası:', error);
          }
        };
        
        // İçerik değiştiğinde kod bloklarını vurgula
        editor.on('Change', highlightCodeBlocks);
        
        // Başlangıçta kod bloklarını vurgula
        highlightCodeBlocks();
      });
    }
  };
  
  return (
    <Suspense fallback={<div className="h-96 w-full bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">Editor yükleniyor...</div>}>
      <Editor
        apiKey="eclre3f3dtlvfd3y07ezetcslfyzxyfticytyahe3ebq5e1m"
        onInit={(evt, editor) => editorRef.current = editor}
        value={value}
        onEditorChange={onChange}
        init={init}
      />
    </Suspense>
  );
};

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentBlog = useSelector((state) => state.blogs.currentBlog);
  const loading = useSelector((state) => state.blogs.status === 'loading');
  const error = useSelector((state) => state.blogs.error);
  
  // Form modunu belirleme: id varsa ve geçerli bir değerse edit modu, değilse create modu
  const [formMode, setFormMode] = useState('create');
  useEffect(() => {
    // id parametresi varsa ve geçerli bir değerse edit modu, değilse create modu
    if (id && id !== 'undefined' && id !== 'null') {
      setFormMode('edit');
      console.log('Form modu: edit (ID:', id, ')');
    } else {
      setFormMode('create');
      console.log('Form modu: create (yeni blog)');
    }
  }, [id]);
  
  const [previewMode, setPreviewMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [slugChanged, setSlugChanged] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    author: '',
    thumbnailUrl: '',
    tags: [],
    publishDate: new Date(),
    active: true,
    slug: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
  });

  // File input ref
  const fileInputRef = useRef(null);
  
  // Resim yükleme durumu
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  
  // ReactQuill referansı
  const quillRef = useRef(null);
  
  // Form başlangıcında ve ID değiştiğinde blog verisini çek
  useEffect(() => {
    // Form verilerini sıfırla
    setFormData({
      title: '',
      content: '',
      summary: '',
      author: '',
      thumbnailUrl: '',
      tags: [],
      publishDate: new Date(),
      active: true,
      slug: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      canonicalUrl: '',
    });
    setImagePreview('');
    setThumbnailFile(null);
    
    if (id && formMode === 'edit') {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch, formMode]);
  
  // Blog verisi geldiğinde form alanlarını doldur
  useEffect(() => {
    if (currentBlog && id && formMode === 'edit') {
      const tags = currentBlog.tags ? 
        (typeof currentBlog.tags === 'string' ? 
          currentBlog.tags.split(',').map(tag => tag.trim()) : 
          currentBlog.tags) : 
        [];
      
      // Thumbnail URL'si için kontrol et
      const thumbnailUrl = currentBlog.thumbnailUrl || currentBlog.imageUrl || '';
      
      setFormData({
        title: currentBlog.title || '',
        content: currentBlog.content || '',
        summary: currentBlog.summary || '',
        author: currentBlog.author || '',
        thumbnailUrl: thumbnailUrl,
        tags: tags,
        publishDate: currentBlog.publishDate ? new Date(currentBlog.publishDate) : new Date(),
        active: currentBlog.active !== undefined ? currentBlog.active : true,
        slug: currentBlog.slug || '',
        metaTitle: currentBlog.metaTitle || '',
        metaDescription: currentBlog.metaDescription || '',
        metaKeywords: currentBlog.metaKeywords || '',
        canonicalUrl: currentBlog.canonicalUrl || '',
      });
      
      // Mevcut küçük resmi önizleme olarak ayarla
      if (thumbnailUrl) {
        setImagePreview(thumbnailUrl);
        console.log('Thumbnail önizleme ayarlandı:', thumbnailUrl);
      }
    }
  }, [currentBlog, id, formMode]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else if (name === 'slug') {
      // Slug değiştirildiğinde slugChanged durumunu true yap
      setSlugChanged(true);
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (name === 'publishDate') {
      setFormData({
        ...formData,
        [name]: new Date(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Başlık değiştiğinde ve slug manuel olarak değiştirilmediyse otomatik slug oluştur
      if (name === 'title' && !slugChanged) {
        setFormData(prev => ({
          ...prev,
          slug: generateSlug(value)
        }));
      }
    }
  };
  
  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      content
    });
  };
  
  const handleTagsChange = (e) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
    setFormData({
      ...formData,
      tags: tagsArray
    });
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Yalnızca görüntü dosyalarını kabul et
    if (!file.type.match('image.*')) {
      toast.error('Lütfen sadece resim dosyası yükleyin');
      return;
    }
    
    // Dosya boyutu kontrolü (5MB maksimum)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Resim dosyası 5MB\'dan küçük olmalıdır');
      return;
    }
    
    setImageUploading(true);
    
    // Resim dosyasını önizleme için URL'ye dönüştür
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setImageUploading(false);
      setThumbnailFile(file);
    };
    reader.onerror = () => {
      toast.error('Resim yüklenirken bir hata oluştu');
      setImageUploading(false);
    };
    reader.readAsDataURL(file);
  };
  
  const validateForm = () => {
    // Başlık zorunlu alan
    if (!formData.title.trim()) {
      toast.error('Başlık alanı zorunludur');
      return false;
    }
    
    // İçerik zorunlu alan
    if (!formData.content.trim()) {
      toast.error('İçerik alanı zorunludur');
      return false;
    }
    
    // Yeni blog ekleme durumunda küçük resim zorunlu
    if (formMode === 'create' && !thumbnailFile && !formData.thumbnailUrl) {
      toast.error('Küçük resim zorunludur');
      return false;
    }
    
    // Özet en fazla 500 karakter olabilir
    if (formData.summary.length > 500) {
      toast.error('Özet en fazla 500 karakter olabilir');
      return false;
    }
    
    // Slug URL uyumlu olmalı
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug)) {
      toast.error('Slug sadece küçük harfler, rakamlar ve tire (-) içerebilir');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormSubmitting(true);
    
    try {
      // FormData nesnesini hazırla
      const blogData = {
        title: formData.title,
        content: formData.content,
        summary: formData.summary,
        author: formData.author,
        // Tag'leri doğru formatta gönder
        tags: Array.isArray(formData.tags) ? 
          formData.tags.filter(tag => tag.trim() !== '').join(',') : 
          typeof formData.tags === 'string' ? formData.tags : '',
        publishDate: formData.publishDate.toISOString(),
        active: formData.active,
        slug: formData.slug,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords,
        canonicalUrl: formData.canonicalUrl,
        // Mevcut thumbnail URL'sini ekle - backend bunu bekliyor (null constraint hatası almamak için)
        thumbnailUrl: formData.thumbnailUrl || '',
      };
      
      // Eğer düzenleme modundaysa, ID'yi ve imageUrl'i ekle
      if (formMode === 'edit' && id) {
        blogData.id = id;
        // Güncelleme sırasında imageUrl alanı da gönderiliyor (ama yeni oluşturmada gönderilmiyor)
        blogData.imageUrl = formData.thumbnailUrl || '';
      }
      
      console.log(`Blog ${formMode === 'create' ? 'oluşturuluyor' : 'güncelleniyor'}:`, { blogData, hasImage: !!thumbnailFile });
      
      let result;
      
      if (formMode === 'create') {
        console.log('Yeni blog oluşturuluyor');
        // Yeni blog oluştur
        try {
          result = await dispatch(addBlogWithThumbnail({
            blogData,
            thumbnailFile
          })).unwrap();
          
          toast.success('Blog başarıyla oluşturuldu');
          // Yeni blogun düzenleme sayfasına yönlendir
          navigate(`/admin/blogs/edit/${result.id}`);
        } catch (createError) {
          console.error('Blog oluşturma hatası:', createError);
          let errorMessage = 'Blog oluşturulurken bir hata oluştu';
          
          if (createError?.response?.data?.message) {
            errorMessage = createError.response.data.message;
          } else if (createError?.response?.data?.data) {
            errorMessage = createError.response.data.data;
          } else if (createError?.message) {
            errorMessage = createError.message;
          }
          
          toast.error(`Hata: ${errorMessage}`);
          setFormSubmitting(false);
          throw createError;
        }
      } else if (formMode === 'edit' && id) {
        console.log('Mevcut blog güncelleniyor, ID:', id);
        try {
          // Mevcut blogu güncelle
          result = await dispatch(updateBlogWithThumbnail({
            blogData,
            thumbnailFile
          })).unwrap();
          
          toast.success('Blog başarıyla güncellendi');
        } catch (updateError) {
          console.error('Blog güncelleme hatası:', updateError?.message || updateError);
          
          let errorMessage = 'Blog güncellenirken bir hata oluştu';
          
          // Backend'den gelen hata mesajlarını göster
          if (updateError?.response?.data?.message) {
            errorMessage = updateError.response.data.message;
          } else if (updateError?.response?.data?.data) {
            errorMessage = updateError.response.data.data;
            
            // SQL hatası için özel mesaj
            if (errorMessage.includes("image_url") || errorMessage.includes("thumbnail")) {
              errorMessage = "Resim URL alanı boş olamaz. Lütfen bir resim yükleyin.";
            }
          } else if (updateError?.message) {
            errorMessage = updateError.message;
          }
          
          toast.error(`Hata: ${errorMessage}`);
          setFormSubmitting(false);
          throw updateError; // Hata zincirini devam ettir
        }
      } else {
        // Geçersiz mod veya ID
        toast.error('Geçersiz işlem. Form modu veya ID hatalı.');
        console.error('Geçersiz form modu veya ID:', { formMode, id });
        setFormSubmitting(false);
        return;
      }
      
      // Form durumunu güncelle
      setFormSubmitting(false);
      
    } catch (error) {
      console.error('Form gönderimi sırasında hata:', error);
      const errorMessage = error?.response?.data?.message || 
                         error?.message || 
                         'Beklenmeyen bir hata oluştu';
      toast.error(`Hata: ${errorMessage}`);
      setFormSubmitting(false);
    }
  };
  
  const handleDelete = () => {
    if (confirmDelete) {
      setFormSubmitting(true);
      
      dispatch(deleteBlog(id))
        .unwrap()
        .then(() => {
          toast.success('Blog başarıyla silindi');
          navigate('/admin/blogs');
        })
        .catch(error => {
          console.error('Silme hatası:', error);
          toast.error('Blog silinirken bir hata oluştu');
          setFormSubmitting(false);
          setConfirmDelete(false);
        });
    } else {
      setConfirmDelete(true);
    }
  };
  
  const handleToggleStatus = async () => {
    try {
      setFormSubmitting(true);
      
      if (formData.active) {
        await dispatch(deactivateBlog(id)).unwrap();
        setFormData(prev => ({ ...prev, active: false }));
        toast.success('Blog pasif durumuna getirildi');
      } else {
        await dispatch(activateBlog(id)).unwrap();
        setFormData(prev => ({ ...prev, active: true }));
        toast.success('Blog aktif durumuna getirildi');
      }
      
      setFormSubmitting(false);
    } catch (error) {
      console.error('Durum değiştirme hatası:', error);
      toast.error('Durum değiştirirken bir hata oluştu');
      setFormSubmitting(false);
    }
  };
  
  const handlePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  const renderPreview = () => {
    return (
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
        
        {imagePreview && (
          <div className="mb-6">
            <img 
              src={imagePreview} 
              alt={formData.title} 
              className="w-full h-auto rounded-lg" 
            />
          </div>
        )}
        
        {formData.author && (
          <div className="mb-4 text-gray-600">
            <span>Yazar: {formData.author}</span>
          </div>
        )}
        
        {formData.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {formData.summary && (
          <div className="mb-6 italic text-gray-600 border-l-4 border-gray-300 pl-4">
            {formData.summary}
          </div>
        )}
        
        <div className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: formData.content }}
        />
      </div>
    );
  };
  
  const generateSlug = (text) => {
    return text
      .toString()
      .normalize('NFD')           // Normalize accented characters
      .replace(/[\u0300-\u036f]/g, '')  // Remove diacritics
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')     // Replace multiple - with single -
      .replace(/^-+/, '')         // Trim - from start of text
      .replace(/-+$/, '');        // Trim - from end of text
  };

  const tabButtonClass = (tabName) => 
    `px-4 py-2 rounded-t-lg ${activeTab === tabName 
      ? 'bg-gray-700 text-white font-medium' 
      : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`;

  // Yükleniyor durumu göster
  if (loading && !formSubmitting && id) {
    return (
      <div className="flex justify-center items-center h-full py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Hata durumu göster
  if (error && !formSubmitting && id) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <IconExclamationCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Blog yüklenirken bir hata oluştu</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => navigate('/admin/blogs')}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
        >
          Blog Listesine Dön
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Üst Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="text-gray-400 hover:text-white bg-gray-700 p-2 rounded-lg"
          >
            <IconArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-white">
            {formMode === 'create' ? 'Yeni Blog Yazısı' : 'Blog Yazısını Düzenle'}
          </h1>
          {formMode === 'edit' && (
            <span className={`px-2 py-1 rounded-full text-xs ${formData.active ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
              {formData.active ? 'Aktif' : 'Pasif'}
            </span>
          )}
        </div>
        
        <div className="flex space-x-3">
          {/* Önizleme Butonu */}
          <button
            type="button"
            onClick={handlePreview}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center transition-colors"
            disabled={formSubmitting}
          >
            <IconEyeShare className="h-5 w-5 mr-2" />
            {previewMode ? 'Düzenlemeye Dön' : 'Önizle'}
          </button>
          
          {/* Durum Değiştir Butonu (sadece düzenleme modunda) */}
          {formMode === 'edit' && (
            <button
              type="button"
              onClick={handleToggleStatus}
              className={`px-4 py-2 ${formData.active ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white rounded-lg flex items-center transition-colors`}
              disabled={formSubmitting}
            >
              {formData.active ? (
                <>
                  <IconEyeOff className="h-5 w-5 mr-2" />
                  Pasif Yap
                </>
              ) : (
                <>
                  <IconEye className="h-5 w-5 mr-2" />
                  Aktif Yap
                </>
              )}
            </button>
          )}
          
          {/* Kaydet Butonu */}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center transition-colors"
            disabled={formSubmitting}
          >
            {formSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            ) : (
              <IconDeviceFloppy className="h-5 w-5 mr-2" />
            )}
            Kaydet
          </button>
          
          {/* Sil Butonu (sadece düzenleme modunda) */}
          {formMode === 'edit' && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center transition-colors"
              disabled={formSubmitting}
            >
              <IconTrash className="h-5 w-5 mr-2" />
              {confirmDelete ? 'Emin misiniz?' : 'Sil'}
            </button>
          )}
        </div>
      </div>
      
      {/* Önizleme Modu */}
      {previewMode ? (
        renderPreview()
      ) : (
        // Form
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Tab Butonları */}
          <div className="flex border-b border-gray-700">
            <button
              type="button"
              className={tabButtonClass('general')}
              onClick={() => setActiveTab('general')}
            >
              Genel Bilgiler
            </button>
            <button
              type="button"
              className={tabButtonClass('content')}
              onClick={() => setActiveTab('content')}
            >
              İçerik
            </button>
            <button
              type="button"
              className={tabButtonClass('seo')}
              onClick={() => setActiveTab('seo')}
            >
              SEO
            </button>
          </div>
          
          {/* Genel Bilgiler Tab İçeriği */}
          <div className={activeTab === 'general' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 gap-6">
              {/* Başlık */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Başlık <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Blog yazısı başlığı"
                  required
                />
              </div>
              
              {/* Slug */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-300 mb-1">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="blog-yazisi-basligi"
                  required
                />
                <p className="mt-1 text-sm text-gray-400">
                  URL dostu format. Örnek: blog-yazisi-basligi
                </p>
              </div>
              
              {/* Özet */}
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-1">
                  Özet
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Blog yazısının kısa özeti"
                ></textarea>
                <p className="mt-1 text-sm text-gray-400">
                  {formData.summary.length}/500 karakter
                </p>
              </div>
              
              {/* Yazar */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
                  Yazar
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Yazar adı"
                />
              </div>
              
              {/* Etiketler */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                  Etiketler
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="hukuk, ceza, avukat"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Virgülle ayırın. Örn: hukuk, ceza, avukat
                </p>
              </div>
              
              {/* Yayın Tarihi */}
              <div>
                <label htmlFor="publishDate" className="block text-sm font-medium text-gray-300 mb-1">
                  Yayın Tarihi
                </label>
                <input
                  type="date"
                  id="publishDate"
                  name="publishDate"
                  value={formData.publishDate ? formData.publishDate.toISOString().split('T')[0] : ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              {/* Aktif/Pasif Durumu */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-600 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-300">
                  Blog Aktif
                </label>
              </div>
              
              {/* Küçük Resim */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Küçük Resim {formMode === 'create' && <span className="text-red-500">*</span>}
                </label>
                
                <div className="mt-1 flex items-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Thumbnail preview"
                        className="h-32 w-auto object-contain rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setThumbnailFile(null);
                          setFormData(prev => ({ ...prev, thumbnailUrl: '' }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                      >
                        <IconX className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="h-32 w-32 border-2 border-dashed border-gray-600 rounded-md flex items-center justify-center hover:border-gray-500 transition-colors"
                    >
                      {imageUploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-500"></div>
                      ) : (
                        <IconPhoto className="h-8 w-8 text-gray-400" />
                      )}
                    </button>
                  )}
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleThumbnailChange}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {!imagePreview && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="ml-5 px-3 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Resim Seç
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  PNG, JPG, GIF, WEBP formatları desteklenir (max. 5MB)
                </p>
              </div>
            </div>
          </div>
          
          {/* İçerik Tab İçeriği */}
          <div className={activeTab === 'content' ? 'block' : 'hidden'}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  İçerik <span className="text-red-500">*</span>
                </label>
                <TinyEditor 
                  value={formData.content} 
                  onChange={handleEditorChange} 
                />
              </div>
            </div>
          </div>
          
          {/* SEO Tab İçeriği */}
          <div className={activeTab === 'seo' ? 'block' : 'hidden'}>
            <div className="grid grid-cols-1 gap-6">
              {/* Meta Başlık */}
              <div>
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-300 mb-1">
                  Meta Başlık
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="SEO için meta başlık"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Boş bırakılırsa normal başlık kullanılacaktır.
                </p>
              </div>
              
              {/* Meta Açıklama */}
              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-300 mb-1">
                  Meta Açıklama
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="SEO için meta açıklama"
                ></textarea>
                <p className="mt-1 text-sm text-gray-400">
                  {formData.metaDescription.length}/160 karakter (ideal: 120-160)
                </p>
              </div>
              
              {/* Meta Anahtar Kelimeler */}
              <div>
                <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-300 mb-1">
                  Meta Anahtar Kelimeler
                </label>
                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="anahtar,kelime,örnek"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Virgülle ayırın. Örn: hukuk, ceza hukuku, avukat
                </p>
              </div>
              
              {/* Canonical URL */}
              <div>
                <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-300 mb-1">
                  Canonical URL
                </label>
                <input
                  type="text"
                  id="canonicalUrl"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="https://example.com/blog/ornek-yazi"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Boş bırakılırsa otomatik oluşturulur. İçerik başka bir URL'den kopyalandıysa orijinal URL'yi girin.
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminBlogForm; 
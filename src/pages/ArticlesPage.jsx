import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPaginatedBlogs, searchBlogsByTitle, searchBlogsByTag } from '../store/slices/blogSlice';
import { formatDate } from '../utils/dateUtils';
import { FaSearch } from 'react-icons/fa';
import Loader from '../components/Loader';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

// Hero variants for animation
const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3,
      duration: 0.5
    }
  }
};

// Blog kartındaki yazar avatar bileşeni
const AuthorAvatar = ({ author = "Av. Emre Okur", imageUrl = null }) => {
  // Yazarın baş harflerini al
  const initials = author
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2); // En fazla 2 harf alıyoruz
  
  // Eğer resim varsa onu göster, yoksa baş harflerini göster
  return imageUrl ? (
    <img
      src={imageUrl}
      alt={author}
      className="w-8 h-8 rounded-full mr-2 object-cover"
    />
  ) : (
    <div className="w-8 h-8 rounded-full mr-2 bg-blue-700 flex items-center justify-center text-white font-bold text-xs">
      {initials}
    </div>
  );
};

// Etiketleri göstermek için yardımcı fonksiyon
const BlogTags = ({ tags }) => {
  // Etiketler string veya dizi olabilir
  let tagArray = [];
  
  if (tags) {
    if (typeof tags === 'string') {
      // Virgülle ayrılmış string'i diziye çevir
      tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    } else if (Array.isArray(tags)) {
      // Zaten dizi ise direkt kullan
      tagArray = tags.filter(tag => tag);
    }
  }
  
  // Etiket yoksa gösterme
  if (tagArray.length === 0) return null;
  
  // Maksimum 3 etiket göster
  const displayTags = tagArray.slice(0, 3);
  
  return (
    <div className="flex flex-wrap gap-1 mt-2 mb-3">
      {displayTags.map((tag, index) => (
        <span 
          key={index} 
          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
      {tagArray.length > 3 && (
        <span className="text-xs text-gray-500 px-1 py-1">
          +{tagArray.length - 3} daha
        </span>
      )}
    </div>
  );
};

const ArticlesPage = () => {
  const dispatch = useDispatch();
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // 'title' veya 'tag'
  const [currentPage, setCurrentPage] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [lastSearch, setLastSearch] = useState({ term: '', type: '' });
  
  // Redux store'dan state'i al
  const blogsState = useSelector((state) => state.blogs);
  const { paginatedBlogs = {}, searchResults = {} } = blogsState;
  
  const pageSize = 6; // Sayfada gösterilecek blog yazısı sayısı
  
  // Hangi içeriği görüntüleyeceğimizi belirle - varsayılan değerler sağla
  const content = isSearchActive 
    ? searchResults?.content || [] 
    : paginatedBlogs?.content || [];
  const totalPages = isSearchActive 
    ? searchResults?.totalPages || 0 
    : paginatedBlogs?.totalPages || 0;
  const loading = isSearchActive 
    ? searchResults?.loading || false 
    : paginatedBlogs?.loading || false;
  const error = isSearchActive 
    ? searchResults?.error || null 
    : paginatedBlogs?.error || null;
  
  // Debug için Redux state'ini konsola yazdır
  useEffect(() => {
    console.log('Redux Blog State:', blogsState);
    console.log('İçerik durumu:', { 
      isSearchActive,
      paginatedContent: paginatedBlogs?.content, 
      searchContent: searchResults?.content 
    });
  }, [blogsState, isSearchActive]);
  
  // Sayfa yüklendiğinde verileri getir
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Eğer arama aktifse ve yeni arama yapıldıysa veya sayfa değiştiyse
    if (isSearchActive && lastSearch.term) {
      console.log('Arama sayfası değişti:', currentPage);
      
      if (lastSearch.type === 'title') {
        dispatch(searchBlogsByTitle({ title: lastSearch.term, page: currentPage, size: pageSize }));
      } else {
        dispatch(searchBlogsByTag({ tag: lastSearch.term, page: currentPage, size: pageSize }));
      }
    } 
    // Arama aktif değilse ve normal sayfalama yapılıyorsa
    else if (!isSearchActive) {
      console.log('Normal sayfalama:', currentPage);
      dispatch(fetchPaginatedBlogs({ page: currentPage, size: pageSize }));
    }
  }, [dispatch, currentPage, isSearchActive, lastSearch]);
  
  // Arama işlemi
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      console.log('Arama başlatılıyor:', searchTerm, 'Tip:', searchType);
      setIsSearchActive(true);
      setCurrentPage(0); // Arama yapılırken ilk sayfaya dön
      setLastSearch({ term: searchTerm, type: searchType }); // Arama bilgilerini kaydet
      
      if (searchType === 'title') {
        console.log('Başlık araması yapılıyor:', searchTerm);
        dispatch(searchBlogsByTitle({ title: searchTerm, page: 0, size: pageSize }));
      } else {
        console.log('Etiket araması yapılıyor:', searchTerm);
        dispatch(searchBlogsByTag({ tag: searchTerm, page: 0, size: pageSize }));
      }
    } else {
      setIsSearchActive(false);
      setLastSearch({ term: '', type: '' });
      setCurrentPage(0);
      dispatch(fetchPaginatedBlogs({ page: 0, size: pageSize }));
    }
  };
  
  // Sayfa değiştirme
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  // Arama tipini değiştirme
  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };
  
  // Arama alanını temizle
  const handleResetSearch = () => {
    setSearchTerm('');
    setIsSearchActive(false);
    setLastSearch({ term: '', type: '' });
    setCurrentPage(0);
    dispatch(fetchPaginatedBlogs({ page: 0, size: pageSize }));
  };
  
  return (
    <AnimatedPage>
      {/* React 19'un yeni meta veri etiketleri */}
      <title>Hukuki Makaleler | Av. Emre Okur - Uzman Hukuki Danışmanlık</title>
      <meta 
        name="description" 
        content="Hukuk alanında uzman avukatımızın kaleme aldığı güncel hukuki makaleleri okuyun. Çeşitli yasal konularda bilgi edinebilir ve hukuki görüşlerimizden faydalanabilirsiniz."
      />

      <section className="bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-10 md:mb-16"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary-900">
              Makaleler
            </h1>
          </motion.div>
          
          {/* Search Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="p-1 bg-gradient-to-r from-blue-800 to-indigo-800 rounded-xl shadow-lg">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-lg">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Makale ara..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 pl-10"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-gray-700"
                  >
                    <option value="title">Başlık</option>
                    <option value="tag">Etiket</option>
                  </select>
                  
                  <button
                    type="submit"
                    className="w-full md:w-auto min-w-[120px] px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-2 font-bold shadow-md"
                  >
                    <FaSearch size={18} className="text-white" />
                    <span>ARA</span>
                  </button>
                  
                  {isSearchActive && (
                    <button
                      type="button"
                      onClick={handleResetSearch}
                      className="w-full md:w-auto min-w-[120px] px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center font-medium shadow-sm"
                    >
                      Temizle
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          
          {/* Content Section */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader />
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-600 text-lg">{error}</p>
                <button
                  onClick={() => dispatch(fetchPaginatedBlogs({ page: 0, size: pageSize }))}
                  className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Tekrar Dene
                </button>
              </div>
            ) : !content || content.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {isSearchActive
                    ? `"${searchTerm}" ile ilgili makale bulunamadı`
                    : "Henüz makale bulunmuyor"}
                </h2>
                {isSearchActive && (
                  <button
                    onClick={handleResetSearch}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Tüm Makaleleri Göster
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* İçerik Başlığı */}
                {isSearchActive && (
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {searchType === 'title'
                        ? `"${searchTerm}" başlığı ile ilgili makaleler`
                        : `"${searchTerm}" etiketi ile ilgili makaleler`}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Toplam {blogsState.totalElements || content.length} sonuç bulundu
                    </p>
                  </div>
                )}
                
                {/* Makale Kartları */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {content.map((blog) => (
                    <motion.article
                      key={blog.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
                      whileHover={{ y: -5 }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <Link to={`/makale/${blog.slug}`} className="block h-48 overflow-hidden">
                        <img
                          src={blog.thumbnailUrl || '/images/default-blog.jpg'}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center mb-1">
                          <span className="text-xs text-gray-500">{formatDate(blog.createdAt)}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-xs text-primary-600 font-medium">
                          <BlogTags tags={blog.tags} />
                          </span>
                        </div>
                        
                        
                        <Link to={`/blog/${blog.slug}`} className="block mb-3">
                          <h2 className="text-xl font-bold text-gray-800 hover:text-primary-600 transition-colors">
                            {blog.title}
                          </h2>
                        </Link>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {blog.summary || (blog.content ? blog.content.slice(0, 120) + '...' : '')}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                          <div className="flex items-center">
                            <AuthorAvatar 
                              author={blog.author || "Av. Emre Okur"} 
                              imageUrl={blog.authorImageUrl || null} 
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {blog.author || "Av. Emre Okur"}
                            </span>
                          </div>
                          
                          <Link
                            to={`/blog/${blog.slug}`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            Devamını Oku →
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className={`px-3 py-1 mx-1 rounded ${
                        currentPage === 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      &laquo;
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                      const pageNumber = currentPage < 2 ? index : 
                                        currentPage >= totalPages - 2 ? totalPages - 5 + index : 
                                        currentPage - 2 + index;
                      
                      if (pageNumber >= 0 && pageNumber < totalPages) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`px-3 py-1 mx-1 rounded ${
                              currentPage === pageNumber
                                ? 'bg-primary-700 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                            }`}
                          >
                            {pageNumber + 1}
                          </button>
                        );
                      }
                      return null;
                    })}
                    
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage === totalPages - 1}
                      className={`px-3 py-1 mx-1 rounded ${
                        currentPage === totalPages - 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      }`}
                    >
                      &raquo;
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default ArticlesPage; 
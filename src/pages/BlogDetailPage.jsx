import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogBySlug, fetchBlogs, fetchLatestBlogs, resetCurrentBlog } from '../store/slices/blogSlice';
import { formatDate } from '../utils/dateUtils';
import { motion } from 'framer-motion';
import './BlogDetail.css';

const BlogDetailPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [hasFetchedBySlug, setHasFetchedBySlug] = useState(false);
  const [hasFetchedLatest, setHasFetchedLatest] = useState(false);
  
  // Redux store'dan doğrudan blogs state'i al
  const blogsState = useSelector((state) => state.blogs);
  const allBlogs = blogsState.blogs || [];
  const latestBlogs = blogsState.latestBlogs || [];
  const loading = blogsState.status === 'loading';
  const error = blogsState.error;
  
  // Eğer currentBlog varsa onu kullan, yoksa slug'a göre blog bul
  const currentBlog = blogsState.currentBlog || 
                      allBlogs.find(blog => blog.slug === slug || blog.id === slug);

  // Sayfa değiştiğinde en üste kaydır ve currentBlog'u sıfırla
  useEffect(() => {
    // Redux store'daki mevcut blog bilgisini temizle
    dispatch(resetCurrentBlog());
    
    // Sayfa değiştiğinde en üste kaydır
    window.scrollTo(0, 0);
    
    // Yeni slug geldiğinde fetch durumunu sıfırla
    setHasFetchedBySlug(false);
    
    return () => {
      // Bileşen unmount olduğunda da currentBlog'u temizle
      dispatch(resetCurrentBlog());
    };
  }, [dispatch, slug]);
  
  // Blog detayını getir
  useEffect(() => {
    // Eğer detay henüz yoksa ve daha önce istek göndermediyse
    if (slug && !hasFetchedBySlug && blogsState.status !== 'loading') {
      console.log('fetchBlogBySlug çağrılıyor:', slug);
      dispatch(fetchBlogBySlug(slug));
      setHasFetchedBySlug(true);
    }
  }, [dispatch, slug, hasFetchedBySlug, blogsState.status]);
  
  // Tüm blogları getir
  useEffect(() => {
    if (!allBlogs.length && blogsState.status !== 'loading') {
      console.log('fetchBlogs çağrılıyor');
      dispatch(fetchBlogs());
    }
  }, [dispatch, allBlogs.length, blogsState.status]);
  
  // Son makaleleri getir
  useEffect(() => {
    if (!hasFetchedLatest && blogsState.status !== 'loading') {
      console.log('fetchLatestBlogs çağrılıyor');
      dispatch(fetchLatestBlogs(5));
      setHasFetchedLatest(true);
    }
  }, [dispatch, hasFetchedLatest, blogsState.status]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 max-w-screen-lg mx-auto px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Bir hata oluştu</h2>
          <p className="text-red-500">{error}</p>
          <p className="mt-3 text-red-400">Slug: {slug}</p>
          
          <div className="mt-6">
            <Link 
              to="/makaleler" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tüm Makalelere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="w-full py-12 max-w-screen-lg mx-auto px-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-600">Blog yazısı bulunamadı</h2>
          <p className="text-gray-500 mt-4">Slug: {slug}</p>
          
          <div className="mt-6">
            <Link 
              to="/makaleler" 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tüm Makalelere Dön
            </Link>
          </div>
          
          <div className="mt-8 text-left">
            <p className="font-semibold">Redux Blog Durumu:</p>
            <pre className="mt-2 text-sm bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify({
                blogCount: allBlogs.length,
                status: blogsState.status,
                error: blogsState.error || "yok",
                slug
              }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // Son 5 makale, mevcut makaleyi hariç tut
  const filteredLatestBlogs = latestBlogs
    .filter(blog => blog.id !== currentBlog.id)
    .slice(0, 5);

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* İçerik başlığı */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">{currentBlog.title}</h1>
          
          {/* Blog meta bilgileri */}
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <span>{formatDate(currentBlog.publishDate || currentBlog.createdAt)}</span>
            <span className="mx-2">•</span>
            <span>{currentBlog.author || 'Emre Okur'}</span>
          </div>
          
          {/* Etiketler */}
          {currentBlog.tags && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {typeof currentBlog.tags === 'string' 
                ? currentBlog.tags.split(',').map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {tag.trim()}
                    </span>
                  ))
                : Array.isArray(currentBlog.tags) 
                  ? currentBlog.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {tag}
                      </span>
                    ))
                  : null
              }
            </div>
          )}
        </motion.div>
        
        {/* Blog kapak resmi */}
        {currentBlog.thumbnailUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-10 max-w-4xl mx-auto"
          >
            <img 
              src={currentBlog.thumbnailUrl} 
              alt={currentBlog.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg" 
            />
          </motion.div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Ana içerik */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:w-3/4"
          >
            <article className="bg-white p-6 md:p-10 rounded-xl shadow-sm">
              {/* Blog özet */}
              {currentBlog.summary && (
                <div className="mb-8 text-lg italic text-gray-600 border-l-4 border-blue-500 pl-4 py-2">
                  {currentBlog.summary}
                </div>
              )}
              
              {/* Blog içeriği - TinyMCE için özel CSS sınıfı kullanıyoruz */}
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: currentBlog.content }}
              />
              
              {/* Geri dön butonu */}
              <div className="mt-12">
                <Link 
                  to="/makaleler" 
                  className="inline-block px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  &larr; Tüm Makalelere Dön
                </Link>
              </div>
            </article>
          </motion.div>
          
          {/* Yan panel - Son makaleler */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="lg:w-1/4"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-gray-100">
                Son Makaleler
              </h3>
              
              {filteredLatestBlogs.length === 0 ? (
                <p className="text-gray-500 italic">Henüz başka makale bulunmuyor.</p>
              ) : (
                <div className="space-y-6">
                  {filteredLatestBlogs.map((blog) => (
                    <div key={blog.id} className="group">
                      <Link to={`/makale/${blog.slug}`} className="block">
                        {blog.thumbnailUrl && (
                          <div className="mb-2 overflow-hidden rounded-lg">
                            <img 
                              src={blog.thumbnailUrl} 
                              alt={blog.title}
                              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                        )}
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(blog.publishDate || blog.createdAt)}
                        </p>
                      </Link>
                    </div>
                  ))}
                  
                  <Link 
                    to="/makaleler" 
                    className="inline-block w-full text-center mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Tüm Makaleleri Gör
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage; 
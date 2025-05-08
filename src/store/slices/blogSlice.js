import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunks
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/blogs');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog yazıları yüklenemedi'
      );
    }
  }
);

// Sayfalı olarak blogları getir
export const fetchPaginatedBlogs = createAsyncThunk(
  'blogs/fetchPaginated',
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/paginated?page=${page}&size=${size}`);
      console.log('API Yanıtı (Paginated Blogs):', response.data);
      
      // API yanıtının içeriğini kontrol et
      const responseData = response.data.data || response.data;
      
      // Yanıt yapısını standardize et (content, totalPages vb. alanları içerecek şekilde)
      const formattedData = {
        content: Array.isArray(responseData) ? responseData : responseData.content || [],
        totalPages: responseData.totalPages || 1,
        totalElements: responseData.totalElements || (Array.isArray(responseData) ? responseData.length : 0),
        number: responseData.number || page,
        size: responseData.size || size
      };
      
      console.log('Formatlanmış Veri:', formattedData);
      return formattedData;
    } catch (error) {
      console.error('Blog listesi yüklenirken hata:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Blog yazıları yüklenemedi'
      );
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog yazısı bulunamadı'
      );
    }
  }
);

// Slug ile blog getir
export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      console.log('fetchBlogBySlug çağrıldı, slug:', slug);
      // Eğer backend'de slug ile blog getirme endpoint'i varsa onu kullan
      const response = await api.get(`/blogs/slug/${slug}`);
      return response.data.data;
    } catch (error) {
      console.error('Blog slug ile getirilirken hata:', error);
      // Eğer backend'de özel bir endpoint yoksa ve ID olarak kullanıyorsa
      try {
        // İlk deneme başarısız olduysa direkt slug değerini ID olarak kullanmayı dene
        console.log('Alternatif olarak slug değeri ID olarak deneniyor');
        const fallbackResponse = await api.get(`/blogs/${slug}`);
        return fallbackResponse.data.data;
      } catch (fallbackError) {
        console.error('Blog ID olarak slug kullanılarak getirilirken de hata:', fallbackError);
        return rejectWithValue(
          fallbackError.response?.data?.message || 'Blog yazısı bulunamadı'
        );
      }
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blogData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Blog verilerini formData'ya ekle
      Object.keys(blogData).forEach(key => {
        if (key === 'thumbnail') {
          if (blogData[key] && blogData[key] instanceof File) {
            formData.append('thumbnail', blogData[key]);
          }
        } else {
          formData.append(key, blogData[key]);
        }
      });
      
      const response = await api.post('/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog yazısı oluşturulamadı'
      );
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, blogData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      // Blog verilerini formData'ya ekle
      Object.keys(blogData).forEach(key => {
        if (key === 'thumbnail') {
          if (blogData[key] && blogData[key] instanceof File) {
            formData.append('thumbnail', blogData[key]);
          }
        } else {
          formData.append(key, blogData[key]);
        }
      });
      
      const response = await api.put(`/blogs/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog yazısı güncellenemedi'
      );
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/blogs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog yazısı silinemedi'
      );
    }
  }
);

export const toggleBlogStatus = createAsyncThunk(
  'blogs/toggleStatus',
  async ({ id, active }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/blogs/${id}/status`, { active });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog durumu değiştirilemedi'
      );
    }
  }
);

// Blog aktif etme
export const activateBlog = createAsyncThunk(
  'blogs/activate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/blogs/${id}/status`, { active: true });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog aktif edilemedi'
      );
    }
  }
);

// Blog pasif etme
export const deactivateBlog = createAsyncThunk(
  'blogs/deactivate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/blogs/${id}/status`, { active: false });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Blog pasif edilemedi'
      );
    }
  }
);

// Blog ve thumbnail ekleme
export const addBlogWithThumbnail = createAsyncThunk(
  'blogs/addWithThumbnail',
  async ({ blogData, thumbnailFile }, { rejectWithValue }) => {
    try {
      console.log('addBlogWithThumbnail başlatıldı');
      
      // Yeni blog ekleme işleminde backend'in kabul ettiği alanları belirle
      // imageUrl alanını kaldır - backend CreateBlogRequest'te bu alanı tanımıyor
      const createBlogData = { ...blogData };
      
      // ID belirtilmiş olsa bile yeni blog oluşturuyoruz, ID'yi kaldıralım
      if (createBlogData.id) {
        delete createBlogData.id;
      }
      
      // imageUrl alanını kaldır
      if (createBlogData.imageUrl) {
        delete createBlogData.imageUrl;
      }
      
      console.log('Blog verisi (filtrelenmiş):', createBlogData);
      
      const formData = new FormData();
      
      // Blog verilerini JSON formatında ekle
      formData.append('blogData', JSON.stringify(createBlogData));
      console.log('blogData formData\'ya JSON olarak eklendi');
      
      // Thumbnail dosyası varsa ekle
      if (thumbnailFile) {
        try {
          formData.append('thumbnail', thumbnailFile);
          console.log('Thumbnail eklendi:', thumbnailFile.name);
        } catch (thumbnailError) {
          console.error('Thumbnail eklenirken hata:', thumbnailError);
        }
      } else {
        console.log('Thumbnail bulunamadı');
      }
      
      // API isteği gönderme
      console.log('API isteği gönderim öncesi...');
      
      try {
        // Swagger'dan görülen doğru endpoint 
        const response = await api.post('/blogs/create-with-thumbnail', formData);
        
        console.log('API yanıtı:', response.data);
        return response.data.data;
      } catch (apiError) {
        console.error('API isteği sırasında hata:', apiError);
        console.error('API hata detayları:', {
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data,
          message: apiError.message
        });
        
        // Yetkilendirme hatası (401) ise özel mesaj göster
        if (apiError.response?.status === 401) {
          return rejectWithValue('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
        }
        
        throw apiError;
      }
    } catch (error) {
      console.error('Blog eklerken hata oluştu:', error);
      console.error('Hata detayları:', error.response?.data);
      
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Blog yazısı oluşturulamadı'
      );
    }
  }
);

// Blog ve thumbnail güncelleme
export const updateBlogWithThumbnail = createAsyncThunk(
  'blogs/updateWithThumbnail',
  async ({ blogData, thumbnailFile }, { rejectWithValue }) => {
    try {
      console.log('updateBlogWithThumbnail başlatıldı:', blogData);
      
      // ID değerinin undefined olmamasını sağla
      const id = blogData.id;
      if (!id) {
        console.error('Blog ID değeri eksik!');
        return rejectWithValue('Blog ID değeri gereklidir. Güncelleme işlemi yapılamıyor.');
      }
      
      // Backend'in güncelleme isteğinde beklediği alan yapısını doğru şekilde hazırla
      const updateData = { ...blogData };
      
      // Eksik veya boş thumbnailUrl/imageUrl için kontrol
      if (!updateData.thumbnailUrl && !updateData.imageUrl) {
        console.warn('Uyarı: thumbnailUrl ve imageUrl değerleri eksik veya boş!');
        // Backend veritabanı kısıtlaması için varsayılan değer ekle
        updateData.thumbnailUrl = updateData.thumbnailUrl || updateData.imageUrl || 'placeholder.jpg';
        updateData.imageUrl = updateData.imageUrl || updateData.thumbnailUrl || 'placeholder.jpg';
      }
      
      // Eğer thumbnail yoksa normal JSON isteği gönder (FormData kullanma)
      if (!thumbnailFile) {
        console.log('Thumbnail yok, normal JSON isteği gönderiliyor...');
        
        try {
          // Blog verilerini normal JSON olarak gönder
          console.log('Güncellenecek veri:', updateData);
          const response = await api.put(`/blogs/${id}`, updateData);
          console.log('API yanıtı (JSON):', response.data);
          return response.data.data;
        } catch (apiError) {
          console.error('API JSON isteği sırasında hata:', apiError);
          console.error('Hata detayları:', apiError.response?.data);
          
          // Veritabanı kısıtlama hatası için özel işlem
          if (apiError.response?.data?.data?.includes('image_url') || 
              apiError.response?.data?.data?.includes('constraint')) {
            return rejectWithValue('Resim URL alanı boş olamaz. Lütfen bir resim yükleyin.');
          }
          
          throw apiError;
        }
      }
      
      // Thumbnail varsa FormData kullan
      console.log('Thumbnail var, FormData isteği hazırlanıyor...');
      const formData = new FormData();
      
      // Blog verilerini JSON formatında ekle
      formData.append('blogData', JSON.stringify(updateData));
      console.log('blogData formData\'ya JSON olarak eklendi:', updateData);
      
      // Thumbnail dosyasını ekle
      try {
        formData.append('thumbnail', thumbnailFile);
        console.log('Thumbnail eklendi:', thumbnailFile.name);
      } catch (thumbnailError) {
        console.error('Thumbnail eklenirken hata:', thumbnailError);
      }
      
      // Backend'de update-with-thumbnail endpointi varsa onu kullan
      try {
        const response = await api.put(`/blogs/update-with-thumbnail/${id}`, formData);
        console.log('API yanıtı:', response.data);
        return response.data.data;
      } catch (apiError) {
        console.error('API update-with-thumbnail isteği sırasında hata, standart endpoint deneniyor:', apiError);
        
        // Alternatif olarak standart endpoint'i dene
        const fallbackResponse = await api.put(`/blogs/${id}`, formData);
        return fallbackResponse.data.data;
      }
    } catch (error) {
      console.error('Blog güncellenirken hata oluştu:', error);
      console.error('Hata detayları:', error.response?.data);
      
      // Daha anlamlı hata mesajları döndür
      if (error.response?.data?.data?.includes('image_url') || 
          error.response?.data?.data?.includes('constraint')) {
        return rejectWithValue('Resim URL alanı boş olamaz. Lütfen bir resim yükleyin.');
      }
      
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Blog yazısı güncellenemedi'
      );
    }
  }
);

// Başlığa göre blog yazılarını ara
export const searchBlogsByTitle = createAsyncThunk(
  'blogs/searchByTitle',
  async ({ title, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const searchUrl = `/blogs/search/title?title=${encodeURIComponent(title)}&page=${page}&size=${size}`;
      console.log('Başlık araması URL:', searchUrl);
      console.log('Başlığa göre arama yapılıyor:', title, 'Sayfa:', page, 'Boyut:', size);
      
      const response = await api.get(searchUrl);
      console.log('API Yanıtı (Search by Title):', response.data);
      
      // API yanıtının içeriğini kontrol et
      const responseData = response.data.data || response.data;
      
      // Yanıt yapısını standardize et
      const formattedData = {
        content: Array.isArray(responseData) ? responseData : responseData.content || [],
        totalPages: responseData.totalPages || 1,
        totalElements: responseData.totalElements || (Array.isArray(responseData) ? responseData.length : 0),
        number: responseData.number || page,
        size: responseData.size || size
      };
      
      console.log('Formatlanmış Arama Sonuçları:', formattedData);
      
      // Arama sorgusuyla filtreleme yaparak client-side filtreleme ekle
      // Bu, API düzgün çalışmasa bile aramanın çalışmasını sağlayacak
      if (title && formattedData.content.length > 0) {
        const filteredContent = formattedData.content.filter(blog => 
          blog.title && blog.title.toLowerCase().includes(title.toLowerCase())
        );
        
        console.log(`Client-side başlık filtrelemesi: ${filteredContent.length}/${formattedData.content.length} sonuç`);
        
        return {
          ...formattedData,
          content: filteredContent,
          totalElements: filteredContent.length,
          totalPages: Math.ceil(filteredContent.length / size)
        };
      }
      
      return formattedData;
    } catch (error) {
      console.error('Başlık aramasında hata:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Başlığa göre arama yapılırken bir hata oluştu'
      );
    }
  }
);

// Etikete göre blog yazılarını ara
export const searchBlogsByTag = createAsyncThunk(
  'blogs/searchByTag',
  async ({ tag, page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const searchUrl = `/blogs/search/tag?tag=${encodeURIComponent(tag)}&page=${page}&size=${size}`;
      console.log('Etiket araması URL:', searchUrl);
      console.log('Etikete göre arama yapılıyor:', tag, 'Sayfa:', page, 'Boyut:', size);
      
      const response = await api.get(searchUrl);
      console.log('API Yanıtı (Search by Tag):', response.data);
      
      // API yanıtının içeriğini kontrol et
      const responseData = response.data.data || response.data;
      
      // Yanıt yapısını standardize et
      const formattedData = {
        content: Array.isArray(responseData) ? responseData : responseData.content || [],
        totalPages: responseData.totalPages || 1,
        totalElements: responseData.totalElements || (Array.isArray(responseData) ? responseData.length : 0),
        number: responseData.number || page,
        size: responseData.size || size
      };
      
      console.log('Formatlanmış Etiket Arama Sonuçları:', formattedData);
      
      // Arama sorgusuyla filtreleme yaparak client-side filtreleme ekle
      if (tag && formattedData.content.length > 0) {
        const filteredContent = formattedData.content.filter(blog => {
          // Blog etiketleri string veya dizi olabilir
          const blogTags = typeof blog.tags === 'string' 
            ? blog.tags.toLowerCase().split(',').map(t => t.trim())
            : Array.isArray(blog.tags) 
              ? blog.tags.map(t => typeof t === 'string' ? t.toLowerCase() : '')
              : [];
          
          return blogTags.some(t => t.includes(tag.toLowerCase()));
        });
        
        console.log(`Client-side etiket filtrelemesi: ${filteredContent.length}/${formattedData.content.length} sonuç`);
        
        return {
          ...formattedData,
          content: filteredContent,
          totalElements: filteredContent.length,
          totalPages: Math.ceil(filteredContent.length / size)
        };
      }
      
      return formattedData;
    } catch (error) {
      console.error('Etiket aramasında hata:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Etikete göre arama yapılırken bir hata oluştu'
      );
    }
  }
);

// Son blog yazılarını getir
export const fetchLatestBlogs = createAsyncThunk(
  'blogs/fetchLatest',
  async (count = 5, { rejectWithValue }) => {
    try {
      const response = await api.get(`/blogs/latest/${count}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Son blog yazıları yüklenemedi'
      );
    }
  }
);

const initialState = {
  blogs: [],
  latestBlogs: [], // Son blog yazıları için yeni state
  paginatedBlogs: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    size: 10,
    loading: false,
    error: null
  },
  searchResults: {
    content: [],
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    size: 10,
    loading: false,
    error: null,
    term: '',
    type: '' // 'title' veya 'tag'
  },
  currentBlog: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  success: false
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    resetCurrentBlog: (state) => {
      state.currentBlog = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Blog By Id
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Fetch Blog By Slug
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Create Blog
      .addCase(createBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.success = false;
      })
      
      // Update Blog
      .addCase(updateBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.map(blog => 
          blog.id === action.payload.id ? action.payload : blog
        );
        state.currentBlog = action.payload;
        state.success = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.success = false;
      })
      
      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.success = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.success = false;
      })
      
      // Toggle Blog Status
      .addCase(toggleBlogStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(toggleBlogStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.map(blog => 
          blog.id === action.payload.id ? action.payload : blog
        );
        if (state.currentBlog && state.currentBlog.id === action.payload.id) {
          state.currentBlog = action.payload;
        }
        state.success = true;
      })
      .addCase(toggleBlogStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Activate Blog
      .addCase(activateBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(activateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.map(blog => 
          blog.id === action.payload.id ? action.payload : blog
        );
        if (state.currentBlog && state.currentBlog.id === action.payload.id) {
          state.currentBlog = action.payload;
        }
        state.success = true;
      })
      .addCase(activateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Deactivate Blog
      .addCase(deactivateBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deactivateBlog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.map(blog => 
          blog.id === action.payload.id ? action.payload : blog
        );
        if (state.currentBlog && state.currentBlog.id === action.payload.id) {
          state.currentBlog = action.payload;
        }
        state.success = true;
      })
      .addCase(deactivateBlog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // Add Blog with Thumbnail
      .addCase(addBlogWithThumbnail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addBlogWithThumbnail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs.push(action.payload);
        state.success = true;
      })
      .addCase(addBlogWithThumbnail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.success = false;
      })
      
      // Update Blog with Thumbnail
      .addCase(updateBlogWithThumbnail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateBlogWithThumbnail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = state.blogs.map(blog => 
          blog.id === action.payload.id ? action.payload : blog
        );
        state.currentBlog = action.payload;
        state.success = true;
      })
      .addCase(updateBlogWithThumbnail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.success = false;
      })
      
      // Fetch Paginated Blogs
      .addCase(fetchPaginatedBlogs.pending, (state) => {
        state.paginatedBlogs.loading = true;
        state.paginatedBlogs.error = null;
      })
      .addCase(fetchPaginatedBlogs.fulfilled, (state, action) => {
        state.paginatedBlogs.loading = false;
        state.paginatedBlogs.content = action.payload.content;
        state.paginatedBlogs.totalPages = action.payload.totalPages;
        state.paginatedBlogs.totalElements = action.payload.totalElements;
        state.paginatedBlogs.currentPage = action.payload.number;
        state.paginatedBlogs.size = action.payload.size;
      })
      .addCase(fetchPaginatedBlogs.rejected, (state, action) => {
        state.paginatedBlogs.loading = false;
        state.paginatedBlogs.error = action.payload;
      })
      
      // Başlığa göre arama
      .addCase(searchBlogsByTitle.pending, (state) => {
        state.searchResults.loading = true;
        state.searchResults.error = null;
        state.searchResults.type = 'title';
      })
      .addCase(searchBlogsByTitle.fulfilled, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.content = action.payload.content;
        state.searchResults.totalPages = action.payload.totalPages;
        state.searchResults.totalElements = action.payload.totalElements;
        state.searchResults.currentPage = action.payload.number;
        state.searchResults.size = action.payload.size;
        state.searchResults.term = action.meta.arg.title;
      })
      .addCase(searchBlogsByTitle.rejected, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.error = action.payload;
      })
      
      // Etikete göre arama
      .addCase(searchBlogsByTag.pending, (state) => {
        state.searchResults.loading = true;
        state.searchResults.error = null;
        state.searchResults.type = 'tag';
      })
      .addCase(searchBlogsByTag.fulfilled, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.content = action.payload.content;
        state.searchResults.totalPages = action.payload.totalPages;
        state.searchResults.totalElements = action.payload.totalElements;
        state.searchResults.currentPage = action.payload.number;
        state.searchResults.size = action.payload.size;
        state.searchResults.term = action.meta.arg.tag;
      })
      .addCase(searchBlogsByTag.rejected, (state, action) => {
        state.searchResults.loading = false;
        state.searchResults.error = action.payload;
      })
      
      // Son blog yazıları getirme
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.latestBlogs = action.payload;
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearError, clearSuccess, resetCurrentBlog } = blogSlice.actions;

export default blogSlice.reducer; 
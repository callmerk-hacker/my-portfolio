import React, { useState, useEffect } from 'react';
import { Camera, User, BookOpen, Settings, LogOut, Edit2, Save, Trash2, Plus, X, ImageIcon, Eye, EyeOff } from 'lucide-react';

const PortfolioWebsite = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [showPassword, setShowPassword] = useState(false);
  
  // Default data structure
  const defaultData = {
    profile: {
      name: 'Your Name',
      title: 'Web Developer & Designer',
      bio: 'Welcome to my portfolio! I create beautiful and functional websites.',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
      social: {
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        twitter: 'https://twitter.com/yourusername'
      }
    },
    about: {
      description: 'I am a passionate developer with experience in modern web technologies. I love creating engaging user experiences and solving complex problems.',
      skills: ['React', 'JavaScript', 'CSS', 'Node.js', 'UI/UX Design']
    },
    gallery: [
      { id: 1, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500', caption: 'Web Development' },
      { id: 2, url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500', caption: 'Clean Code' },
      { id: 3, url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500', caption: 'Technology' },
      { id: 4, url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500', caption: 'Innovation' }
    ],
    blog: [
      {
        id: 1,
        title: 'Getting Started with React',
        excerpt: 'Learn the basics of React and start building amazing applications.',
        content: 'React is a powerful JavaScript library for building user interfaces...',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500',
        date: '2024-10-01'
      },
      {
        id: 2,
        title: 'Modern CSS Techniques',
        excerpt: 'Explore the latest CSS features and how to use them effectively.',
        content: 'CSS has evolved significantly over the years...',
        image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=500',
        date: '2024-10-15'
      }
    ],
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#ec4899',
      accentColor: '#f59e0b'
    },
    adminPassword: 'admin123'
  };

  const [siteData, setSiteData] = useState(defaultData);
  const [editMode, setEditMode] = useState({});
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Load data from storage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await window.storage.get('portfolio-data');
        if (stored) {
          setSiteData(JSON.parse(stored.value));
        }
      } catch (error) {
        console.log('No stored data found, using defaults');
      }
    };
    loadData();
  }, []);

  // Save data to storage
  const saveData = async (newData) => {
    setSiteData(newData);
    try {
      await window.storage.set('portfolio-data', JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleLogin = () => {
    if (password === siteData.adminPassword) {
      setIsAdmin(true);
      setShowLogin(false);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setActiveSection('home');
  };

  // Update functions
  const updateProfile = (field, value) => {
    const newData = { ...siteData, profile: { ...siteData.profile, [field]: value } };
    saveData(newData);
  };

  const updateAbout = (field, value) => {
    const newData = { ...siteData, about: { ...siteData.about, [field]: value } };
    saveData(newData);
  };

  const addGalleryImage = () => {
    const url = prompt('Enter image URL:');
    const caption = prompt('Enter caption:');
    if (url) {
      const newImage = { id: Date.now(), url, caption: caption || 'New Image' };
      const newData = { ...siteData, gallery: [...siteData.gallery, newImage] };
      saveData(newData);
    }
  };

  const deleteGalleryImage = (id) => {
    if (confirm('Delete this image?')) {
      const newData = { ...siteData, gallery: siteData.gallery.filter(img => img.id !== id) };
      saveData(newData);
    }
  };

  const addBlogPost = () => {
    const newPost = {
      id: Date.now(),
      title: 'New Blog Post',
      excerpt: 'Click edit to add content...',
      content: 'Write your blog post here...',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500',
      date: new Date().toISOString().split('T')[0]
    };
    const newData = { ...siteData, blog: [...siteData.blog, newPost] };
    saveData(newData);
  };

  const updateBlogPost = (id, field, value) => {
    const newData = {
      ...siteData,
      blog: siteData.blog.map(post => post.id === id ? { ...post, [field]: value } : post)
    };
    saveData(newData);
  };

  const deleteBlogPost = (id) => {
    if (confirm('Delete this blog post?')) {
      const newData = { ...siteData, blog: siteData.blog.filter(post => post.id !== id) };
      saveData(newData);
      setSelectedBlog(null);
    }
  };

  // Frontend Components
  const Home = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-8 animate-gradient">
      <div className="text-center text-white animate-fadeIn">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-white rounded-full animate-pulse opacity-30 scale-110"></div>
          <img 
            src={siteData.profile.image} 
            alt={siteData.profile.name}
            className="w-48 h-48 rounded-full border-8 border-white shadow-2xl relative z-10 object-cover animate-float"
          />
        </div>
        <h1 className="text-6xl font-bold mb-4 animate-slideDown">{siteData.profile.name}</h1>
        <p className="text-2xl mb-6 animate-slideUp opacity-90">{siteData.profile.title}</p>
        <p className="text-xl max-w-2xl mx-auto animate-fadeIn opacity-80">{siteData.profile.bio}</p>
        <div className="mt-8 flex gap-4 justify-center animate-slideUp">
          <a href={siteData.profile.social.github} className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:scale-110 transition-transform duration-300 shadow-lg">
            GitHub
          </a>
          <a href={siteData.profile.social.linkedin} className="px-6 py-3 bg-white text-pink-600 rounded-full font-semibold hover:scale-110 transition-transform duration-300 shadow-lg">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );

  const About = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 flex items-center">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl animate-fadeIn">
        <h2 className="text-5xl font-bold text-white mb-8 animate-slideDown">About Me</h2>
        <p className="text-xl text-white mb-8 leading-relaxed animate-slideUp">{siteData.about.description}</p>
        <h3 className="text-3xl font-bold text-white mb-6 animate-slideDown">Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {siteData.about.skills.map((skill, idx) => (
            <div 
              key={idx}
              className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl text-white font-semibold text-center hover:scale-110 hover:bg-white/30 transition-all duration-300 animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Gallery = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-white mb-12 text-center animate-slideDown">Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteData.gallery.map((image, idx) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-2xl animate-fadeIn hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <img 
                src={image.url} 
                alt={image.caption}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Blog = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-white mb-12 text-center animate-slideDown">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteData.blog.map((post, idx) => (
            <div 
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 animate-fadeIn cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setSelectedBlog(post)}
            >
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{post.title}</h3>
                <p className="text-gray-600">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-8 z-50 animate-fadeIn" onClick={() => setSelectedBlog(null)}>
          <div className="bg-white rounded-3xl max-w-3xl max-h-[90vh] overflow-auto p-12 animate-slideUp" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedBlog(null)} className="float-right text-gray-500 hover:text-gray-800">
              <X size={32} />
            </button>
            <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 object-cover rounded-xl mb-6" />
            <p className="text-sm text-gray-500 mb-2">{selectedBlog.date}</p>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">{selectedBlog.title}</h2>
            <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedBlog.content}</p>
          </div>
        </div>
      )}
    </div>
  );

  // Admin Panel
  const AdminPanel = () => (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">Admin Panel</h2>
          <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <User size={24} /> Profile Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">Name</label>
              <input 
                value={siteData.profile.name}
                onChange={e => updateProfile('name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-white block mb-2">Title</label>
              <input 
                value={siteData.profile.title}
                onChange={e => updateProfile('title', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-white block mb-2">Bio</label>
              <textarea 
                value={siteData.profile.bio}
                onChange={e => updateProfile('bio', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white h-24"
              />
            </div>
            <div>
              <label className="text-white block mb-2">Profile Image URL</label>
              <input 
                value={siteData.profile.image}
                onChange={e => updateProfile('image', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen size={24} /> About Section
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">Description</label>
              <textarea 
                value={siteData.about.description}
                onChange={e => updateAbout('description', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white h-32"
              />
            </div>
            <div>
              <label className="text-white block mb-2">Skills (comma separated)</label>
              <input 
                value={siteData.about.skills.join(', ')}
                onChange={e => updateAbout('skills', e.target.value.split(',').map(s => s.trim()))}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <ImageIcon size={24} /> Gallery Management
            </h3>
            <button onClick={addGalleryImage} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus size={20} /> Add Image
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteData.gallery.map(image => (
              <div key={image.id} className="relative group">
                <img src={image.url} alt={image.caption} className="w-full h-32 object-cover rounded-lg" />
                <button 
                  onClick={() => deleteGalleryImage(image.id)}
                  className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen size={24} /> Blog Management
            </h3>
            <button onClick={addBlogPost} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus size={20} /> New Post
            </button>
          </div>
          <div className="space-y-4">
            {siteData.blog.map(post => (
              <div key={post.id} className="bg-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <input 
                    value={post.title}
                    onChange={e => updateBlogPost(post.id, 'title', e.target.value)}
                    className="text-xl font-bold bg-gray-600 text-white px-3 py-2 rounded flex-1 mr-4"
                  />
                  <button 
                    onClick={() => deleteBlogPost(post.id)}
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <input 
                  value={post.image}
                  onChange={e => updateBlogPost(post.id, 'image', e.target.value)}
                  placeholder="Image URL"
                  className="w-full px-3 py-2 rounded bg-gray-600 text-white mb-3"
                />
                <textarea 
                  value={post.excerpt}
                  onChange={e => updateBlogPost(post.id, 'excerpt', e.target.value)}
                  placeholder="Excerpt"
                  className="w-full px-3 py-2 rounded bg-gray-600 text-white mb-3 h-20"
                />
                <textarea 
                  value={post.content}
                  onChange={e => updateBlogPost(post.id, 'content', e.target.value)}
                  placeholder="Full content"
                  className="w-full px-3 py-2 rounded bg-gray-600 text-white h-32"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Navigation */}
      {!isAdmin && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{siteData.profile.name}</h1>
            <div className="flex gap-6">
              <button onClick={() => setActiveSection('home')} className="text-white hover:text-yellow-300 transition-colors">Home</button>
              <button onClick={() => setActiveSection('about')} className="text-white hover:text-yellow-300 transition-colors">About</button>
              <button onClick={() => setActiveSection('gallery')} className="text-white hover:text-yellow-300 transition-colors">Gallery</button>
              <button onClick={() => setActiveSection('blog')} className="text-white hover:text-yellow-300 transition-colors">Blog</button>
              <button onClick={() => setShowLogin(true)} className="text-white hover:text-yellow-300 transition-colors flex items-center gap-2">
                <Settings size={20} /> Admin
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full animate-slideUp">
            <h3 className="text-2xl font-bold mb-6">Admin Login</h3>
            <div className="relative mb-4">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                className="w-full px-4 py-3 border rounded-lg pr-12"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex gap-4">
              <button onClick={handleLogin} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Login
              </button>
              <button onClick={() => setShowLogin(false)} className="flex-1 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">Default password: admin123</p>
          </div>
        </div>
      )}

      {/* Content */}
      {isAdmin ? (
        <AdminPanel />
      ) : (
        <>
          {activeSection === 'home' && <Home />}
          {activeSection === 'about' && <About />}
          {activeSection === 'gallery' && <Gallery />}
          {activeSection === 'blog' && <Blog />}
        </>
      )}

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;
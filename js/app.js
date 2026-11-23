// Default Sample Blogs (Updated Author: Noorul Elahi)
const defaultBlogs = [
  {
    id: 1,
    title: "Designing Minimalist Interfaces That Feel Effortless",
    category: "Design",
    excerpt: "Why whitespace, crisp typography, and subtle hierarchy create digital products users genuinely love to read.",
    content: "Great editorial design removes friction between the writer's thought and the reader's mind. By focusing on generous line height, high-contrast serif headings, and distraction-free layouts, modern web applications transform ordinary articles into memorable reading experiences.\n\nStart with a strong typographic scale, limit your color palette to two primary tones plus one warm accent, and let content breathe.",
    image: "images/post-1.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    author: "Noorul Elahi",
    date: "Nov 21, 2026",
    readTime: "4 min read"
  },
  {
    id: 2,
    title: "Modern Frontend Architecture with Vanilla HTML, CSS & JS",
    category: "Technology",
    excerpt: "How clean semantic markup and modular JavaScript can power fast, responsive web applications without bloat.",
    content: "Before jumping into heavy frameworks, mastering core web fundamentals gives you complete control over performance and accessibility. Using CSS Grid, custom properties, and structured state management in JavaScript allows you to ship instant-loading applications.\n\nThis blog platform itself demonstrates clean client-side persistence, responsive layouts, and intuitive user flows.",
    image: "images/post-2.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    author: "Noorul Elahi",
    date: "Nov 21, 2026",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Slow Mornings & Focused Deep Work Routines",
    category: "Lifestyle",
    excerpt: "Building sustainable daily habits that protect your creative energy and sharpen problem-solving.",
    content: "Consistency outperforms intensity over the long run. Starting your day with a clear priority list, stepping away from constant notifications, and dedicating ninety-minute blocks to deep creation can double your output while reducing burnout.",
    image: "images/post-3.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    author: "Noorul Elahi",
    date: "Nov 21, 2026",
    readTime: "3 min read"
  }
];

// Initialize Storage (v2 key resets old cached data automatically)
function getBlogs() {
  const stored = localStorage.getItem('lumina_blogs_v2');
  if (!stored) {
    localStorage.setItem('lumina_blogs_v2', JSON.stringify(defaultBlogs));
    return defaultBlogs;
  }
  return JSON.parse(stored);
}

function saveBlogs(blogs) {
  localStorage.setItem('lumina_blogs_v2', JSON.stringify(blogs));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('lumina_user_v2'));
}

// Update Navbar Based on Auth State
function updateNavbar() {
  const user = getCurrentUser();
  const navAuth = document.getElementById('nav-auth-area');
  if (!navAuth) return;

  if (user) {
    navAuth.innerHTML = `
      <a href="dashboard.html">Dashboard</a>
      <a href="create-blog.html" class="btn btn-primary">+ Write</a>
      <button onclick="logoutUser()" class="btn btn-outline" style="padding: 0.5rem 1rem;">Logout</button>
    `;
  } else {
    navAuth.innerHTML = `
      <a href="login.html">Login</a>
      <a href="register.html" class="btn btn-primary">Get Started</a>
    `;
  }
}

function logoutUser() {
  localStorage.removeItem('lumina_user_v2');
  window.location.href = 'index.html';
}

// Render Home Page Blogs
function renderHomeBlogs(filterCat = 'All', searchQuery = '') {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  const blogs = getBlogs();
  const filtered = blogs.filter(b => {
    const matchesCat = filterCat === 'All' || b.category === filterCat;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-secondary); grid-column: 1/-1; text-align:center; padding: 2rem;">No articles found matching your filter.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(blog => `
    <article class="blog-card">
      <img src="${blog.image}" onerror="this.onerror=null; this.src='${blog.image.replace('.jpg', '.png')}';" alt="${blog.title}">
      <div class="blog-content">
        <div class="blog-meta">
          <span class="blog-cat">${blog.category}</span>
          <span>${blog.date} · ${blog.readTime}</span>
        </div>
        <h3>${blog.title}</h3>
        <p>${blog.excerpt}</p>
        <div class="author-row">
          <div class="author-info">
            <img src="images/avatar.jpg" onerror="this.onerror=null; this.src='images/avatar.png';" alt="${blog.author}">
            <span>${blog.author}</span>
          </div>
          <button onclick="openArticle(${blog.id})" class="btn btn-outline" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;">Read →</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Article Reader Modal
function openArticle(id) {
  const blog = getBlogs().find(b => b.id === id);
  const modal = document.getElementById('article-modal');
  if (!blog || !modal) return;

  document.getElementById('modal-body').innerHTML = `
    <span class="hero-badge">${blog.category}</span>
    <h1 style="font-size: 2rem; margin-bottom: 0.75rem;">${blog.title}</h1>
    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">By <strong>${blog.author}</strong> · ${blog.date} · ${blog.readTime}</p>
    <img src="${blog.image}" onerror="this.onerror=null; this.src='${blog.image.replace('.jpg', '.png')}';" style="width:100%; height:300px; object-fit:cover; border-radius:12px; margin-bottom:1.5rem;">
    <div style="font-size: 1.05rem; color: var(--text-primary); white-space: pre-line; line-height: 1.8;">${blog.content}</div>
  `;
  modal.classList.add('open');
}

function closeArticle() {
  const modal = document.getElementById('article-modal');
  if (modal) modal.classList.remove('open');
}

// Handle Register Form
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;

  const user = { name, email, password };
  localStorage.setItem('lumina_registered_user_v2', JSON.stringify(user));
  localStorage.setItem('lumina_user_v2', JSON.stringify(user));
  window.location.href = 'dashboard.html';
}

// Handle Login Form
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const registered = JSON.parse(localStorage.getItem('lumina_registered_user_v2'));

  const user = registered && registered.email === email
    ? registered
    : { name: "Noorul Elahi", email };

  localStorage.setItem('lumina_user_v2', JSON.stringify(user));
  window.location.href = 'dashboard.html';
}

// Handle Create Blog Form
function handleCreateBlog(e) {
  e.preventDefault();
  const user = getCurrentUser() || { name: "Noorul Elahi" };
  const title = document.getElementById('blog-title').value.trim();
  const category = document.getElementById('blog-category').value;
  const imageChoice = document.getElementById('blog-image').value;
  const excerpt = document.getElementById('blog-excerpt').value.trim();
  const content = document.getElementById('blog-content').value.trim();

  const words = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200)) + " min read";

  const newBlog = {
    id: Date.now(),
    title,
    category,
    excerpt,
    content,
    image: imageChoice,
    fallbackImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    author: user.name,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime
  };

  const blogs = getBlogs();
  blogs.unshift(newBlog);
  saveBlogs(blogs);
  window.location.href = 'dashboard.html';
}

// Render Dashboard
function renderDashboard() {
  const tableBody = document.getElementById('dashboard-table-body');
  if (!tableBody) return;

  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('welcome-user').textContent = `Welcome back, ${user.name}`;
  const blogs = getBlogs();
  document.getElementById('stat-total-posts').textContent = blogs.length;

  tableBody.innerHTML = blogs.map(blog => `
    <tr>
      <td><strong>${blog.title}</strong></td>
      <td><span class="hero-badge" style="margin:0;">${blog.category}</span></td>
      <td>${blog.date}</td>
      <td>
        <button onclick="deleteBlog(${blog.id})" class="btn btn-danger" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">Delete</button>
      </td>
    </tr>
  `).join('');
}

function deleteBlog(id) {
  if (!confirm("Are you sure you want to delete this article?")) return;
  const updated = getBlogs().filter(b => b.id !== id);
  saveBlogs(updated);
  renderDashboard();
}

// Initialize Page Events
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
  renderHomeBlogs();
  renderDashboard();

  // Filter Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const searchVal = document.getElementById('search-input')?.value || '';
      renderHomeBlogs(btn.dataset.cat, searchVal);
    });
  });

  // Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeCat = document.querySelector('.tab-btn.active')?.dataset.cat || 'All';
      renderHomeBlogs(activeCat, e.target.value);
    });
  }
});
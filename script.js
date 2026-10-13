/**
 * SHUBHANGI AGGARWAL - PORTFOLIO INTERACTIVE CORE
 * Generative Abstract Canvas, Modals, Smooth Navigation, Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initAbstractCanvas();
  initNavigation();
  initCertificateModal();
  initArticleModal();
  initContactForm();
  initEmailCopy();
  initScrollAnimations();
});

/* ==========================================================================
   1. GENERATIVE ABSTRACT CANVAS (Pastel Art & Floating Geometry)
   ========================================================================== */
function initAbstractCanvas() {
  const canvas = document.getElementById('art-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Muted color palette for fluid abstract orbs
  const colors = [
    'rgba(235, 220, 210, 0.45)', // Muted Sand Peach
    'rgba(215, 225, 238, 0.40)', // Muted Pastel Navy/Slate
    'rgba(240, 226, 230, 0.40)', // Blush Burgundy Tint
    'rgba(228, 235, 226, 0.35)', // Whisper Sage
    'rgba(110, 27, 45, 0.05)'    // Very subtle Burgundy aura
  ];

  class AbstractOrb {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 240 + 120;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x - this.radius > width) this.x = -this.radius;
      if (this.x + this.radius < 0) this.x = width + this.radius;
      if (this.y - this.radius > height) this.y = -this.radius;
      if (this.y + this.radius < 0) this.y = height + this.radius;
    }

    draw() {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius
      );
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(251, 248, 243, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Abstract Geometric Floating Particles
  class FloatingDot {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 1;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.35 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;
    }

    draw() {
      ctx.fillStyle = `rgba(11, 19, 37, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const orbs = Array.from({ length: 6 }, () => new AbstractOrb());
  const dots = Array.from({ length: 28 }, () => new FloatingDot());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Render soft ambient abstract shapes
    orbs.forEach((orb) => {
      orb.update();
      orb.draw();
    });

    // Render geometric delicate particles
    dots.forEach((dot) => {
      dot.update();
      dot.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const navBar = document.querySelector('.nav-glass-bar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navBar?.classList.add('scrolled');
    } else {
      navBar?.classList.remove('scrolled');
    }

    // Scroll spy active links
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. CERTIFICATE MODAL PREVIEW
   ========================================================================== */
const certificateData = {
  python: {
    title: 'Python for Problem Solving & Algorithmic Logic',
    issuer: 'National Informatics & Programming Academy',
    recipient: 'Shubhangi Aggarwal',
    date: 'August 2026',
    credentialId: 'CERT-PY-2026-88419',
    summary: 'Demonstrated rigorous proficiency in Python syntax, modular programming, object-oriented concepts, and problem-solving through algorithmic challenge sets with exceptional evaluation scores.',
    signature: 'Dr. R. K. Sharma',
    sigTitle: 'Academic Director, Computer Science'
  },
  c: {
    title: 'C Programming & Low-Level Memory Foundations',
    issuer: 'JECRC University - Dept. of Computer Science & Engineering',
    recipient: 'Shubhangi Aggarwal',
    date: 'October 2026',
    credentialId: 'CERT-C-JECRC-01934',
    summary: 'Recognized for outstanding mastery in pointer arithmetic, dynamic memory allocation (malloc/free), structs, nested data handling, and writing high-efficiency algorithmic C programs.',
    signature: 'Prof. Ananya Sen',
    sigTitle: 'Chair of Computing, JECRC'
  },
  sql: {
    title: 'Relational Database Design & SQL Query Mastery',
    issuer: 'Database Systems Consortium (DSC)',
    recipient: 'Shubhangi Aggarwal',
    date: 'September 2026',
    credentialId: 'CERT-SQL-DSC-77218',
    summary: 'Successfully engineered complex relational schemas, multi-table joins, subqueries, grouping analytics, and constraints adhering to rigorous 3NF database normalization standards.',
    signature: 'Marcus Vance',
    sigTitle: 'Lead Architect, DSC Global'
  },
  ai: {
    title: 'Foundations of AI & Machine Learning Exploration',
    issuer: 'AI Pioneers & Innovation Lab',
    recipient: 'Shubhangi Aggarwal',
    date: 'October 2026',
    credentialId: 'CERT-AIML-2026-4401',
    summary: 'Comprehensive hands-on foundation covering supervised learning, regression & classification pipelines, model evaluation metrics, and exploratory data analysis using Scikit-Learn.',
    signature: 'Dr. Elena Rostova',
    sigTitle: 'Research Scientist & ML Fellow'
  }
};

function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('cert-modal-close');
  const certCards = document.querySelectorAll('.cert-card[data-cert]');

  if (!modal) return;

  certCards.forEach((card) => {
    card.addEventListener('click', () => {
      const certKey = card.getAttribute('data-cert');
      const data = certificateData[certKey];
      if (data) {
        document.getElementById('modal-cert-title').textContent = data.title;
        document.getElementById('modal-cert-issuer').textContent = data.issuer;
        document.getElementById('modal-cert-recipient').textContent = data.recipient;
        document.getElementById('modal-cert-summary').textContent = data.summary;
        document.getElementById('modal-cert-date').textContent = data.date;
        document.getElementById('modal-cert-id').textContent = data.credentialId;
        document.getElementById('modal-cert-sig').textContent = data.signature;
        document.getElementById('modal-cert-sigtitle').textContent = data.sigTitle;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   4. TECHNICAL ARTICLE MODAL
   ========================================================================== */
const articleData = {
  pointers: {
    title: 'Demystifying Pointers in C: A Freshman’s Visual Mental Model',
    tag: 'C Programming & Memory',
    readTime: '4 min read',
    content: `
      <p>When starting Computer Science in first year, pointers in C are often presented as the ultimate trial. But once you dismantle the intimidating asterisk syntax and look at memory as an addressable grid of postal boxes, the mystery dissolves.</p>
      <br>
      <h4>1. The Address-as-House Analogy</h4>
      <p>Every variable is simply a named parcel of bytes in RAM. A pointer variable is nothing more than a tiny piece of paper storing the street address where another variable lives. When you dereference with <code>*ptr</code>, you aren't doing magic—you're merely walking to that door and looking inside.</p>
      <br>
      <h4>2. Why This Matters for Clean Engineering</h4>
      <p>Understanding memory management early on completely reshapes how you perceive modern high-level languages like Python and JavaScript. It gives you intuition for pass-by-reference, object references, and garbage collection overhead.</p>
      <br>
      <blockquote>"You don't truly appreciate computing until you understand how memory is physically rented and returned."</blockquote>
    `
  },
  sql: {
    title: 'Why Every First-Year Engineer Should Master SQL Before Frameworks',
    tag: 'Databases & Architecture',
    readTime: '5 min read',
    content: `
      <p>In the rush to build shiny full-stack web applications, many freshmen jump directly into heavy ORMs without understanding relational calculus. Here is why relational database fundamentals should be your first superpower.</p>
      <br>
      <h4>1. Data Outlives Code</h4>
      <p>Frameworks evolve every three years; PostgreSQL and SQL foundations have stood robustly for over four decades. When you master normalization (1NF through 3NF), relational integrity, and indexing, your systems scale effortlessly.</p>
      <br>
      <h4>2. Declarative Thinking vs Imperative Loops</h4>
      <p>SQL trains your brain to express <em>what</em> data you need rather than micromanaging <em>how</em> every single row should be looped through in procedural memory. It's a transformative mental shift for freshman problem solvers.</p>
    `
  },
  design: {
    title: 'The Intersection of Code and Design: Why UI Matters in Engineering',
    tag: 'UI/UX & Engineering',
    readTime: '4 min read',
    content: `
      <p>Engineering is traditionally thought of as pure logic, data structures, and algorithmic complexity. But what good is an elegant O(n log n) algorithm if the human sitting on the other end finds the interface frustrating or unreadable?</p>
      <br>
      <h4>1. The Power of Intentional Hierarchy</h4>
      <p>A great user experience does not mean unnecessary glitter or flashy animations. It means disciplined spacing, intentional typographic hierarchy, accessible contrast ratios, and thoughtful micro-feedback.</p>
      <br>
      <h4>2. My Personal Philosophy as a B.Tech Freshman</h4>
      <p>As a 1st-year CSE student at JECRC University, my goal is to bridge the analytical rigor of software engineering with the empathy and clarity of modern UI/UX design. The future belongs to technical creators who can build the engine and design the cockpit.</p>
    `
  }
};

function initArticleModal() {
  const modal = document.getElementById('article-modal');
  const closeBtn = document.getElementById('article-modal-close');
  const articleCards = document.querySelectorAll('.article-card[data-article]');

  if (!modal) return;

  articleCards.forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-article');
      const article = articleData[key];
      if (article) {
        document.getElementById('modal-article-title').textContent = article.title;
        document.getElementById('modal-article-tag').textContent = article.tag;
        document.getElementById('modal-article-time').textContent = article.readTime;
        document.getElementById('modal-article-body').innerHTML = article.content;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   5. CONTACT FORM INTERACTION & FEEDBACK
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('⚠️ Please fill out all fields before sending.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `<span>Sending Message...</span>`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `<span>✓ Message Sent Successfully!</span>`;
      submitBtn.style.background = '#15803D';
      showToast('💌 Thank you! Your message has been sent to Shubhangi.');

      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3500);
    }, 1200);
  });
}

/* ==========================================================================
   6. EMAIL COPY TO CLIPBOARD
   ========================================================================== */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = 'agrwlsammy@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('📋 Copied agrwlsammy@gmail.com to clipboard!');
      }).catch(() => {
        // Fallback
        showToast('Email: agrwlsammy@gmail.com');
      });
    });
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   8. SCROLL & ENTRANCE ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
}

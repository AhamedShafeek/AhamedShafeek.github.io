// Enhanced interactions: mobile menu, year, back-to-top, scroll reveals, smooth scrolling
(function () {
  'use strict';

  // Set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Back to top button (support both legacy and new IDs)
  const toTop = document.getElementById('toTop') || document.getElementById('backToTop');
  const onScroll = () => {
    if (!toTop) return;
    if (window.scrollY > 400) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial check

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile menu toggle with animation
  const burger = document.getElementById('burger');
  const links = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');
  let menuOpen = false;
  
  // Create mobile backdrop
  let backdrop = document.querySelector('.mobile-backdrop');
  if (!backdrop && burger) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-backdrop';
    document.body.appendChild(backdrop);
  }

  if (burger && links) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      menuOpen = !menuOpen;
      
      if (menuOpen) {
        links.classList.add('mobile-open');
        if (navActions) navActions.classList.add('mobile-open');
        if (backdrop) backdrop.classList.add('active');
        burger.classList.add('active');
        burger.textContent = '✕';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Close on outside click
        setTimeout(() => {
          document.addEventListener('click', closeMenu);
          if (backdrop) backdrop.addEventListener('click', closeMenu);
        }, 100);
      } else {
        closeMenu();
      }
    });

    // Prevent menu from closing when clicking inside
    links.addEventListener('click', (e) => {
      // Close only if clicking a link
      if (e.target.tagName === 'A') {
        closeMenu();
      }
    });
  }

  function closeMenu() {
    if (links) links.classList.remove('mobile-open');
    if (navActions) navActions.classList.remove('mobile-open');
    if (backdrop) backdrop.classList.remove('active');
    if (burger) {
      burger.classList.remove('active');
      burger.textContent = 'Menu';
    }
    menuOpen = false;
    document.body.style.overflow = ''; // Restore scroll
    document.removeEventListener('click', closeMenu);
    if (backdrop) backdrop.removeEventListener('click', closeMenu);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80; // Account for sticky nav
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Highlight Home when at top
    if (window.scrollY < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === './index.html' || link.getAttribute('href') === '#') {
          link.classList.add('active');
        }
      });
    }
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav(); // Initial check

  // Enhanced card hover effects (optional parallax)
  const cards = document.querySelectorAll('.card, .feature');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Log loaded
  console.log('🚀 Site interactions loaded');
})();


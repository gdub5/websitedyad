/**
 * Dyad CX - Main JavaScript
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================
  // Mobile Navigation
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const header = document.getElementById('header');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');

      // Prevent body scroll when menu is open
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') &&
          !navLinks.contains(e.target) &&
          !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ========================================
  // Header Scroll Effect
  // ========================================
  let lastScrollY = window.scrollY;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // Initial check

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

        if (prefersReducedMotion) {
          window.scrollTo(0, targetPosition);
        } else {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ========================================
  // Scroll Animations (Intersection Observer)
  // ========================================
  if (!prefersReducedMotion) {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(function(element) {
        observer.observe(element);
      });
    } else {
      // Fallback: show all elements immediately
      animatedElements.forEach(function(element) {
        element.classList.add('visible');
      });
    }
  } else {
    // Reduced motion: show all elements immediately
    document.querySelectorAll('.animate-on-scroll').forEach(function(element) {
      element.classList.add('visible');
    });
  }

  // ========================================
  // Form Validation
  // ========================================
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const companyInput = document.getElementById('company');
    const situationSelect = document.getElementById('situation');

    // Validation functions
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function showError(input, errorId) {
      input.classList.add('error');
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.classList.add('visible');
      }
    }

    function clearError(input, errorId) {
      input.classList.remove('error');
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.classList.remove('visible');
      }
    }

    // Real-time validation on blur
    if (nameInput) {
      nameInput.addEventListener('blur', function() {
        if (this.value.trim().length < 2) {
          showError(this, 'name-error');
        } else {
          clearError(this, 'name-error');
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
          showError(this, 'email-error');
        } else {
          clearError(this, 'email-error');
        }
      });
    }

    if (companyInput) {
      companyInput.addEventListener('blur', function() {
        if (this.value.trim().length === 0) {
          showError(this, 'company-error');
        } else {
          clearError(this, 'company-error');
        }
      });
    }

    if (situationSelect) {
      situationSelect.addEventListener('change', function() {
        if (this.value === '') {
          showError(this, 'situation-error');
        } else {
          clearError(this, 'situation-error');
        }
      });
    }

    // Clear errors on input
    [nameInput, emailInput, companyInput].forEach(function(input) {
      if (input) {
        input.addEventListener('input', function() {
          clearError(this, this.id + '-error');
        });
      }
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
      let isValid = true;

      // Validate name
      if (nameInput && nameInput.value.trim().length < 2) {
        showError(nameInput, 'name-error');
        isValid = false;
      }

      // Validate email
      if (emailInput && !validateEmail(emailInput.value)) {
        showError(emailInput, 'email-error');
        isValid = false;
      }

      // Validate company
      if (companyInput && companyInput.value.trim().length === 0) {
        showError(companyInput, 'company-error');
        isValid = false;
      }

      // Validate situation
      if (situationSelect && situationSelect.value === '') {
        showError(situationSelect, 'situation-error');
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();

        // Scroll to first error
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          const headerHeight = header.offsetHeight;
          const errorPosition = firstError.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

          window.scrollTo({
            top: errorPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }

        return false;
      }

      // Form is valid - submit to Formspree
      // (form submits naturally, no preventDefault needed)
    });
  }

  // ========================================
  // Update Active Nav Link on Scroll
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNavLink() {
    const scrollY = window.scrollY;
    const headerHeight = header.offsetHeight;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinkItems.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink(); // Initial check

})();

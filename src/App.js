document.addEventListener('DOMContentLoaded', function () {
  // Initialize core functionality
  initMobileMenu();
  initScrollIndicator();
  initScrollAnimations();
  initActiveNavLinks();
  initBackToTop();
  initThemeSwitcher();

  // Initialize EmailJS
  (function() {
    if (typeof window.emailjs !== 'undefined') {
      window.emailjs.init("bAHT987bBMpCLPT_k");
    } else {
      console.error("EmailJS library not loaded!");
    }
  })();

  // Initialize animations
  initAnimations();

  // Initialize contact form
  initContactForm();
});

function initAnimations() {
  // Get all elements with animate class
  const animatedElements = document.querySelectorAll('.animate');

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Function to handle scroll animation
  function handleScrollAnimation() {
    animatedElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('active')) {
        element.classList.add('active');
      }
    });
  }

  // Run once on initial load
  handleScrollAnimation();

  // Run on scroll
  window.addEventListener('scroll', handleScrollAnimation);
}

function initThemeSwitcher() {
  const themeSwitch = document.getElementById('themeSwitch');
  if (!themeSwitch) return;

  //check for saved theme preference or use preferred color scheme
  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // apply saved theme on page load
  if(currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  }

  //toggle theme when the switch is clicked
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      //dark theme
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      //light theme
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

function initContactForm() {
  const contactForm = document.querySelector('#contact form');
  if(!contactForm) return;

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if(!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      return;
    }

    // Prepare parameters to send
    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };

    window.emailjs.send(
      'service_l1vzt64',
        'template_955o2v2',
        templateParams
    )
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);

      // Show success message
      alert('Thank you for your message! I will get back to you soon.');

      // Reset the form
      contactForm.reset();

      // Restore button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    })
    .catch(function(error) {
      console.log('FAILED...', error);

      // Show error message
      alert('Oops! Something went wrong. Please try again later.');

      // Restore button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
  });
}

function initMobileMenu() {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');

  if(menuButton && mobileMenu) {
    menuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });

    const menuItems = mobileMenu.querySelectorAll('a');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

function initScrollIndicator() {
  const scrollIndicator = document.getElementById('scrollIndicator');

  if(scrollIndicator) {
    window.addEventListener('scroll', function () {
      // Calculate scroll percentage
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      // Update the width of the scroll indicator
      scrollIndicator.style.width = scrolled + '%';
    });
  }
}

function initScrollAnimations() {
  // Get all elements that should be animated on scroll
  const elements = document.querySelectorAll('.animate-on-scroll');

  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  }

  // Function to add animation classes when elements come in view
  function handleScrollAnimation() {
    elements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animate-fadeInUp', "animated");
      }
    });
  }

  // Add animation class on initial load
  handleScrollAnimation();

  // Add animation class on scroll
  window.addEventListener('scroll', handleScrollAnimation);
}

function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function highlightNavLinks() {
    // Get current scroll position
    const scrollPosition = window.scrollY;

    // Check each section and highlight corresponding navlink
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });

        // Add active class to current section link
        const correspondingLink = document.querySelector(`nav a[href="#${sectionId}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  }

  // Highlight the correct nav link on initial load
  highlightNavLinks();

  // Highlight the correct nav link on scroll
  window.addEventListener('scroll', highlightNavLinks);
}

function initBackToTop() {
  // Create the back to top button dynamically
  const backToTopButton = document.createElement('div');
  backToTopButton.className = 'back-to-top';
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopButton);

  // Show/hide the button based on scroll position
  window.addEventListener('scroll', function() {
    if(window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Figma-style cursor implementation

function initCustomCursor() {
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  document.body.appendChild(cursor);

  // Initial position off-screen
  cursor.style.top = '-100px';
  cursor.style.left = '-100px';

  // Handle mouse movement
  document.addEventListener('mousemove', (e) => {
    cursor.style.top = e.clientY + 'px';
    cursor.style.left = e.clientX + 'px';
  });

  // Handle mouse events for interaction states
  const handleInteraction = (elements, className, action) => {
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add(className);
      });

      element.addEventListener('mouseleave', () => {
        cursor.classList.remove(className);
      });

      if (action) {
        element.addEventListener('mousedown', () => {
          cursor.classList.add(action);
        });

        element.addEventListener('mouseup', () => {
          cursor.classList.remove(action);
        });
      }
    });
  };

  // Add specific behaviors for different elements
  handleInteraction(document.querySelectorAll('a, button, .btn, .social-icon, .project-link'), 'cursor-hover');
  handleInteraction(document.querySelectorAll('input, textarea'), 'cursor-text');

  // Hide cursor when leaving the window
  document.addEventListener('mouseout', (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = '0';
    }
  });

  document.addEventListener('mouseover', () => {
    cursor.style.opacity = '1';
  });

  // Click animation
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });

  // Detect if using a touch device and disable custom cursor
  function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }

  if (isTouchDevice()) {
    document.body.style.cursor = 'auto';
    cursor.style.display = 'none';
  }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initCustomCursor);
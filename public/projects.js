document.addEventListener('DOMContentLoaded', function () {
  // Initialize core functionality
  initThemeSwitcher();
  initBackToTop();
  initActiveNavLinks();
  initAnimations();

  // Check if any project filters exist and initialize them
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    initProjectFilters();
  }
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

  // Check for saved theme preference or use preferred color scheme
  const currentTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // Apply saved theme on page load
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitch.checked = true;
  }

  // Toggle theme when the switch is clicked
  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      // Dark theme
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // Light theme
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
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
  const backToTopButton = document.getElementById('backToTop');
  if (!backToTopButton) return;
  
  // Show/hide the button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
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

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!filterButtons.length || !projectCards.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
        } else {
          const categories = card.getAttribute('data-category') || '';
          if (categories.includes(filterValue)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
}

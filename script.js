document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const contentSections = document.querySelectorAll('.content-section');

  // Navigation functionality
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      
      // Remove active class from all buttons and sections
      navButtons.forEach(btn => btn.classList.remove('active'));
      contentSections.forEach(section => section.classList.remove('active'));
      
      // Add active class to clicked button and corresponding section
      this.classList.add('active');
      document.getElementById(targetSection).classList.add('active');
    });
  });

  // Video card click functionality
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    card.addEventListener('click', function() {
      const videoTitle = this.querySelector('h4').textContent;
      alert(`Opening video: ${videoTitle}\n\nThis would normally open the YouTube video in a new tab.`);
    });
  });

  // Project card click functionality
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const projectName = this.querySelector('h4').textContent;
      alert(`Opening GitHub project: ${projectName}\n\nThis would normally open the GitHub repository in a new tab.`);
    });
  });

  // Smooth scrolling for navigation
  function smoothScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
      const keyMap = {
        '1': 'personal',
        '2': 'education',
        '3': 'thesis',
        '4': 'youtube',
        '5': 'github'
      };
      
      if (keyMap[e.key]) {
        e.preventDefault();
        const targetButton = document.querySelector(`[data-section="${keyMap[e.key]}"]`);
        if (targetButton) {
          targetButton.click();
        }
      }
    }
  });

  // Add loading animation for sections
  function addLoadingAnimation() {
    contentSections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
    });

    // Show active section with animation
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
      setTimeout(() => {
        activeSection.style.opacity = '1';
        activeSection.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  // Initialize animations
  addLoadingAnimation();

  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('.video-card, .project-card, .nav-btn');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });

  // Print functionality
  function addPrintStyles() {
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Resume';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '20px';
    printButton.style.right = '20px';
    printButton.style.backgroundColor = '#3498db';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.padding = '10px 20px';
    printButton.style.borderRadius = '5px';
    printButton.style.cursor = 'pointer';
    printButton.style.zIndex = '1000';
    
    printButton.addEventListener('click', function() {
      window.print();
    });
    
    document.body.appendChild(printButton);
  }

  // Initialize print functionality
  addPrintStyles();

  // Add responsive navigation toggle for mobile
  function addMobileNavigation() {
    if (window.innerWidth <= 768) {
      const navigation = document.querySelector('.navigation');
      let isNavOpen = false;
      
      const toggleButton = document.createElement('button');
      toggleButton.textContent = '☰ Menu';
      toggleButton.style.display = 'block';
      toggleButton.style.width = '100%';
      toggleButton.style.backgroundColor = '#2c3e50';
      toggleButton.style.color = 'white';
      toggleButton.style.border = 'none';
      toggleButton.style.padding = '1rem';
      toggleButton.style.cursor = 'pointer';
      
      toggleButton.addEventListener('click', function() {
        isNavOpen = !isNavOpen;
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
          btn.style.display = isNavOpen ? 'block' : 'none';
        });
        this.textContent = isNavOpen ? '✕ Close' : '☰ Menu';
      });
      
      navigation.insertBefore(toggleButton, navigation.firstChild);
      
      // Hide nav buttons initially on mobile
      const navButtons = document.querySelectorAll('.nav-btn');
      navButtons.forEach(btn => {
        btn.style.display = 'none';
      });
    }
  }

  // Initialize mobile navigation
  addMobileNavigation();

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      const navButtons = document.querySelectorAll('.nav-btn');
      navButtons.forEach(btn => {
        btn.style.display = 'flex';
      });
      
      const toggleButton = document.querySelector('.navigation button:first-child');
      if (toggleButton && toggleButton.textContent.includes('Menu')) {
        toggleButton.remove();
      }
    }
  });
});

/* ============================================
   ДУБРОВИЦЯ - JAVASCRIPT
   Інтерактивні функції сайту
   ============================================ */

// === ФУНКЦІЯ: ЗАПУСК ПІСЛЯ ЗАВАНТАЖЕННЯ СТОРІНКИ ===
document.addEventListener('DOMContentLoaded', function() {
  
  // Ініціалізація всіх функцій
  initMobileMenu();
  initScrollHeader();
  initPhotoGallery();
  initRecordsSearch();
  initSmoothScroll();
  initLightbox();
  
});

// === МОБІЛЬНЕ МЕНЮ ===
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      
      // Анімація іконки бургера
      const spans = menuToggle.querySelectorAll('span');
      if (mainNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Закрити меню при кліку на посилання
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
}

// === HEADER ПРИ ПРОКРУТЦІ ===
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// === ГАЛЕРЕЯ ФОТО З ФІЛЬТРАМИ ===
function initPhotoGallery() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const photoItems = document.querySelectorAll('.photo-item');
  
  if (filterButtons.length > 0 && photoItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Видалити активний клас з усіх кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Додати активний клас до натиснутої кнопки
        this.classList.add('active');
        
        // Отримати категорію фільтра
        const filterValue = this.getAttribute('data-filter');
        
        // Показати/сховати фото за категорією
        photoItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.style.display = 'block';
            // Анімація появи
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

// === ПОШУК В МЕТРИЧНИХ КНИГАХ ===
function initRecordsSearch() {
  const searchInput = document.querySelector('.search-input');
  const recordItems = document.querySelectorAll('.record-item');
  
  if (searchInput && recordItems.length > 0) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      
      recordItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        
        if (text.includes(searchTerm)) {
          item.style.display = 'block';
          // Анімація появи
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateX(-20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  }
}

// === ПЛАВНА ПРОКРУТКА ДО СЕКЦІЙ ===
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Перевірка чи це не пусте посилання
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = document.querySelector('.site-header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// === ЛАЙТБОКС ДЛЯ ЗБІЛЬШЕННЯ ФОТО ===
function initLightbox() {
  // Створюємо лайтбокс, якщо його ще немає
  let lightbox = document.querySelector('.lightbox');
  
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox-close" aria-label="Закрити">×</button>
      <div class="lightbox-content">
        <img src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);
  }
  
  const lightboxImg = lightbox.querySelector('img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  const photoItems = document.querySelectorAll('.photo-item');
  
  // Відкрити лайтбокс при кліку на фото
  photoItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Заборонити прокрутку
      }
    });
  });
  
  // Закрити лайтбокс
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Дозволити прокрутку
  }
  
  lightboxClose.addEventListener('click', closeLightbox);
  
  // Закрити при кліку поза зображенням
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Закрити при натисканні ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// === ДОПОМІЖНА ФУНКЦІЯ: АНІМАЦІЯ ПРИ ПОЯВІ В VIEWPORT ===
// Можна використати для анімації елементів при прокрутці
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Додайте клас 'observe' до елементів, які хочете анімувати
  const elementsToObserve = document.querySelectorAll('.observe');
  elementsToObserve.forEach(el => observer.observe(el));
}

// Викликати функцію спостереження (опціонально)
// observeElements();

// === АКТИВНЕ ПОСИЛАННЯ В НАВІГАЦІЇ ===
// Автоматично підсвічує активну сторінку в меню
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Викликати при завантаженні
setActiveNavLink();

/* ============================================
   ІНСТРУКЦІЇ ДЛЯ РЕДАГУВАННЯ:
   
   1. Щоб додати нову функцію:
      - Створіть функцію (наприклад: function myNewFunction() { ... })
      - Викличте її в initMobileMenu() на початку
   
   2. Щоб змінити поведінку фільтрів:
      - Відредагуйте функцію initPhotoGallery()
   
   3. Щоб налаштувати пошук:
      - Відредагуйте функцію initRecordsSearch()
   
   4. Всі анімації можна налаштувати через CSS
      (файл style.css, секція АНІМАЦІЇ)
   ============================================ */

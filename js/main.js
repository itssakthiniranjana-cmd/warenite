/**
 * LOGIXO - LOGISTICS & TRANSPORTATION INTERACTIVE JS
 * Complete Slider, Animation, Counter & Modal Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initSideAreaDrawer();
  initSearchModal();
  initHeroSlider();
  initBookingTabs();
  initAnimatedCounters();
  initTestimonialCarousel();
  initVideoModal();
  initScrollReveal();
  initBackToTop();
  initSkillBars();
  initProjectFilter();
  initPricingToggle();
  initFeTabs();
  initFeHotspots();
});

/* ==========================================================================
   01. STICKY HEADER
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   02. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');

  if (!drawer) return;

  function open() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      close();
    }
  });

  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      close();
    });
  });
}

/* ==========================================================================
   03. HERO SLIDER ENGINE (Auto-rotation, Transitions & Arrows)
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.hero-slider-dots');
  const prevBtn = document.querySelector('.hero-slider-arrow.prev');
  const nextBtn = document.querySelector('.hero-slider-arrow.next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 6000;

  // Create dots if container exists
  if (dotsContainer && !dotsContainer.children.length) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('hero-dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.hero-dot');

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  // Pause on hover
  const sliderSection = document.querySelector('.hero-slider-section');
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderSection.addEventListener('mouseleave', () => startInterval());
  }

  startInterval();
}

/* ==========================================================================
   04. QUICK TRACK & FREIGHT BOOKING TABS
   ========================================================================== */
function initBookingTabs() {
  const tabBtns = document.querySelectorAll('.booking-tab-btn');
  const tabPanes = document.querySelectorAll('.booking-tab-pane');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   05. LIVE SHIPMENT TRACKING SIMULATOR
   ========================================================================== */
window.trackShipmentHero = function() {
  const code = document.getElementById('heroTrackingCode').value.trim() || 'LGX-90821-USA';
  const res = document.getElementById('heroTrackResult');
  if (!res) return;

  res.style.display = 'block';
  res.innerHTML = `
    <div class="track-result-box">
      <div class="track-header-bar">
        <div>
          <span style="font-family: var(--font-tech); font-size: 0.8125rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase;">Tracking Number</span>
          <h3 style="font-size: 1.375rem; font-weight: 800; color: var(--color-text-main); margin: 2px 0 0;">${code}</h3>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="background: #ECFDF5; color: #047857; padding: 6px 14px; border-radius: 20px; font-weight: 800; font-size: 0.8125rem; border: 1px solid #A7F3D0;">
            ● IN TRANSIT — ON SCHEDULE
          </span>
        </div>
      </div>

      <!-- 4-Stage Stepper -->
      <div class="track-stepper">
        <div class="track-stepper-progress"></div>
        
        <div class="step-node completed">
          <div class="step-icon-circle">✓</div>
          <div class="step-title">Dallas Hub</div>
          <div class="step-desc">Cargo Scanned (08:30 AM)</div>
        </div>

        <div class="step-node completed">
          <div class="step-icon-circle">✓</div>
          <div class="step-title">Customs Cleared</div>
          <div class="step-desc">DFW Cargo Ramp (12:45 PM)</div>
        </div>

        <div class="step-node active">
          <div class="step-icon-circle">✈</div>
          <div class="step-title">In Flight</div>
          <div class="step-desc">Boeing 777-F (En Route)</div>
        </div>

        <div class="step-node">
          <div class="step-icon-circle">📦</div>
          <div class="step-title">Final Delivery</div>
          <div class="step-desc">Est. Tomorrow, 3:00 PM</div>
        </div>
      </div>

      <div style="background: var(--color-bg-body); padding: 14px 18px; border-radius: 8px; border: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; flex-wrap: wrap; gap: 10px;">
        <div><strong>Origin:</strong> Dallas DFW Facility &rarr; <strong>Destination:</strong> Frankfurt Airport Hub (FRA)</div>
        <div><strong>Cargo:</strong> 450 lbs Express Freight | Priority Class 1</div>
      </div>
    </div>
  `;
};

/* ==========================================================================
   06. ANIMATED MILESTONE COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const counterItems = document.querySelectorAll('.counter-num');
  if (!counterItems.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterItems.forEach(item => {
          const text = item.innerText;
          const target = parseFloat(text.replace(/[^0-9.]/g, ''));
          const isPercent = text.includes('%');
          const isPlus = text.includes('+');

          let count = 0;
          const duration = 2000;
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
              if (isPercent) {
                item.innerText = count.toFixed(1) + '%';
              } else {
                item.innerText = Math.floor(count).toLocaleString() + (isPlus ? '+' : '');
              }
            } else {
              if (isPercent) {
                item.innerText = count.toFixed(1) + '%';
              } else {
                item.innerText = Math.floor(count).toLocaleString() + (isPlus ? '+' : '');
              }
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const counterSection = document.querySelector('.counter-strip');
  if (counterSection) observer.observe(counterSection);
}

/* ==========================================================================
   07. TESTIMONIAL CAROUSEL SLIDER
   ========================================================================== */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');

  if (!track) return;

  let position = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  if (!slides.length) return;

  function updateTrack() {
    const slideWidth = slides[0].offsetWidth + 30;
    track.style.transform = `translateX(-${position * slideWidth}px)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxPos = Math.max(0, slides.length - 3);
      if (position < maxPos) {
        position++;
      } else {
        position = 0;
      }
      updateTrack();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (position > 0) {
        position--;
      } else {
        position = Math.max(0, slides.length - 3);
      }
      updateTrack();
    });
  }

  window.addEventListener('resize', updateTrack);
}

/* ==========================================================================
   08. VIDEO MODAL POPUP
   ========================================================================== */
function initVideoModal() {
  const playBtns = document.querySelectorAll('.video-play-btn');
  const modal = document.getElementById('videoModalBackdrop');
  const closeBtn = document.getElementById('videoModalClose');

  if (!playBtns.length || !modal) return;

  playBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ==========================================================================
   09. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(r => observer.observe(r));
}

/* ==========================================================================
   10. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btt = document.getElementById('backToTopBtn');
  if (!btt) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btt.classList.add('show');
    } else {
      btt.classList.remove('show');
    }
  });

  btt.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   11. ANIMATED SKILL / CAPABILITY PROGRESS BARS
   ========================================================================== */
function initSkillBars() {
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  if (!skillFills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(bar => {
          const targetPercent = bar.getAttribute('data-percent') || '90%';
          bar.style.width = targetPercent;
        });
      }
    });
  }, { threshold: 0.2 });

  const skillSection = document.querySelector('.skill-bar-wrap');
  if (skillSection) observer.observe(skillSection);
}

/* ==========================================================================
   12. PROJECT / PORTFOLIO FILTER TABS
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          card.style.animation = 'slideFadeUp 0.5s ease both';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   13. PRICING MONTHLY / YEARLY TOGGLE
   ========================================================================== */
function initPricingToggle() {
  const toggle = document.getElementById('pricingBillingToggle');
  const priceAmounts = document.querySelectorAll('.pricing-price-amount');

  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const isYearly = toggle.checked;
    priceAmounts.forEach(el => {
      const monthly = el.getAttribute('data-monthly');
      const yearly = el.getAttribute('data-yearly');
      if (isYearly && yearly) {
        el.innerText = '$' + yearly;
      } else if (monthly) {
        el.innerText = '$' + monthly;
      }
    });
  });
}

/* ==========================================================================
   14. FREIGHTEXPRESS SIDE-AREA DRAWER
   ========================================================================== */
function initSideAreaDrawer() {
  const toggleBtns = document.querySelectorAll('.side-toggle-btn, #sideAreaToggle');
  const closeBtn = document.getElementById('sideAreaClose');
  const drawer = document.getElementById('sideAreaDrawer');
  const backdrop = document.getElementById('sideAreaBackdrop');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   15. SEARCH MODAL OVERLAY
   ========================================================================== */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('#headerSearchBtn, .header-search-btn');
  const searchModal = document.getElementById('searchModalOverlay');
  const searchClose = document.getElementById('searchModalClose');
  const searchInput = document.getElementById('headerSearchInput');
  const searchForm = document.getElementById('headerSearchForm');

  if (!searchModal) return;

  function openSearch() {
    searchModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 150);
    }
  }

  function closeSearch() {
    searchModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      closeSearch();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('open')) {
      closeSearch();
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      if (q.includes('air') || q.includes('flight') || q.includes('plane')) {
        window.location.href = 'air-freight.html';
      } else if (q.includes('service') || q.includes('ocean') || q.includes('warehous')) {
        window.location.href = 'services.html';
      } else if (q.includes('tech') || q.includes('track') || q.includes('ai')) {
        window.location.href = 'technology.html';
      } else if (q.includes('about') || q.includes('team')) {
        window.location.href = 'about.html';
      } else if (q.includes('contact') || q.includes('quote')) {
        window.location.href = 'quote.html';
      } else {
        window.location.href = 'services.html';
      }
    });
  }

  const pills = document.querySelectorAll('.search-suggestion-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = pill.innerText;
        if (searchForm) searchForm.dispatchEvent(new Event('submit'));
      }
    });
  });
}

/* ==========================================================================
   16. FREIGHTEXPRESS 3-TAB SWITCHER
   ========================================================================== */
function initFeTabs() {
  const tabBtns = document.querySelectorAll('.fe-tab-btn');
  const tabPanes = document.querySelectorAll('.fe-tab-pane');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   17. FREIGHTEXPRESS WORLD MAP HOTSPOTS
   ========================================================================== */
function initFeHotspots() {
  const pins = document.querySelectorAll('.fe-hotspot-pin');

  if (!pins.length) return;

  pins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = pin.classList.contains('active');
      pins.forEach(p => p.classList.remove('active'));
      if (!isActive) {
        pin.classList.add('active');
      }
    });
  });

  document.addEventListener('click', () => {
    pins.forEach(p => p.classList.remove('active'));
  });
}


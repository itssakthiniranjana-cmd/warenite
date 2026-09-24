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
  initAiConsoleInteractivity();
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
   03. HERO SHOWCASE / SLIDER ENGINE (3-Panel Sliced Layout & 01/02/03 Tabs)
   ========================================================================== */
function initHeroSlider() {
  const showcaseSlides = document.querySelectorAll('.hero-showcase-slide');
  const allTabBtns = document.querySelectorAll('.hero-tab-item');
  const showcaseContainer = document.querySelector('.hero-showcase-section');

  if (showcaseSlides.length) {
    let currentSlide = 0; // Default to Slide 0 (Logistics Powered by Intelligence)
    let autoTimer = null;
    const duration = 6500;

    function activateSlide(index) {
      currentSlide = index;
      showcaseSlides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === index);
      });

      allTabBtns.forEach(btn => {
        const target = parseInt(btn.getAttribute('data-target-slide'), 10);
        btn.classList.toggle('active', target === index);
      });
    }

    allTabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(btn.getAttribute('data-target-slide'), 10);
        if (!isNaN(targetIdx)) {
          activateSlide(targetIdx);
          restartTimer();
        }
      });
    });

    function nextShowcase() {
      let next = (currentSlide + 1) % showcaseSlides.length;
      activateSlide(next);
    }

    function startTimer() {
      autoTimer = setInterval(nextShowcase, duration);
    }

    function restartTimer() {
      clearInterval(autoTimer);
      startTimer();
    }

    if (showcaseContainer) {
      showcaseContainer.addEventListener('mouseenter', () => clearInterval(autoTimer));
      showcaseContainer.addEventListener('mouseleave', () => startTimer());
    }

    startTimer();
  }

  // Legacy fallback if hero-slide elements exist
  const legacySlides = document.querySelectorAll('.hero-slide');
  if (legacySlides.length && !showcaseSlides.length) {
    let curr = 0;
    setInterval(() => {
      curr = (curr + 1) % legacySlides.length;
      legacySlides.forEach((s, i) => s.classList.toggle('active', i === curr));
    }, 6000);
  }
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

/* ==========================================================================
   18. WAREKNIT AI COPILOT & COMMAND CANVAS INTERACTIVITY
   ========================================================================== */
function initAiConsoleInteractivity() {
  const promptChips = document.querySelectorAll('.ai-prompt-chip[data-prompt]');
  const inputField = document.getElementById('aiConsoleInput');
  const modeTabs = document.querySelectorAll('.ai-mode-tab-btn[data-mode]');

  // Prompt Pill click handlers
  if (promptChips.length && inputField) {
    promptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.getAttribute('data-prompt');
        inputField.value = text;
        inputField.focus();
        handleAiQuerySubmit();
      });
    });
  }

  // 4 Mode Tabs Click Handlers
  if (modeTabs.length) {
    modeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        modeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const mode = tab.getAttribute('data-mode');
        switchAiCanvasMode(mode);
      });
    });
  }
}

function switchAiCanvasMode(mode) {
  const input = document.getElementById('aiConsoleInput');
  if (!input) return;

  if (mode === 'stockout') {
    input.value = "Analyze SKU-102 depletion rate and reorder date.";
  } else if (mode === 'routing') {
    input.value = "Optimize Wave 4 packing station assignments.";
  } else if (mode === 'rates') {
    input.value = "Calculate multi-carrier rate savings for today's volume.";
  } else {
    input.value = "Show me today's fulfillment exceptions.";
  }
  handleAiQuerySubmit();
}

function handleAiQuerySubmit() {
  const input = document.getElementById('aiConsoleInput');
  const stream = document.getElementById('aiCopilotStream');
  if (!input || !stream) return;

  const queryText = input.value.trim();
  if (!queryText) return;

  // Append user query bubble in modern styling
  const userCard = document.createElement('div');
  userCard.className = 'ai-alert-box-modern info';
  userCard.style.animation = 'feFadeIn 0.3s ease';
  userCard.innerHTML = `
    <div class="ai-alert-icon" style="color: #38BDF8; background: rgba(56, 189, 248, 0.15);">💬</div>
    <div class="ai-alert-body">
      <strong>User Query &middot; Live Floor Terminal</strong>
      <p style="color: #E2E8F0; font-family: var(--font-tech); font-size: 0.8125rem;">"${queryText}"</p>
    </div>
  `;
  stream.appendChild(userCard);

  // Auto scroll
  stream.scrollTop = stream.scrollHeight;

  // Simulate AI streaming response
  setTimeout(() => {
    const aiResponseCard = document.createElement('div');
    aiResponseCard.style.animation = 'feFadeIn 0.4s ease';

    let answerHtml = '';
    const qLower = queryText.toLowerCase();

    if (qLower.includes('sku-102') || qLower.includes('runout') || qLower.includes('stockout')) {
      aiResponseCard.className = 'ai-alert-box-modern danger';
      answerHtml = `
        <div class="ai-alert-icon" style="color: #EF4444; background: rgba(239, 68, 68, 0.15);">📦</div>
        <div class="ai-alert-body">
          <strong>SKU-102 Inventory Runout Diagnostic</strong>
          <p>48 units remaining in Dallas Hub. Current velocity: 16 units/day. Projected depletion in 36 hours. Suggested action: Draft supplier replenishment PO #4481.</p>
          <div style="margin-top: 8px;">
            <button class="ai-insight-action-btn" onclick="alert('Action Executed: Supplier PO #4481 submitted to vendor system.');">
              <span>📋 Draft Supplier PO #4481</span>
            </button>
          </div>
        </div>
      `;
    } else if (qLower.includes('wave 4') || qLower.includes('station') || qLower.includes('route') || qLower.includes('optimize')) {
      aiResponseCard.className = 'ai-alert-box-modern warning';
      answerHtml = `
        <div class="ai-alert-icon" style="color: #F59E0B; background: rgba(245, 158, 11, 0.15);">⚡</div>
        <div class="ai-alert-body">
          <strong>Wave #4 Packing Station Balancing</strong>
          <p>Wave 4 contains 142 units across Aisle B-02. Recommended action: Route 4 pickers to High-Velocity Station #2 to meet FedEx 15:45 CST trailer cutoff.</p>
          <div style="margin-top: 8px;">
            <button class="ai-insight-action-btn" onclick="alert('Action Executed: Dynamic wave balancing applied across Station #2.');">
              <span>⚡ Apply Wave Balancing</span>
            </button>
          </div>
        </div>
      `;
    } else if (qLower.includes('carrier') || qLower.includes('rate') || qLower.includes('shopping')) {
      aiResponseCard.className = 'ai-alert-box-modern success';
      answerHtml = `
        <div class="ai-alert-icon" style="color: #10B981; background: rgba(16, 185, 129, 0.15);">🚚</div>
        <div class="ai-alert-body">
          <strong>Multi-Carrier Rate & SLA Optimization</strong>
          <p>Analyzed 1,284 shipments across FedEx, UPS, and Regional Ground. Dynamic zone skipping saved $842.10 today (14.2% rate reduction) with 100% on-time delivery confidence.</p>
        </div>
      `;
    } else {
      aiResponseCard.className = 'ai-alert-box-modern info';
      answerHtml = `
        <div class="ai-alert-icon" style="color: #38BDF8; background: rgba(56, 189, 248, 0.15);">✓</div>
        <div class="ai-alert-body">
          <strong>Warehouse Operational Health & SLA Status</strong>
          <p>1,284 orders processed. 12 operational exceptions surfaced and triaged. Dallas Hub operating at 99.8% precision with an average 14-minute buffer ahead of carrier pickup windows.</p>
        </div>
      `;
    }

    aiResponseCard.innerHTML = answerHtml;
    stream.appendChild(aiResponseCard);
    stream.scrollTop = stream.scrollHeight;
  }, 350);
}



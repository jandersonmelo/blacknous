document.addEventListener('DOMContentLoaded', () => {
    const cardsGrid = document.getElementById('cards-grid');
    const categoryFilters = document.getElementById('category-filters');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const resetBtn = document.getElementById('reset-btn');
    const totalCardsEl = document.getElementById('total-cards');
    const studiedCardsEl = document.getElementById('studied-cards');
    const progressPercent = document.getElementById('progress-percent');
    const progressRingFill = document.getElementById('progress-ring-fill');
    
    // Navigation elements
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentIndexEl = document.getElementById('current-index');
    const totalFilteredEl = document.getElementById('total-filtered');

    // Music elements
    const musicBtn = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isMusicPlaying = false;

    let currentCards = [...flashcardsDB];
    let studiedSet = new Set();
    let currentCategory = 'all';
    let currentIndex = 0;

    // Touch / swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    const SWIPE_THRESHOLD = 50;
    const SWIPE_TIME_LIMIT = 300;

    // Inicializar
    function init() {
        renderCategoryFilters();
        updateStats();
        renderCurrentCard();
        setupMusicToggle();
        setupSwipeGestures();
        setupKeyboardNav();
    }

    // ── Music toggle ──
    function setupMusicToggle() {
        if (!musicBtn || !bgMusic) return;
        bgMusic.volume = 0.3;

        const setMusicOn = () => {
            isMusicPlaying = true;
            musicBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
            `;
            musicBtn.classList.add('music-on');
        };

        const setMusicOff = () => {
            isMusicPlaying = false;
            musicBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
            `;
            musicBtn.classList.remove('music-on');
        };

        // Try autoplay
        const tryAutoplay = () => {
            bgMusic.play().then(() => {
                setMusicOn();
            }).catch(() => {
                document.body.addEventListener('click', function startOnFirstClick() {
                    if (!isMusicPlaying) {
                        bgMusic.play().then(() => setMusicOn()).catch(() => {});
                    }
                    document.body.removeEventListener('click', startOnFirstClick);
                }, { once: true });
            });
        };

        tryAutoplay();
        
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isMusicPlaying) {
                bgMusic.pause();
                setMusicOff();
            } else {
                bgMusic.play().then(() => setMusicOn());
            }
        });
    }

    // ── Category filters ──
    function renderCategoryFilters() {
        const categories = Object.keys(categoryColors);
        
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'cat-chip';
            btn.dataset.category = cat;
            btn.textContent = cat;
            
            const colors = categoryColors[cat];
            btn.style.color = colors.primary;
            btn.style.borderColor = colors.primary;
            
            btn.addEventListener('click', () => {
                setActiveCategory(cat, btn);
            });
            
            categoryFilters.appendChild(btn);
        });

        // 'all' button handler
        const allBtn = document.querySelector('.cat-chip[data-category="all"]');
        allBtn.addEventListener('click', () => {
            setActiveCategory('all', allBtn);
        });
        allBtn.style.borderColor = 'rgba(255,255,255,0.2)';
    }

    function setActiveCategory(cat, activeBtn) {
        document.querySelectorAll('.cat-chip').forEach(p => {
            p.classList.remove('active');
            p.style.background = 'transparent';
            if (p.dataset.category !== 'all') {
                const c = categoryColors[p.dataset.category];
                if (c) p.style.color = c.primary;
            } else {
                p.style.color = 'var(--text-muted)';
            }
        });
        
        activeBtn.classList.add('active');
        if (cat !== 'all') {
            const colors = categoryColors[cat];
            activeBtn.style.background = colors.bg;
            activeBtn.style.color = colors.primary;
        } else {
            activeBtn.style.background = 'rgba(255,255,255,0.1)';
            activeBtn.style.color = 'var(--text-primary)';
        }
        
        currentCategory = cat;
        filterCards();
    }

    // ── Filter cards ──
    function filterCards() {
        if (currentCategory === 'all') {
            currentCards = [...flashcardsDB];
        } else {
            currentCards = flashcardsDB.filter(c => c.category === currentCategory);
        }
        currentIndex = 0;
        renderCurrentCard();
    }

    // ── Render current card ──
    function renderCurrentCard() {
        cardsGrid.innerHTML = '';
        
        if (currentCards.length === 0) {
            cardsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📭</div>
                    <h3>Nenhum flashcard encontrado</h3>
                    <p>Tente outra categoria.</p>
                </div>
            `;
            updateNavigationControls();
            return;
        }

        const card = currentCards[currentIndex];
        const colors = categoryColors[card.category] || categoryColors["Sistemas Operacionais"];
        const iconSvg = categoryIcons[card.category] || categoryIcons["Sistemas Operacionais"];
        
        const cardEl = document.createElement('div');
        cardEl.className = 'flashcard-wrapper';
        cardEl.style.animation = 'none';
        cardEl.offsetHeight; // reflow
        cardEl.style.animation = 'cardAppear 0.35s ease-out both';
        
        const isStudied = studiedSet.has(card.id);
        
        cardEl.innerHTML = `
            <div class="flashcard">
                <div class="flashcard-face flashcard-front">
                    <div class="card-header">
                        <div class="card-category-icon" style="background: ${colors.gradient}; box-shadow: 0 4px 12px ${colors.glow};">
                            ${iconSvg}
                        </div>
                        <div class="card-number">#${String(card.id).padStart(2, '0')}</div>
                    </div>
                    <div class="card-body">
                        <div class="card-emoji">${card.emoji}</div>
                        <h2 class="card-term">${card.term}</h2>
                    </div>
                    <div class="card-footer">
                        <div class="card-subcategory">${card.subcategory}</div>
                        <div class="card-flip-hint">
                            Virar
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                        </div>
                    </div>
                </div>
                <div class="flashcard-face flashcard-back">
                    <div class="card-glow" style="background: ${colors.gradient}"></div>
                    <div class="back-header">
                        <div class="back-term">
                            <span>${card.emoji}</span>
                            ${card.term}
                        </div>
                        <div class="back-close-hint">Voltar</div>
                    </div>
                    <div class="back-detail">${card.detail}</div>
                    <div class="back-tip" style="background: ${colors.bg}; color: ${colors.primary}; border-left-color: ${colors.primary}">
                        ${card.tip}
                    </div>
                </div>
            </div>
        `;
        
        if (isStudied) {
            cardEl.querySelector('.flashcard-front').style.borderColor = colors.primary;
        }

        cardEl.addEventListener('click', (e) => {
            // Don't flip if user was swiping
            if (e.detail === -1) return; // custom flag for swipe

            const flashcardInner = cardEl.querySelector('.flashcard');
            flashcardInner.classList.toggle('flipped');
            
            if (!studiedSet.has(card.id)) {
                studiedSet.add(card.id);
                cardEl.querySelector('.flashcard-front').style.borderColor = colors.primary;
                updateStats();
            }
        });

        cardsGrid.appendChild(cardEl);
        updateNavigationControls();
    }

    function updateNavigationControls() {
        if (currentCards.length === 0) {
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            currentIndexEl.textContent = '0';
            totalFilteredEl.textContent = '0';
            return;
        }

        currentIndexEl.textContent = currentIndex + 1;
        totalFilteredEl.textContent = currentCards.length;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === currentCards.length - 1;
    }

    // ── Navigation events ──
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderCurrentCard();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentCards.length - 1) {
            currentIndex++;
            renderCurrentCard();
        }
    });

    // ── Keyboard navigation ──
    function setupKeyboardNav() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
                prevBtn.click();
            } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
                nextBtn.click();
            } else if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                const flashcard = document.querySelector('.flashcard');
                if (flashcard) flashcard.classList.toggle('flipped');

                // Mark as studied
                const card = currentCards[currentIndex];
                if (card && !studiedSet.has(card.id)) {
                    studiedSet.add(card.id);
                    const front = document.querySelector('.flashcard-front');
                    const colors = categoryColors[card.category];
                    if (front && colors) front.style.borderColor = colors.primary;
                    updateStats();
                }
            }
        });
    }

    // ── Swipe gestures ──
    function setupSwipeGestures() {
        const stage = document.querySelector('.card-stage');

        stage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        stage.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            const dt = Date.now() - touchStartTime;

            if (dt > SWIPE_TIME_LIMIT) return;
            if (Math.abs(dy) > Math.abs(dx)) return; // vertical scroll, ignore

            if (dx < -SWIPE_THRESHOLD && !nextBtn.disabled) {
                currentIndex++;
                renderCurrentCard();
            } else if (dx > SWIPE_THRESHOLD && !prevBtn.disabled) {
                currentIndex--;
                renderCurrentCard();
            }
        }, { passive: true });
    }

    // ── Shuffle ──
    shuffleBtn.addEventListener('click', () => {
        currentCards = shuffleArray(currentCards);
        currentIndex = 0;
        renderCurrentCard();
        
        shuffleBtn.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => { shuffleBtn.style.transform = ''; }, 300);
    });

    // ── Reset ──
    resetBtn.addEventListener('click', () => {
        studiedSet.clear();
        updateStats();
        
        const frontFace = document.querySelector('.flashcard-front');
        if (frontFace) {
            frontFace.style.borderColor = 'rgba(255,255,255,0.12)';
        }
        
        resetBtn.style.transform = 'scale(0.9) rotate(-360deg)';
        setTimeout(() => { resetBtn.style.transform = ''; }, 400);
    });

    // ── Stats ──
    function updateStats() {
        const total = flashcardsDB.length;
        const studied = studiedSet.size;
        const percent = Math.round((studied / total) * 100) || 0;
        
        totalCardsEl.textContent = total;
        studiedCardsEl.textContent = studied;
        progressPercent.textContent = `${percent}%`;
        
        // Update ring
        progressRingFill.setAttribute('stroke-dasharray', `${percent}, 100`);
    }

    init();
});

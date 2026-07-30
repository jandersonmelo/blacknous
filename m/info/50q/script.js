document.addEventListener("DOMContentLoaded", () => {
    // Check if questoes exists
    if (typeof questoes === 'undefined' || questoes.length === 0) {
        document.getElementById('card-container').innerHTML = '<p style="text-align:center; margin-top:2rem;">Erro: Questões não encontradas no arquivo data.js.</p>';
        return;
    }

    let currentIndex = 0;
    const totalQuestions = questoes.length;
    
    // UI Elements
    const cardContainer = document.getElementById("card-container");
    const currentQNumEl = document.getElementById("current-q-num");
    const totalQNumEl = document.getElementById("total-q-num");
    const progressBar = document.getElementById("progress-bar");
    
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    const btnPrint = document.getElementById("btn-print-app");
    
    // State for user answers
    const userAnswers = new Array(totalQuestions).fill(null);
    const showingResolution = new Array(totalQuestions).fill(false);
    
    // Initialize
    totalQNumEl.textContent = totalQuestions;
    renderQuestion(currentIndex, 'none');
    
    // Render a single question
    function renderQuestion(index, animationDir) {
        const q = questoes[index];
        if (!q) return;
        
        // Remove old card immediately to prevent absolute positioning bugs
        cardContainer.innerHTML = '';
        
        const card = document.createElement("article");
        const inAnim = animationDir === 'left' ? 'slide-in-right' : (animationDir === 'right' ? 'slide-in-left' : 'fade-in');
        card.className = `question-card ${inAnim}`;
        
        // Alternatives
        let altsHtml = '<ul class="alternatives">';
        q.alternativas.forEach((alt, i) => {
            const letter = String.fromCharCode(65 + i); // A, B, C...
            
            let classes = "alternative";
            if (userAnswers[index] === i) classes += " selected";
            
            // If resolution is showing, highlight correct/wrong
            if (showingResolution[index]) {
                if (i === q.resposta) classes += " correct";
                else if (userAnswers[index] === i) classes += " wrong";
            }
            
            altsHtml += `
                <li class="${classes}" data-index="${i}">
                    <span class="alt-letter">${letter})</span>
                    <span class="alt-text">${alt}</span>
                </li>
            `;
        });
        altsHtml += '</ul>';

        const correctLetter = String.fromCharCode(65 + q.resposta);
        const resClasses = showingResolution[index] ? "resolution-content show" : "resolution-content";
        const btnResText = showingResolution[index] ? "Ocultar Resolução" : "Ver Resolução";

        card.innerHTML = `
            <div class="q-meta">
                <span class="q-tag banca">${q.banca}</span>
                <span class="q-tag">${q.orgao}</span>
                <span class="q-tag">${q.ano}</span>
            </div>
            <div class="q-text">
                ${q.enunciado}
            </div>
            ${altsHtml}
            <button class="btn-resolution">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <span class="btn-res-text">${btnResText}</span>
            </button>
            <div class="${resClasses}">
                <span class="res-correct">Gabarito: ${correctLetter}</span>
                <div class="res-text">${q.comentario}</div>
            </div>
        `;
        
        // Add event listeners to alternatives
        const altEls = card.querySelectorAll('.alternative');
        altEls.forEach(el => {
            el.addEventListener('click', () => {
                if (showingResolution[index]) return; // Block changes if resolution is open
                
                // Remove selected from all
                altEls.forEach(a => a.classList.remove('selected'));
                // Add to clicked
                el.classList.add('selected');
                
                userAnswers[index] = parseInt(el.getAttribute('data-index'));
            });
        });
        
        // Add event listener to resolution button
        const btnRes = card.querySelector('.btn-resolution');
        btnRes.addEventListener('click', () => {
            showingResolution[index] = !showingResolution[index];
            const resContent = card.querySelector('.resolution-content');
            const btnText = card.querySelector('.btn-res-text');
            
            if (showingResolution[index]) {
                resContent.classList.add('show');
                btnText.textContent = "Ocultar Resolução";
                
                // Color alternatives
                altEls.forEach(el => {
                    const i = parseInt(el.getAttribute('data-index'));
                    if (i === q.resposta) el.classList.add('correct');
                    else if (userAnswers[index] === i) el.classList.add('wrong');
                });
            } else {
                resContent.classList.remove('show');
                btnText.textContent = "Ver Resolução";
                
                // Remove colors
                altEls.forEach(el => {
                    el.classList.remove('correct', 'wrong');
                });
            }
            
            // Scroll to bottom of card to see resolution if needed
            setTimeout(() => {
                const mainArea = document.querySelector('.app-main');
                mainArea.scrollTo({
                    top: mainArea.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        });
        
        cardContainer.appendChild(card);
        
        // Update header info
        currentQNumEl.textContent = index + 1;
        
        // Update progress bar
        const progressPercent = ((index + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // Reset scroll
        document.querySelector('.app-main').scrollTop = 0;
        
        updateNavButtons();
    }

    function updateNavButtons() {
        btnPrev.disabled = currentIndex === 0;
        
        if (currentIndex === totalQuestions - 1) {
            btnNext.disabled = true;
            btnNext.innerHTML = '<span>Fim</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        } else {
            btnNext.disabled = false;
            btnNext.innerHTML = '<span>Próxima</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
        }
    }

    function goNext() {
        if (currentIndex < totalQuestions - 1) {
            currentIndex++;
            renderQuestion(currentIndex, 'left');
        }
    }

    function goPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion(currentIndex, 'right');
        }
    }

    btnNext.addEventListener('click', goNext);
    btnPrev.addEventListener('click', goPrev);

    // Swipe gestures implementation
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50;

    const mainArea = document.querySelector('.app-main');
    
    mainArea.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, {passive: true});

    mainArea.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const diffX = touchEndX - touchStartX;
        const diffY = Math.abs(touchEndY - touchStartY);
        
        // Prevent swipe if scrolling vertically
        if (diffY > Math.abs(diffX)) return;

        if (diffX < -swipeThreshold) {
            // Swiped left -> Next
            goNext();
        }
        if (diffX > swipeThreshold) {
            // Swiped right -> Prev
            goPrev();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goNext();
        if (e.key === 'ArrowLeft') goPrev();
    });

    // Show toast for swipe tutorial on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }, 1000);
    }

    // Print functionality
    btnPrint.addEventListener("click", () => {
        generatePrintContent();
        window.print();
    });
    
    function generatePrintContent() {
        const printContainer = document.getElementById("print-questions-container");
        printContainer.innerHTML = '';
        
        questoes.forEach((q, index) => {
            let altsHtml = '<ul class="print-alts">';
            q.alternativas.forEach((alt, i) => {
                const letter = String.fromCharCode(65 + i);
                altsHtml += `<li><strong>${letter})</strong> ${alt}</li>`;
            });
            altsHtml += '</ul>';
            
            const correctLetter = String.fromCharCode(65 + q.resposta);
            
            printContainer.innerHTML += `
                <div class="print-card">
                    <div class="print-meta">Questão ${index + 1} | ${q.banca} - ${q.orgao} (${q.ano})</div>
                    <div class="print-text">${q.enunciado}</div>
                    ${altsHtml}
                    <div class="print-res">
                        <strong>Gabarito: ${correctLetter}</strong><br>
                        ${q.comentario}
                    </div>
                </div>
            `;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* --- FAQ ACCORDION --- */
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            // Toggle active class
            this.classList.toggle('active');

            // Toggle panel
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }

            // Optional: Close others when one is opened (Accordion behavior)
            accordions.forEach(otherAcc => {
                if (otherAcc !== this && otherAcc.classList.contains('active')) {
                    otherAcc.classList.remove('active');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });

    /* --- INFINITE SCROLL CAROUSEL WITH DRAG --- */
    const track = document.getElementById('carouselTrack');
    if (track) {
        // Clone the items to ensure smooth infinite loop
        track.innerHTML += track.innerHTML;

        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollId;
        const speed = 1.2;

        const loop = () => {
            if (!isDown) {
                track.scrollLeft += speed;
                checkLoop();
            }
            autoScrollId = requestAnimationFrame(loop);
        };

        const checkLoop = () => {
            const halfWidth = track.scrollWidth / 2;
            if (track.scrollLeft >= halfWidth) {
                track.scrollLeft -= halfWidth;
            } else if (track.scrollLeft <= 0) {
                track.scrollLeft += halfWidth;
            }
        };

        // Start auto scroll
        loop();

        // Mouse Events
        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX;
            cancelAnimationFrame(autoScrollId);
            track.style.cursor = 'grabbing';
        });

        track.addEventListener('mouseleave', () => {
            if (isDown) {
                isDown = false;
                track.style.cursor = 'grab';
                loop();
            }
        });

        track.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                track.style.cursor = 'grab';
                loop();
            }
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (startX - x) * 1.5; // Drag speed multiplier
            track.scrollLeft += walk;
            startX = x; // Update startX
            checkLoop();
        });

        // Touch Events
        track.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX;
            cancelAnimationFrame(autoScrollId);
        }, { passive: true });

        track.addEventListener('touchend', () => {
            if (isDown) {
                isDown = false;
                loop();
            }
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX;
            const walk = (startX - x) * 1.5;
            track.scrollLeft += walk;
            startX = x;
            checkLoop();
        }, { passive: true });
    }

    /* --- UPSELL POPUP LOGIC --- */
    const btnBasicPlan = document.getElementById('btnBasicPlan');
    const upsellPopup = document.getElementById('upsellPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');
    
    if (btnBasicPlan && upsellPopup && closePopupBtn) {
        btnBasicPlan.addEventListener('click', (e) => {
            e.preventDefault();
            upsellPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            startUpsellTimer();
        });

        closePopupBtn.addEventListener('click', () => {
            upsellPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    /* --- 15 MINUTE TIMER --- */
    let timerInterval;
    function startUpsellTimer() {
        if (timerInterval) return; // Already started
        let timeInSeconds = 15 * 60; // 15 minutes
        const timerDisplay = document.getElementById('upsellTimer');
        
        if (timerDisplay) {
            timerInterval = setInterval(() => {
                timeInSeconds--;
                if (timeInSeconds < 0) {
                    clearInterval(timerInterval);
                    return;
                }
                const minutes = Math.floor(timeInSeconds / 60);
                const seconds = timeInSeconds % 60;
                timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }
    }

    /* --- DYNAMIC YEAR --- */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});

// FreeFromFaith — Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    // Cursor glow
    const glow = document.getElementById('cursorGlow');
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // Nav scroll
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

    // Mobile menu
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    toggle.addEventListener('click', () => menu.classList.toggle('active'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('active')));

    // Reveal on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    // Parallax on scroll
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        window.addEventListener('scroll', () => {
            const rect = parallaxImg.parentElement.getBoundingClientRect();
            const speed = 0.3;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                parallaxImg.style.transform = `translateY(${rect.top * speed}px)`;
            }
        });
    }

    // Breathing exercise
    const breathBtn = document.getElementById('breathBtn');
    const breathVisual = document.getElementById('breathingVisual');
    const breathText = document.getElementById('breathText');
    let breathInterval = null, breathing = false;

    breathBtn.addEventListener('click', () => {
        if (breathing) {
            clearInterval(breathInterval);
            breathVisual.className = 'breathing-visual';
            breathText.textContent = 'Inhale';
            breathBtn.textContent = 'Start Breathing Exercise';
            breathing = false;
            return;
        }
        breathing = true;
        breathBtn.textContent = 'Stop';
        let phase = 'inhale';
        function cycle() {
            if (phase === 'inhale') { breathVisual.className = 'breathing-visual inhale'; breathText.textContent = 'Inhale'; phase = 'hold'; }
            else if (phase === 'hold') { breathText.textContent = 'Hold'; phase = 'exhale'; }
            else { breathVisual.className = 'breathing-visual exhale'; breathText.textContent = 'Exhale'; phase = 'inhale'; }
        }
        cycle();
        breathInterval = setInterval(cycle, 4000);
    });

    // Counter animation
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const el = e.target;
                const target = +el.dataset.target;
                const start = performance.now();
                function update(now) {
                    const p = Math.min((now - start) / 2000, 1);
                    el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
                    if (p < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

    // Newsletter
    document.getElementById('newsletterForm').addEventListener('submit', e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'var(--accent-sage)';
        setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
    });
});

import { useEffect } from 'react';

const SmoothScroll = () => {
    useEffect(() => {
        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;
        let isAnimating = false;

        const easing = 0.1; // Smoother easing (try 0.08–0.12 for a balance)
        const minDifference = 0.2; // Lower this for finer stopping

        const onWheel = (e) => {
            if (e.ctrlKey) {
                // Allow default zoom behavior (Ctrl + Scroll)
                return;
            }

            e.preventDefault();

            targetScroll += e.deltaY;
            targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));

            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        const smoothScroll = () => {
            currentScroll += (targetScroll - currentScroll) * easing;

            window.scrollTo(0, currentScroll);

            if (Math.abs(targetScroll - currentScroll) > minDifference) {
                requestAnimationFrame(smoothScroll);
            } else {
                currentScroll = targetScroll; // Snap to target
                isAnimating = false;
            }
        };

        window.addEventListener('wheel', onWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', onWheel);
        };
    }, []);

    return null;
};

export default SmoothScroll;

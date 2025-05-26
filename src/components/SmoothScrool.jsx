import { useEffect } from 'react';

const SmoothScroll = () => {
    useEffect(() => {
        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;
        let isAnimating = false;

        const onWheel = (e) => {
            e.preventDefault();
            targetScroll += e.deltaY;
            targetScroll = Math.max(0, targetScroll); // Prevent scrolling above the page
            targetScroll = Math.min(document.body.scrollHeight - window.innerHeight, targetScroll); // Prevent scrolling below the page

            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(smoothScroll);
            }
        };

        const smoothScroll = () => {
            currentScroll += (targetScroll - currentScroll) * .1; // Adjust easing factor here (0.05 - 0.15)
            window.scrollTo(0, currentScroll);

            if (Math.abs(targetScroll - currentScroll) > 0.5) {
                requestAnimationFrame(smoothScroll);
            } else {
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

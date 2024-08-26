import React, { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const showDuration = 0; // No initial delay
    const fadeDuration = 500;

    // Function to handle the fade-out transition
    const handleFadeOut = () => {
      if (preloader) {
        preloader.style.transition = `opacity ${fadeDuration}ms ease`;
        preloader.style.opacity = '0';

        setTimeout(() => {
          preloader.style.display = 'none';
        }, fadeDuration);
      }
    };

    // Show preloader initially
    setTimeout(handleFadeOut, showDuration);

    // Cleanup timeout on unmount
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <div className="preloader" id="preloader">
      {/* You can add some loading spinner or animation here */}
    </div>
  );
}

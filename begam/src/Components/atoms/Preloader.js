import React, { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const showDuration = 300;
    const fadeDuration = 500;

    setTimeout(() => {
      if (preloader) {
        preloader.style.transition = `opacity ${fadeDuration}ms ease`;
        preloader.style.opacity = '0';

        setTimeout(() => {
          preloader.style.display = 'none';
        }, fadeDuration);
      }
    }, showDuration);
  }, []);

  return (
    <div className="preloader" id="preloader"></div>
  );
}

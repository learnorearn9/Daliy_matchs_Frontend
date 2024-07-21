import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';

export default function ScrollToTop(props) {
    const {Path} = props;
  const scrollToTopRef = useRef(null);
  const headerSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTopElement = scrollToTopRef.current;
      const headerSectionElement = headerSectionRef.current;

      if (window.scrollY < 500) {
        scrollTopElement.classList.remove('active');
      } else {
        scrollTopElement.classList.add('active');
      }

      if (window.scrollY > 50) {
        headerSectionElement.classList.add('animated', 'fadeInDown', 'header-fixed');
      } else {
        headerSectionElement.classList.remove('animated', 'fadeInDown', 'header-fixed');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header id="header-section" ref={headerSectionRef}>
        {/* Your header content */}
      </header>
      <Link to={Path} className="scrollToTop" ref={scrollToTopRef} onClick={handleClick}>
      <FontAwesomeIcon icon={faAngleDoubleUp} />
      </Link>
    </>
  );
}

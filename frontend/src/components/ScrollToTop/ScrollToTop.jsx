import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      {isVisible && (
        <div onClick={scrollToTop} style={styles.scrollButton}>
          <FaArrowCircleUp size={40} color="ff5b06" />
        </div>
      )}
    </div>
  );
};

const styles = {
  scrollButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    cursor: 'pointer'
  }
};

export default ScrollToTop;

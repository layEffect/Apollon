const checkWindowSize = (setIsMobile) => {
  const mobileMaxPortrait = 767;
  const mobileMaxLandscape = 1320;
  const min = Math.min(window.innerWidth, window.innerHeight);
  const max = Math.max(window.innerWidth, window.innerHeight);
  setIsMobile(min <= mobileMaxPortrait && max <= mobileMaxLandscape);
};

export const setupWindowSizeListener = (setIsMobile) => {
  checkWindowSize(setIsMobile);
  const handleResize = () => {
    checkWindowSize(setIsMobile);
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
};

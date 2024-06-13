const calculateGradient = (currentTime: number, duration: number) => {
  const currentPercentage = (currentTime / duration) * 100 || 0;
  return `linear-gradient(to right, var(--verySoftPeanut) ${currentPercentage}%, #f2f2f2 ${currentPercentage}%)`;
};

const secondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const updateHeightRightSide = () => {
  const columna1: HTMLElement = document.querySelector('#videoModule');
  const columna2: HTMLElement = document.querySelector('#rightSide > div > div:last-child');

  if (columna1 && columna2) {
    columna2.style.maxHeight = columna1.offsetHeight + 100 + 'px';
  }
};

export { calculateGradient, secondsToTime, updateHeightRightSide };

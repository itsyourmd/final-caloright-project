/*Homepage Carousel Start */
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel-container");
  const track = carousel.querySelector(".carousel-track");
  let slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".carousel-button.prev");
  const nextBtn = carousel.querySelector(".carousel-button.next");
  const indicators = carousel.querySelector(".carousel-indicators");

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  track.insertBefore(lastClone, slides[0]);
  track.appendChild(firstClone);

  slides = Array.from(track.children);
  let index = 1;
  let autoSlide;

  track.style.transform = `translateX(${-index * 100}%)`;

  function updateIndicators() {
    const dots = indicators.querySelectorAll(".carousel-dot");
    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === index - 1)
    );
  }

  function createIndicators() {
    for (let i = 0; i < slides.length - 2; i++) {
      const dot = document.createElement("span");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i + 1));
      indicators.appendChild(dot);
    }
  }

  function goToSlide(i) {
    index = i;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${-index * 100}%)`;
    updateIndicators();
  }

  function goToNextSlide() {
    if (index >= slides.length - 1) return;
    index++;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${-index * 100}%)`;
    updateIndicators();
  }

  function goToPrevSlide() {
    if (index <= 0) return;
    index--;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${-index * 100}%)`;
    updateIndicators();
  }

  track.addEventListener("transitionend", () => {
    if (index === 0) {
      track.style.transition = "none";
      index = slides.length - 2;
      track.style.transform = `translateX(${-index * 100}%)`;
    } else if (index === slides.length - 1) {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(${-index * 100}%)`;
    }
    updateIndicators();
  });

  function startAutoSlide() {
    autoSlide = setInterval(goToNextSlide, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  nextBtn.addEventListener("click", goToNextSlide);
  prevBtn.addEventListener("click", goToPrevSlide);
  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);

  createIndicators();
  startAutoSlide();
});




/* SWIPE FUNCTIONALITY */

const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  let currentIndex = 0;

  let startX = 0;
  let endX = 0;

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Swipe start
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  // Swipe end
  track.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; 

    if (startX - endX > threshold && currentIndex < slides.length - 1) {
      currentIndex++;
    } else if (endX - startX > threshold && currentIndex > 0) {
      currentIndex--;
    }

    updateCarousel();
  }

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
  
/*Homepage Carousel End */

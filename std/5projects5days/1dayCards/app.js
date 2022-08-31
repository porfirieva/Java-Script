function slidesPlugin(startSlide = 3) {
  const slides = document.querySelectorAll(".slide");

  slides[startSlide].classList.add('active')
  
  for (const slide of slides) {
    slide.addEventListener("click", () => {
      clearClassList();
      slide.classList.add("active");
    });
  }

  function clearClassList() {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
  }
}

slidesPlugin()
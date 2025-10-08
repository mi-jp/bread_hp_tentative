document.addEventListener("DOMContentLoaded", () => {
  // ▼ ナビゲーションメニューからのスクロール制御
  const menuLink = document.getElementById("menu-link");
  const menuSection = document.getElementById("menu");
  const headerImg = document.querySelector('.header-image');
  const mainContent = document.querySelector('main');
  const headerHeight = headerImg ? headerImg.clientHeight : 150;

  if (menuLink && menuSection) {
    menuLink.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionTop = menuSection.getBoundingClientRect().top + window.pageYOffset;
      const scrollTo = sectionTop - headerHeight - 70;
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    });
  }

  // ▼ メインテキストアニメーション
  const mainText = document.querySelector('.main-text');
  if (mainText) {
    setTimeout(() => mainText.classList.add('animate'), 100);
  }

  // ▼ スクロール表示制御（メニュー・アクセス）
  const menuSectionScroll = document.querySelector('.menu-section');
  const shopInfoSection = document.querySelector('.shop-info-section');

  function checkScroll() {
    const triggerPoint = window.innerHeight * 0.8;
    if (menuSectionScroll) {
      const menuTop = menuSectionScroll.getBoundingClientRect().top;
      menuSectionScroll.classList.toggle('show', menuTop < triggerPoint);
    }
    if (shopInfoSection) {
      const infoTop = shopInfoSection.getBoundingClientRect().top;
      shopInfoSection.classList.toggle('show', infoTop < triggerPoint);
    }
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll();

  // ▼ ヘッダーの高さ分 main に padding を調整
  function adjustMainPadding() {
    if (headerImg && mainContent) {
      mainContent.style.paddingTop = `${headerImg.clientHeight}px`;
    }
  }
  window.addEventListener('load', adjustMainPadding);
  window.addEventListener('resize', adjustMainPadding);

  // ▼ フッターロゴクリックでページトップに戻る
  const footerLogoLink = document.querySelector('.footer-logo-link');
  if (footerLogoLink) {
    footerLogoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ▼ フェード型カルーセル（未使用なら無視可）
  const carouselImages = document.querySelectorAll('.carousel-img');
  let fadeCurrentIndex = 0;
  if (carouselImages.length > 0) {
    setInterval(() => {
      carouselImages[fadeCurrentIndex].classList.remove('active');
      fadeCurrentIndex = (fadeCurrentIndex + 1) % carouselImages.length;
      carouselImages[fadeCurrentIndex].classList.add('active');
    }, 4000);
  }

  

const carouselSlides = document.querySelectorAll('.carousel-slide');
carouselSlides.forEach((slide, index) => {
  setTimeout(() => {
    slide.classList.add('animate');
  }, 200 * index);  // 0.2秒ずつずらして順にアニメーション
});



});


// メイン画像の自動横スライド
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");
  const dotsNav = document.querySelector(".carousel-dots");

  const slidesToShow = 3; // 常に3枚見える
  const slideCount = slides.length;
  const slideWidth = () => slides[0].getBoundingClientRect().width;

  // 1枚ずつスライドなので、インデックス範囲は [0, slideCount + clones]
  // クローンは前後に3枚ずつ作る（見た目を保つため）
  const prependSlides = slides.slice(-slidesToShow).map(slide => slide.cloneNode(true));
  const appendSlides = slides.slice(0, slidesToShow).map(slide => slide.cloneNode(true));

  prependSlides.forEach(clone => {
    track.insertBefore(clone, track.firstChild);
  });

  appendSlides.forEach(clone => {
    track.appendChild(clone);
  });

  const allSlides = Array.from(track.children);

  let currentIndex = slidesToShow; // 実画像の最初のスライド位置
  let isTransitioning = false;

  function setInitialPosition() {
    const offset = slideWidth() * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
  }
  setInitialPosition();

  // ドットはスライド数分（実画像の枚数）
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dotsNav.appendChild(dot);
  }
  const dots = Array.from(dotsNav.children);

  function updateCarousel(index, withTransition = true) {
    const offset = slideWidth() * index;
    if (withTransition) {
      track.style.transition = "transform 0.5s ease";
    } else {
      track.style.transition = "none";
    }
    track.style.transform = `translateX(-${offset}px)`;
    updateDots((index - slidesToShow + slideCount) % slideCount);
  }

  function updateDots(activeIndex) {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[activeIndex].classList.add("active");
  }

  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    if (currentIndex >= slideCount + slidesToShow) {
      currentIndex = slidesToShow;
      updateCarousel(currentIndex, false);
    }
    if (currentIndex < slidesToShow) {
      currentIndex = slideCount + slidesToShow - 1;
      updateCarousel(currentIndex, false);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel(currentIndex);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = slidesToShow + index;
      updateCarousel(currentIndex);
    });
  });

  // --- 自動スライド（1枚ずつ）
  let autoSlide = setInterval(() => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel(currentIndex);
  }, 5000); // 5秒毎

  // --- マウスオーバーで自動スライド停止、離れたら再開（おまけ）
  track.parentElement.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
  });
  track.parentElement.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex++;
      updateCarousel(currentIndex);
    }, 3000);
  });

  // --- リサイズ対応
  window.addEventListener("resize", () => {
    updateCarousel(currentIndex, false);
  });
});

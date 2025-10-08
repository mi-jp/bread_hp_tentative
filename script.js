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

  let slidesToShow = 3;
  let currentIndex = 0;
  let isTransitioning = false;
  let allSlides = [];

  function getSlidesToShow() {
    if (window.innerWidth <= 768) return 1;
    return 3;
  }

  function clearClones() {
    // 元のスライド以外（クローン）を削除
    Array.from(track.children).forEach(child => {
      if (!slides.includes(child)) {
        track.removeChild(child);
      }
    });
  }

  function setupClones() {
    clearClones();

    slidesToShow = getSlidesToShow();

    const prependSlides = slides.slice(-slidesToShow).map(slide => slide.cloneNode(true));
    const appendSlides = slides.slice(0, slidesToShow).map(slide => slide.cloneNode(true));

    prependSlides.forEach(clone => {
      track.insertBefore(clone, track.firstChild);
    });
    appendSlides.forEach(clone => {
      track.appendChild(clone);
    });

    allSlides = Array.from(track.children);

    currentIndex = slidesToShow; // リセット
  }

  function slideWidth() {
    return slides[0].getBoundingClientRect().width;
  }

  function setInitialPosition() {
    const offset = slideWidth() * currentIndex;
    track.style.transition = "none";
    track.style.transform = `translateX(-${offset}px)`;
  }

  function updateDots(activeIndex) {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[activeIndex].classList.add("active");
  }

  function updateCarousel(index, withTransition = true) {
    const offset = slideWidth() * index;
    if (withTransition) {
      track.style.transition = "transform 0.5s ease";
    } else {
      track.style.transition = "none";
    }
    track.style.transform = `translateX(-${offset}px)`;
    updateDots((index - slidesToShow + slides.length) % slides.length);
  }

  function createDots() {
    dotsNav.innerHTML = "";
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("active");
      dotsNav.appendChild(dot);
    }
  }

  // 初期セットアップ
  function initCarousel() {
    setupClones();
    createDots();
    setInitialPosition();
  }

  initCarousel();

  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    if (currentIndex >= slides.length + slidesToShow) {
      currentIndex = slidesToShow;
      updateCarousel(currentIndex, false);
    }
    if (currentIndex < slidesToShow) {
      currentIndex = slides.length + slidesToShow - 1;
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

  dotsNav.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    const index = Array.from(dotsNav.children).indexOf(e.target);
    currentIndex = slidesToShow + index;
    updateCarousel(currentIndex);
  });

  let autoSlide = setInterval(() => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel(currentIndex);
  }, 5000);

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

  window.addEventListener("resize", () => {
    // クローン再セットアップ、位置リセット
    const prevSlidesToShow = slidesToShow;
    const newSlidesToShow = getSlidesToShow();
    if (prevSlidesToShow !== newSlidesToShow) {
      setupClones();
      createDots();
      setInitialPosition();
    } else {
      // 表示枚数が変わってなければ位置だけ更新
      updateCarousel(currentIndex, false);
    }
  });
});

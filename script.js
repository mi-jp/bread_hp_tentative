document.addEventListener("DOMContentLoaded", () => {
  // スクロールでmenuに移動
  const headerHeight = 150;
  const menuLink = document.getElementById("menu-link");
  const menuSection = document.getElementById("menu");

  if (menuLink && menuSection) {
    menuLink.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionTop = menuSection.getBoundingClientRect().top + window.pageYOffset;
      const scrollTo = sectionTop - headerHeight + -70;

      window.scrollTo({
        top: scrollTo,
        behavior: "smooth"
      });
    });
  }

  // main-textを先に表示
  const mainText = document.querySelector('.main-text');
  if (mainText) {
    setTimeout(() => {
      mainText.classList.add('animate');
    }, 100);
  }

  // main-imgを後から表示
  const mainImg = document.querySelector('.main-img');
  if (mainImg) {
    setTimeout(() => {
      mainImg.classList.add('animate');
    }, 300);
  }

  // menu-section のスクロール表示
  const menuSectionScroll = document.querySelector('.menu-section');

  const shopInfoSection = document.querySelector('.shop-info-section');

  
  function checkScroll() {
    const triggerPoint = window.innerHeight * 0.8;
    const menuTop = menuSectionScroll.getBoundingClientRect().top;

    if (menuTop < triggerPoint) {
      menuSectionScroll.classList.add('show');
    } else {
      menuSectionScroll.classList.remove('show');
    }

if (shopInfoSection) {
  const infoTop = shopInfoSection.getBoundingClientRect().top;
  if (infoTop < triggerPoint) {
    shopInfoSection.classList.add('show');
  } else {
    shopInfoSection.classList.remove('show');
  }
}




  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();

  const headerImg = document.querySelector('.header-image');
  const mainContent = document.querySelector('main');

  function adjustMainPadding() {
    if (headerImg && mainContent) {
      const headerHeight = headerImg.clientHeight;
      mainContent.style.paddingTop = `${headerHeight}px`;
    }
  }

  // 初回読み込み時とリサイズ時に実行
  window.addEventListener('load', adjustMainPadding);
  window.addEventListener('resize', adjustMainPadding);



  const footerLogoLink = document.querySelector('.footer-logo-link');
if (footerLogoLink) {
  footerLogoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  
}
});

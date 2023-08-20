// Animate text tags (h1, h2, h3, p)

const unseen_h1 = document.querySelectorAll("h1.unseen");
const unseen_h2 = document.querySelectorAll("h2.unseen");
const unseen_h3 = document.querySelectorAll("h3.unseen");
const unseen_p = document.querySelectorAll("p.unseen");

const isHElInViewport = (el) => {
  const rectProover = el.getBoundingClientRect();
  return (
    rectProover.top >= 0 &&
    rectProover.left >= 0 &&
    rectProover.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rectProover.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const animetedTagEl = (array) => {
  array.forEach((el) => {
    if (isHElInViewport(el)) {
      el.classList.remove("unseen");
    }
  });
};

const animateAllTags = () => {
  const animateIfVisible = () => {
    animetedTagEl(unseen_h1);
    animetedTagEl(unseen_h2);
    animetedTagEl(unseen_h3);
    animetedTagEl(unseen_p);
  };

  animateIfVisible();

  window.addEventListener("scroll", animateIfVisible);
};

animateAllTags();

// Burger menu

const navBurgerMenuButton = document.querySelector("#burgerMenu");

const onClickBurgerMenu = () => {
  navBurgerMenuButton.hasAttribute("opened")
    ? navBurgerMenuButton.removeAttribute("opened")
    : navBurgerMenuButton.setAttribute("opened", "");
};

navBurgerMenuButton.addEventListener("click", onClickBurgerMenu);

const onResizeButtonCheck = () => {
  if (navBurgerMenuButton.hasAttribute("opened") && window.innerWidth >= 600) {
    navBurgerMenuButton.removeAttribute("opened");
  }
};

onResizeButtonCheck();
window.addEventListener("resize", onResizeButtonCheck);

// SearchBar animation

const navSearchImg = document.querySelector("#searchImg");
const navSearch = document.querySelector("#search");
let handleState = {
  mouseout: false,
  focusout: "notEff",
};

navSearchImg.addEventListener("mouseover", () => {
  navSearch.setAttribute("hovered", "open");
  handleState.mouseout = false;
});

navSearch.addEventListener("focus", () => {
  handleState.focusout = "focusOver";
});

const onProveCloseSearchbar = () => {
  navSearch.setAttribute("hovered", "closing");
  navSearch.addEventListener(
    "animationend",
    () => {
      navSearch.removeAttribute("hovered");
      navSearch.value = "";
    },
    { once: true }
  );

  handleState.mouseout = false;
  handleState.focusout = "notEff";
};

navSearch.addEventListener("mouseout", () => {
  handleState.mouseout = true;
  if (handleState.mouseout && (handleState.focusout === "notEff" || handleState.focusout === "focusOut")) {
    onProveCloseSearchbar();
  } else if (handleState.mouseout && !handleState.focusout) {
    return;
  }
});

navSearch.addEventListener("focusout", () => {
  handleState.focusout = "focusOut";
  onProveCloseSearchbar();
});

// Slider on hero block

const heroBlock_firstIMG = document.querySelector(".heroBlock--IMGCont--first");
const heroBlock_secodnIMG = document.querySelector(".heroBlock--IMGCont--second");
const heroBlock_ImageSlides = [
  "./data/img/002-heroBlock/backgroun-photo_1.png",
  "./data/img/002-heroBlock/backgroun-photo_2.png",
  "./data/img/002-heroBlock/backgroun-photo_3.png",
  "./data/img/002-heroBlock/backgroun-photo_4.png",
];
let heroBlock_slideProver = {
  first: 0,
  second: 1,
};

const slideIMGchange_first = () => {
  heroBlock_slideProver.first === 0 ? (heroBlock_slideProver.first = 2) : (heroBlock_slideProver.first = 0);
  heroBlock_firstIMG.src = heroBlock_ImageSlides[heroBlock_slideProver.first];
};

const slideIMGchange_second = () => {
  heroBlock_slideProver.first === 1 ? (heroBlock_slideProver.first = 3) : (heroBlock_slideProver.first = 1);
  heroBlock_secodnIMG.src = heroBlock_ImageSlides[heroBlock_slideProver.second];
};

const onIntervalImgSlide = () => {
  if (heroBlock_firstIMG.classList.contains("slideSeen")) {
    heroBlock_firstIMG.classList.remove("slideSeen");
    setTimeout(slideIMGchange_first, 5000);
  } else {
    heroBlock_firstIMG.classList.add("slideSeen");
    setTimeout(slideIMGchange_second, 5000);
  }
};

setInterval(onIntervalImgSlide, 10000);

// Popup trigger

const realizationBlock_Gallery = document.querySelector(".realizationBlock--photoGallery");
const realizationBlock_PopupButton = document.querySelector("#popupButton");
const realizationBlock_PopupButtonText = document.querySelector("#popupButton span");
let isPopupOpened = false;

const onClickPopup = () => {
  isPopupOpened = !isPopupOpened;
  realizationBlock_Gallery.setAttribute("opened", isPopupOpened);
  isPopupOpened
    ? (realizationBlock_PopupButtonText.innerText = "Zwiń")
    : (realizationBlock_PopupButtonText.innerText = "Rozwiń");
};

realizationBlock_PopupButton.addEventListener("click", onClickPopup);

// Photo Gallery

const gallery_container = document.querySelector("#photoGallery");
const gallery_containerCloseButton = gallery_container.querySelector("#closeButton");
const gallery_containerImg = gallery_container.querySelector("img");
const gallery_containerNextButtonLeft = gallery_container.querySelector(".photoGallery__arrow--left");
const gallery_containerNextButtonRigth = gallery_container.querySelector(".photoGallery__arrow--rigth");
const realizationBlock_PhotoGallery = [
  ...document.querySelectorAll(".realizationBlock--photoGallery--Container div img"),
];
let photoNumber;

gallery_containerCloseButton.addEventListener("click", () => {
  gallery_container.setAttribute("closing", "");
  gallery_container.addEventListener(
    "animationend",
    () => {
      gallery_container.removeAttribute("closing");
      gallery_container.close();
    },
    { once: true }
  );
});

realizationBlock_PhotoGallery.forEach((el) => {
  el.addEventListener("click", (e) => {
    photoNumber = realizationBlock_PhotoGallery.indexOf(e.target) + 1;
    gallery_containerImg.src = e.target.src;
    gallery_container.showModal();
    console.log(photoNumber);
  });
});

const onClickLeftButton = () => {
  if (photoNumber === 1) {
    photoNumber = realizationBlock_PhotoGallery.length;
    gallery_containerImg.src = `./data/img/005-realizationBlock/gallery${photoNumber}.png`;
  } else {
    photoNumber--;
    gallery_containerImg.src = `./data/img/005-realizationBlock/gallery${photoNumber}.png`;
  }
};

const onClickRigthButton = () => {
  if (photoNumber === realizationBlock_PhotoGallery.length) {
    photoNumber = 1;
    gallery_containerImg.src = `./data/img/005-realizationBlock/gallery${photoNumber}.png`;
  } else {
    photoNumber++;
    gallery_containerImg.src = `./data/img/005-realizationBlock/gallery${photoNumber}.png`;
  }
};

gallery_containerNextButtonLeft.addEventListener("click", onClickLeftButton);
gallery_containerNextButtonRigth.addEventListener("click", onClickRigthButton);

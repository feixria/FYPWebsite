"use strict";

const header = document.querySelector(".header");
const headerTitle = document.querySelector(".header-title");
const headerDescription = document.querySelector(".header-description");
const allLinks = document.querySelectorAll("a:link");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector(".nav");
const btnHero = document.querySelector(".btn-hero");
const sectionAll = document.querySelectorAll(".section");

////////////////////////////////////
// ? FUNCTION DEFINITION //
////////////////////////////////////
// Scroll to section function
function scrollToSection(id) {
  const desiredSection = document.querySelector(id);
  desiredSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

function btnHeroHandler(e) {
  e.preventDefault();
  scrollToSection(this.getAttribute("href"));
}

function handleHover(e) {
  if (e.target.classList.contains("nav__link")) {
    const clicked = e.target;
    const siblings = clicked
      .closest(".nav-links")
      .querySelectorAll(".nav__link");
    const logo = clicked.closest(".nav").querySelector(".logo");
    siblings.forEach((el) => {
      if (clicked !== el) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

// what we are doing here is to promisify object that are synchronous so that we can use
// it with promise then catch and finally
// it takes in two parameters resolve and reject
// reject is when u want to handle errors
// for a timeout of this degree it will never fail. When it succeeds, we resolve it by passing the argument forward to be
// handle by the then method
const wait = function (seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(seconds);
    }, seconds * 1000);
  });
};

////////////////////////////////////
// ? SMOOTH SCROLLING FUNCTIONALITY //
////////////////////////////////////
// Finding all the links with the # and attaching an event listener to them
// Scrolls to top page
allLinks.forEach(function (link) {
  if (link.getAttribute("href") === "#") {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

// incorporating the usage of the bubbling event to scroll to desired section using the newest scrollIntoView
navLinks.addEventListener("click", function (e) {
  if (e.target.getAttribute("href").startsWith("#section")) {
    e.preventDefault();
    scrollToSection(e.target.getAttribute("href"));
  }
});

btnHero.addEventListener("click", btnHeroHandler);

/////////////////////////////////////////////
// ? BUBBLING OPACITY NAV BAR FUNCTIONALITY //
/////////////////////////////////////////////
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

/////////////////////////////////////////////
// ? HERO SECTION ANIMATION FUNCTIONALITY //
/////////////////////////////////////////////
const optionsHero = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const observerHero = new IntersectionObserver(function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    headerTitle.classList.remove("header-title-hidden");
    wait(0.3)
      .then((sec) => {
        headerDescription.classList.remove("header-content-hidden");
        return wait(0.3);
      })
      .then((sec) => {
        btnHero.classList.remove("header-content-hidden");
      });
    observer.unobserve(entry.target);
  }
}, optionsHero);

observerHero.observe(header);

/////////////////////////////////////////////
// ? SECTION ANIMATION FUNCTIONALITY //
/////////////////////////////////////////////
const sectionOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observerSection = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("section-hidden");

      observer.unobserve(entry.target);
    }
  });
}, sectionOptions);

sectionAll.forEach((sect) => {
  sect.classList.add("section-hidden");
  observerSection.observe(sect);
});

'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { navbar.classList.remove("active"); }

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


// auto image slider

let onSlide = false;

window.addEventListener("load", () => {
   autoSlide();

   const dots = document.querySelectorAll(".carousel_dot");
   for (let i = 0; i < dots.length; i++) {
      dots[i].addEventListener("click", () => slide(i));
   }

   const buttonPrev = document.querySelector(".carousel_button__prev");
   const buttonNext = document.querySelector(".carousel_button__next");
   buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
   buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
})

function autoSlide() {
   setInterval(() => {
      slide(getItemActiveIndex() + 1);
   }, 7000); // slide speed = 3s
}

function slide(toIndex) {
   if (onSlide)
      return;
   onSlide = true;

   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   let newItemActive = null;

   if (toIndex > itemActiveIndex) {
      // check if toIndex exceeds the number of carousel items
      if (toIndex >= itemsArray.length) {
         toIndex = 0;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_next");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__next");
         itemActive.classList.add("carousel_item__next");
      }, 20);
   } else {
      // check if toIndex exceeds the number of carousel items
      if (toIndex < 0) {
         toIndex = itemsArray.length - 1;
      }

      newItemActive = itemsArray[toIndex];

      // start transition
      newItemActive.classList.add("carousel_item__pos_prev");
      setTimeout(() => {
         newItemActive.classList.add("carousel_item__prev");
         itemActive.classList.add("carousel_item__prev");
      }, 20);
   }

   // remove all transition class and switch active class
   newItemActive.addEventListener("transitionend", () => {
      itemActive.className = "carousel_item";
      newItemActive.className = "carousel_item carousel_item__active";
      onSlide = false;
   }, {
      once: true
   });

   slideIndicator(toIndex);
}

function getItemActiveIndex() {
   const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
   const itemActive = document.querySelector(".carousel_item__active");
   const itemActiveIndex = itemsArray.indexOf(itemActive);
   return itemActiveIndex;
}

function slideIndicator(toIndex) {
   const dots = document.querySelectorAll(".carousel_dot");
   const dotActive = document.querySelector(".carousel_dot__active");
   const newDotActive = dots[toIndex];

   dotActive.classList.remove("carousel_dot__active");
   newDotActive.classList.add("carousel_dot__active");
}







// ABOUT SLIDER
const sliderImages = document.querySelectorAll('.slider1 img');
let currentImageIndex = 0;

function showNextImage() {
    sliderImages[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    sliderImages[currentImageIndex].classList.add('active');
}

setInterval(showNextImage, 5000); // Change image every 5 seconds



/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion;

const accordionInit = function (currentAccordion) {

  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  accordionBtn.addEventListener("click", function () {

    if (currentAccordion.classList.contains("active")) {
      currentAccordion.classList.toggle("active");
    } else {
      if (lastActiveAccordion) lastActiveAccordion.classList.remove("active");
      currentAccordion.classList.add("active");
    }

    lastActiveAccordion = currentAccordion;

  });

}

for (let i = 0, len = accordions.length; i < len; i++) { accordionInit(accordions[i]); }











// EXPLORE BUTTON 

const RANDOM = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const PARTICLES = document.querySelectorAll('.star')
PARTICLES.forEach(P => {
  P.setAttribute('style', `
    --angle: ${RANDOM(0, 360)};
    --duration: ${RANDOM(6, 20)};
    --delay: ${RANDOM(1, 10)};
    --alpha: ${RANDOM(40, 90) / 100};
    --size: ${RANDOM(2, 6)};
    --distance: ${RANDOM(40, 200)};
  `)
})




/**
 * Custom cursor
 */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [...document.querySelectorAll("button"), ...document.querySelectorAll("a")];

window.addEventListener("mousemove", function (event) {

  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);

});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});


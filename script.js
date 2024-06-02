'use strict';

const section = document.querySelectorAll('.section');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navbar = document.querySelector('.nav');
const navs = document.querySelectorAll('.nav__link');
const section1 = document.querySelector('#section--1');
const opsbtn = document.querySelectorAll('.operations__tab');
const opscontent = document.querySelectorAll('.operations__content');

section.forEach(function (el) {
  el.classList.remove('section--hidden');
});

//Scroll via the link to section 1:
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  section[0].scrollIntoView({ behavior: 'smooth' });
});

//Navbar Mouse Over Function
const mouseover = function (element) {
  element.addEventListener('mouseover', function (e) {
    e.preventDefault;
    navs.forEach(el => {
      if (e.target !== el) el.style.opacity = '0.5';
    });
  });
};
//Navbar Mouse Out Function
const mouseout = function (element) {
  element.addEventListener('mouseout', function (e) {
    e.preventDefault;
    navs.forEach(el => {
      if (e.target !== el) el.style.opacity = '1';
    });
  });
};

//Navbar Fadeout functionality
navs.forEach(function (el) {
  mouseover(el);
  mouseout(el);
});

//Sticky nav functionality
const navbarobserver = function (entries) {
  entries.forEach(entry => {
    console.log(entry);
    if (entry.isIntersecting) {
      navbar.classList.add('sticky');
      console.log(entry.boundingClientRect.top);
    }
    if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) {
      navbar.classList.remove('sticky');
    }
  });
};

const observer = new IntersectionObserver(navbarobserver, {
  root: null,
  rootMargin: '90px',
  threshold: 0.35,
});

observer.observe(section1);

//Lazy image loading
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//Operations

console.log(opscontent);

opsbtn.forEach(function (el) {
  el.addEventListener('click', function (e) {
    opsbtn.forEach(function (el) {
      el.classList.remove('operations__tab--active');
    });
    opscontent.forEach(function (el) {
      el.classList.remove('operations__content--active');
    });
    e.target.classList.add('operations__tab--active');
    document
      .querySelector(`.operations__content--${e.target.dataset.tab}`)
      .classList.add('operations__content--active');
  });
});

//
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

slides.forEach(function (el, i) {
  el.style.transform = `translateX(${i * 100}%)`;
});

let btnRightCounter = 0;
let btnLeftCounter = 0;

btnRight.addEventListener('click', function (e) {
  if (btnRightCounter < 2) {
    btnRightCounter++;
  } else {
    btnRightCounter = 0;
  }
  slides.forEach(function (el, i) {
    el.style.transform = `translateX(${(i - btnRightCounter) * 100}%)`;
  });
});

btnLeft.addEventListener('click', function (e) {
  if (btnLeftCounter === 0) {
    btnLeftCounter = 2;
  } else {
    btnLeftCounter--;
  }
  slides.forEach(function (el, i) {
    el.style.transform = `translateX(${(i - btnLeftCounter) * 100}%)`;
  });
});

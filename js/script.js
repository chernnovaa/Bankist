'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Cookie message
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = `Cookie message. <button class="btn btn--close-cookie">Got it !</button>`;
// header.append(message);

// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//   message.parentElement.removeChild(message);
// });

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

///////////////////////////////////////
// Smooth scrolling
const btnScroolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScroolTo.addEventListener('click', function (e) {
  const s1coordinate = section1.getBoundingClientRect();
  console.log(s1coordinate);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scrool (X/Y)', window.scrollX, window.scrollY);
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo({
  //   left: s1coordinate.left + window.scrollX,
  //   top: s1coordinate.top + window.scrollY,
  //   behavior: 'smooth',
  // }); - (old school calculation)

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Navigation effect (Event Propagation)
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event Delegation: Implementing Page Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Menu fade animations
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  //console.log(this, e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5); //(const handleHover = function (e, opacity) ), .style.opacity = 0.5;
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1); //(const handleHover = function (e, opacity) ), .style.opacity = 1;
// });

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// //console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   //console.log(this.window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
//The Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  //console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////////////
// Tabbet component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const cliked = e.target.closest('.operations__tab');
  console.log(cliked);

  if (!cliked) return;

  //remove tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //active tab
  cliked.classList.add('operations__tab--active');

  //active content area
  document
    .querySelector(`.operations__content--${cliked.dataset.tab}`)
    .classList.add('operations__content--active');
});

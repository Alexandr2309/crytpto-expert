import autoRun from './order.js';
import auto, {modalContentHTML} from './modal.js';

const footerAnchor = document.querySelector(".anchor");

window.addEventListener("DOMContentLoaded", (e) => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="loader__wrapper">
<div class="lds-roller">
    <div></div>
    <div></div> 
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
</div>
`
  );
  window.loaderElement = document.querySelector('.loader__wrapper');
});

footerAnchor.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function activeLinkSet(pathname) {
  [...document.querySelectorAll('.nav__link')].forEach(
    link => link.classList.remove('nav__link--active')
  );

  let name;
  if(pathname.includes('index.html')) name = 'main';
  else if(pathname.includes('Form.html')) name = 'form';
  else if(pathname.includes('Services.html')) name = 'services';
  else if(pathname.includes('About.html')) name = 'about';

  document.querySelector(`[data-name="${name}"]`)
    .classList.add('nav__link--active');
}

activeLinkSet(window.location.pathname);

const header = document.querySelector("header");
document.documentElement.style.setProperty(
  "--header-height",
  `${header.clientHeight}px`
);

const burger = header.querySelector(".header__burger");
const nav = header.querySelector(".nav");
burger.addEventListener("click", () => {
  nav.classList.toggle("header__nav--show");
  burger.classList.toggle("header__burger--white");
});

/*ОБРАБОТКА ДЕЙСТВИЙ В ФОРМЕ*/



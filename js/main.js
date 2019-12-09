const burgerMenu = document.querySelector('.header__burger-menu');
const burgerMenuComputed = getComputedStyle(burgerMenu);
const fnav = document.querySelector('.fullscreen-nav');
const fnavCloseBtn = document.querySelector('.fullscreen-nav__close-btn');

burgerMenu.addEventListener('click', () => {
    fnav.style.display = 'block';
});

fnavCloseBtn.addEventListener('click', () => {
    fnav.style.display = 'none';
});

const burgerMenu = document.querySelector('.header__burger-menu');
const burgerMenuComputed = getComputedStyle(burgerMenu);
const fnav = document.querySelector('.fullscreen-nav');
const fnavCloseBtn = document.querySelector('.fullscreen-nav__close-btn');
function noScroll() {
    window.scrollTo(0, 0);
}

burgerMenu.addEventListener('click', () => {
    fnav.style.display = 'block';
    window.addEventListener('scroll', noScroll);
});

fnavCloseBtn.addEventListener('click', () => {
    fnav.style.display = 'none';
    window.removeEventListener('scroll', noScroll);
});

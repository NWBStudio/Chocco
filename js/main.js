const burgerMenu = document.querySelector('.header__burger-menu');
const burgerMenuComputed = getComputedStyle(burgerMenu);
const fnav = document.querySelector('.fullscreen-nav');

burgerMenu.addEventListener('click', () => {
    fnav.style.display = 'block';
});

// if (burgerMenuComputed.display == 'none') {
//     fnav.style.display = 'none';
// }
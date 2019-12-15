/////////////////////// полноэкранное меню

const burgerMenu = document.querySelector('.header__burger-menu');
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


////////////////////// секция меню аккордеон

const   menu = document.querySelector('.menu'),
        collapsible = document.querySelectorAll('.accordeon-menu__item-collapsible'),
        collapsibleLength = collapsible.length,
        collapsibleInfo = document.querySelectorAll('.accordeon-menu__info'),
        menuCloseBtn = document.querySelectorAll('.accordeon-menu__close-btn');

menu.addEventListener('click', (e) => {
    for (let i = 0; i < collapsibleLength; i++) {
        collapsible[i].classList.remove('accordeon-menu__item-collapsible--active');
        
    }
});        

for (let i = 0; i < collapsibleLength; i++) {
    collapsible[i].addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        menuCloseBtn.forEach(element => { //реализация закрытия через крестик
            element.addEventListener('click', (e) => {
                collapsible[i].classList.remove('accordeon-menu__item-collapsible--active');
                for (let i = 0; i < collapsibleLength; i++) {
                    collapsible[i].style.display = 'flex';
                }
            });
        });

        if (collapsible[i].classList.contains('accordeon-menu__item-collapsible--active')){
            collapsible[i].classList.remove('accordeon-menu__item-collapsible--active');
            
        } else {
            for (let i = 0; i < collapsibleLength; i++) {
                if (collapsible[i].classList.contains('accordeon-menu__item-collapsible--active')){
                    collapsible[i].classList.remove('accordeon-menu__item-collapsible--active');
                }
            }
            collapsible[i].classList.add('accordeon-menu__item-collapsible--active');
            if (window.matchMedia("(max-width: 480px)").matches) {
                for (let i = 0; i < collapsibleLength; i++) {
                    collapsible[i].style.display = 'none';
                }
                collapsible[i].style.display = 'flex';
            }
        }
    });
    
}
collapsibleInfo.forEach(element => { //поскольку в нашем макете есть крестик, решил реализовать сворачивание через нажатие на него, а не на текстовую зону
    element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
}); 
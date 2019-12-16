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

/////////////////////// слайдер 

const   left = document.querySelectorAll(".slider__arrow--pos--left"),
        right = document.querySelectorAll(".slider__arrow--pos--right"),
        sliderList = document.querySelector(".slider__list"),
        sliderItem = document.querySelectorAll(".slider__item"),
        sliderItemLength = sliderItem.length,
        sliderAnimDur = 800;

   

    right.forEach(element => {
        element.addEventListener("click", function(e) {
            loop("right", e);
        });
    });

    left.forEach(element => {
        element.addEventListener("click", function(e) {
            loop("left", e);
        });
    });

    function loop(direction, e) {
        e.preventDefault();
        if (direction === "right") {
            sliderList.appendChild(sliderList.firstElementChild);
            sliderItem.forEach(element => {
                element.style.animationName = "slideRight";
                element.style.animationDuration = sliderAnimDur/1000 +'s';
                setTimeout(() => {
                    element.style.animationName = "none"; 
                }, sliderAnimDur);
                                     
            });

        } else {
            sliderList.insertBefore(sliderList.lastElementChild, sliderList.firstElementChild);
            sliderItem.forEach(element => {
                element.style.animationName = "slideLeft";
                element.style.animationDuration = sliderAnimDur/1000 +'s';
                setTimeout(() => {
                    element.style.animationName = "none"; 
                }, sliderAnimDur);                
            });
        }
    }

////////////////////// секция команда аккордеон

const   teamCb = document.querySelectorAll('.accordeon__collapsible'),
        teamCbLength = teamCb.length,
        teamInfo = document.querySelectorAll('.accordeon__info');

for (let i = 0; i < teamCbLength; i++) {
    teamCb[i].addEventListener('click', (e) => {
        e.preventDefault;

        if(teamCb[i].classList.contains('accordeon__collapsible--active')) 
            teamCb[i].classList.remove('accordeon__collapsible--active');
        else 
            teamCb[i].classList.add('accordeon__collapsible--active');    
    });
}

teamInfo.forEach(element => {
    element.addEventListener ('click', (e) => {
        e.stopPropagation();
    });
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

////////////////////// слайдшоу отзывов

const   reviewSnippet = document.querySelectorAll('.review-snippet'),
        reviewSnippetLength = reviewSnippet.length,
        snippetActive = document.querySelectorAll('.review-snippet--active'),
        reviewSwitcher = document.querySelectorAll('.reviews__switcher-item'),
        reviewSwitcherLegth = reviewSwitcher.length,
        reviewAnimDur = 800;

let     switchPrev = 0,
        switchCurr;

for (let i = 0; i < reviewSwitcherLegth; i++) {
    reviewSwitcher[i].addEventListener('click', (e) => {
        switchCurr = i;
        for (let i = 0; i < reviewSwitcherLegth; i++) {
            if (reviewSwitcher[i].classList.contains('reviews__switcher-item--selected')) {
                reviewSwitcher[i].classList.remove('reviews__switcher-item--selected');
                reviewSnippet[i].classList.remove('review-snippet--active');
            }
        }
        reviewSwitcher[i].classList.add('reviews__switcher-item--selected');
        reviewSnippet[i].classList.add('review-snippet--active');
        if(switchCurr < switchPrev) {
            reviewSnippet.forEach(element => {
                element.style.animationName = "slideLeft";
                element.style.animationDuration = reviewAnimDur/1000 +'s';
                setTimeout(() => {
                    element.style.animationName = "none"; 
                }, reviewAnimDur);                
            });
        }
        else if (switchCurr > switchPrev) {
            reviewSnippet.forEach(element => {
                element.style.animationName = "slideRight";
                element.style.animationDuration = reviewAnimDur/1000 +'s';
                setTimeout(() => {
                    element.style.animationName = "none"; 
                }, reviewAnimDur);                
            });
        }
        switchPrev = switchCurr;
    });
}

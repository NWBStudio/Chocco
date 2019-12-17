
function stopScroll() {
    document.body.style.overflow = "hidden";
}


function startScroll() {
    document.body.style.overflow = "initial";
}


/////////////////////// полноэкранное меню

const burgerMenu = document.querySelector('.header__burger-menu');
const fnav = document.querySelector('.fullscreen-nav');
const fnavCloseBtn = document.querySelector('.fullscreen-nav__close-btn');

burgerMenu.addEventListener('click', () => {
    fnav.style.display = 'block';
    stopScroll();
});

fnavCloseBtn.addEventListener('click', () => {
    fnav.style.display = 'none';
    startScroll();
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
            for (let i = 0; i < collapsibleLength; i++) {
                collapsible[i].style.display = 'flex';
            }
            
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
collapsibleInfo.forEach(element => { //поскольку в нашем макете есть крестик, решил реализовать сворачивание через нажатие на него, а не на контентную зону
    element.addEventListener('click', (e) => {
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


////////////////////// работа формы в секции заказа

const   orderForm = document.querySelector('.form'),
        orderSubmit = document.querySelector('.form__submit'),
        orderOverlay = document.querySelector('.order__overlay'),
        orderModalMessage = document.querySelector('.order__modal-message')
        orderEmail = "example@mail.com";

orderSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm(orderForm)) {
        let formData = new FormData();
        formData.append('name', orderForm.elements.name.value);
        formData.append('phone', orderForm.elements.tel.value);
        formData.append('comment', orderForm.elements.comment.value);
        formData.append('to', orderEmail);

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.addEventListener('load', () => {
            if(xhr.response.status === 1){
                orderModalMessage.textContent = 'Сообщение отправлено';
            }
            else {
                orderModalMessage.textContent = 'Ошибка отправки' ;
            }
            orderOverlay.style.display = 'block';
            stopScroll();
        });
    }
});

orderOverlay.addEventListener('click', e => {
    let target = e.target;
    if (target == orderOverlay || target.tagName == 'BUTTON'){
        orderOverlay.style.display = 'none';
        startScroll();
    }
});

document.addEventListener('keyup', e => {
    let key = e.key;
    if(key = 'Escape') {
        orderOverlay.style.display = 'none';
        startScroll();
    }
});

 
function validateForm(form) {
    let valid = true;
    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.tel)) {
        valid = false;
    }
    if (!validateField(form.elements.comment)) {
        valid = false;
    }
    return valid;
}        

function validateField(field) {
    field.placeholder = field.validationMessage;
    return field.checkValidity();
}
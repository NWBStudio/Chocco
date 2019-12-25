/////////////////////// OnePageScroll

const sections = $(".section");
const display = $(".maincontent");
let inscroll = false;

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();
const touchpadInertiaTime = 300;
const fixedMenuList = $(".fixed-menu");
const fnavLink = document.querySelector('.fullscreen-nav__link');


const countPositionPercent = sectionEq => {
  return `${sectionEq * -100}%`;
};

const switchActiveClass = (elems, elemNdx) => {
    const className = elems.eq(elemNdx).attr('class').split(' ')[0];
    elems
        .eq(elemNdx)
        .addClass(className + "--active")
        .siblings()
        .removeClass(className + "--active");
};

const unBlockScroll = () => {
  display.on('transitionend', () => {
    setTimeout(() => {
        inscroll = false;
      }, touchpadInertiaTime); // нельзя прокрутить до завершения анимации, плюс сглаживание инерции на тачпадах
  });
};

const performTransition = sectionEq => {
    if (inscroll) return;
    inscroll = true;
    let currentId = sections.eq(sectionEq).attr('id');  
    let menuColor = 'white';
    const position = countPositionPercent(sectionEq);
    const switchFixedMenuClass = () =>
      switchActiveClass($(".fixed-menu__item"), sectionEq);
    const switchFixedMenuColor = (color) => {
        let colorClassTemplate = 'fixed-menu--color';
        let fixedClassList = fixedMenuList.attr('class').split(' ');
        for (let i = 0; i < fixedClassList.length; i++) {
            if (fixedClassList[i].toLowerCase().includes(colorClassTemplate)){
                fixedMenuList.removeClass(fixedClassList[i]);
                fixedMenuList.addClass(colorClassTemplate + '--' + color);
            }
          }
    }         
    
    switchActiveClass(sections, sectionEq);
    switchFixedMenuClass();
    
    display.css({
      transform: `translateY(${position})`
    });
    unBlockScroll();

    switch (currentId) {
        case 'hero':
            menuColor = 'white';
            break;
        case 'why':
            menuColor = 'blue';
            break;
        case 'slider':
            menuColor = 'blue';
            break;
        case 'team':
            menuColor = 'blue';
            break;
        case 'menu':
            menuColor = 'white';
            break;
        case 'reviews':
            menuColor = 'blue';
            break;
        case 'order':
            menuColor = 'white';
            break;
        case 'contacts':
            menuColor = 'blue';
            break;                                                  
        default:
            menuColor = 'white';
            break;
    }

    switchFixedMenuColor(menuColor);
};  

const scrollViewport = direction => {
  const activeSection = sections.filter(".section--active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }

};

$(document).on({
  wheel: e => {
    const deltaY = e.originalEvent.deltaY;
    const direction = deltaY > 0 ? "next" : "prev";
    scrollViewport(direction);
  },
  keydown: e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === "input" || tagName === "textarea";

    if (userTypingInInputs) return;

    switch (e.keyCode) {
      case 40:
        scrollViewport("next");
        break;

      case 38:
        scrollViewport("prev");
        break;
    }
  }
});

$("[data-scroll-to]").on("click", e => {
    let currentTarget = e.currentTarget;
    e.preventDefault();
    fnav.style.display = 'none';
    inscroll = false;
    performTransition(parseInt($(currentTarget).attr("data-scroll-to")));
});

if (isMobile) {
    sections.css ({
        height: '100%'
    });
    window.addEventListener(
        "touchmove",
        e => {
        e.preventDefault();
        },
        { passive: false }
    );

    $("body").swipe({
        swipe: (event, direction) => {
        let scrollDirecrion;
        if (direction === "up") scrollDirecrion = "next";
        if (direction === "down") scrollDirecrion = "prev";
        scrollViewport(scrollDirecrion);
        }
    });
    } else {
        sections.css ({
            height: '100vh'
        });
    }

/////////////////////// полноэкранное меню

const burgerMenu = document.querySelector('.header__burger-menu');
const fnav = document.querySelector('.fullscreen-nav');
const fnavCloseBtn = document.querySelector('.fullscreen-nav__close-btn');

burgerMenu.addEventListener('click', () => {
    fnav.style.display = 'block';
    inscroll = true;
});

fnavCloseBtn.addEventListener('click', () => {
    fnav.style.display = 'none';
    inscroll = false;
});

/////////////////////// слайдер 

const   left = document.querySelectorAll(".slider__arrow--pos--left"),
        right = document.querySelectorAll(".slider__arrow--pos--right"),
        sliderList = document.querySelector(".slider__list"),
        sliderItem = document.querySelectorAll(".slider__item"),
        sliderItemLength = sliderItem.length,
        sliderAnimDur = 1000;

   

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
        reviewAnimDur = 1000;

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
        orderModalMessage = document.querySelector('.order__modal-message'),
        orderEmail = "example@mail.com";

orderForm.addEventListener('keydown', e => {
    let target = e.target;
    if (target == orderForm.elements.tel){
        let isDigit = false;
        let isSymbol = false;
        let isControl = false;
        
        e.stopPropagation();
        
        if (e.key >= 0 || e.key <= 9) {
            isDigit = true;
        }
        if (e.key == '-' || e.key == '+' || e.key == '/' ) {
            isSymbol = true;
        }
        if (e.key == 'Shift' || e.key == 'Backspace' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
            isControl = true;
        }

        if (isDigit == false && isSymbol == false && isControl == false) {
            e.preventDefault();
        }
    } else if (target == orderForm.elements.apartmentNum || target == orderForm.elements.floorNum){
        let isDigit = false;  
        let isControl = false; 
        
        e.stopPropagation();
        
        if (e.key >= 0 || e.key <= 0) {
            isDigit = true;
        }
        if (e.key == 'Shift' || e.key == 'Backspace' || e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
            isControl = true;
        }
        if (isDigit == false && isControl == false) {
            e.preventDefault();
        }
    }
});

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
            inscroll = true;
        });
    }
});

orderOverlay.addEventListener('click', e => {
    let target = e.target;
    if (target == orderOverlay || target.tagName == 'BUTTON'){
        orderOverlay.style.display = 'none';
        inscroll = false;
    }
});

document.addEventListener('keyup', e => {
    if(e.key == 'Escape') {
        orderOverlay.style.display = 'none';
        inscroll = false;
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

/////////////////////////Виджет карты

ymaps.ready(init);

var placemarks = [
    {
        latitude: 55.751947,
        longitude: 37.599337,
        hintContent: '<div class="map__hint">ул.Новый Арбат, д.31/12</div>',
        balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные батончики у нас! Заходите по адресу:ул.Новый Арбат, д.31/12',
            '</div>'
        ]
    },
    {
        latitude: 55.759,
        longitude: 37.583,
        hintContent: '<div class="map__hint">Кудринская площадь</div>',
        balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные бургеры у нас! Заходите по адресу: Кудринская площадь',
            '</div>'
        ]
    },
    {
        latitude: 55.75,
        longitude: 37.58,
        hintContent: '<div class="map__hint">1-й Смоленский пер."</div>',
        balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные бургеры у нас! Заходите по адресу: 1-й Смоленский пер.',
            '</div>'
        ]
    },
    {
        latitude: 55.756928,
        longitude: 37.619156,
        hintContent: '<div class="map__hint">станция метро "Театральная"</div>',
        balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные бургеры у нас! Заходите по адресу: станция метро "Театральная"',
            '</div>'
        ]
    }
],
    geoObjects= [];

function init() {
    var map = new ymaps.Map('map', {
        center: [55.751947, 37.599337],
        zoom: 14.5,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '../img/content/map-sign.png',
                iconImageSize: [46, 57]
            });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: '../img/content/bars.png',
                size: [100, 100],
                offset: [-50, -50]
            }
        ],
        clusterIconContentLayout: null,
        minClusterSize: 4
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/js/modules/calc.js":
/*!*********************************!*\
  !*** ./dist/js/modules/calc.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc () {
       // Калькулятор

       const result = document.querySelector('.calculating__result span');

       let sex, height, weight, age, ratio;
   
       if (localStorage.getItem ('sex')) {
           sex = localStorage.getItem ('sex'); 
       } else {
           sex = 'female';
           localStorage.setItem ('sex', 'female');
       }
   
       if (localStorage.getItem ('ratio')) {
           ratio = localStorage.getItem ('ratio'); 
       } else {
           ratio = 1.2;
           localStorage.setItem ('ratio', 1.2);
       }
   
       
       function calcTotal() {
           if (!sex || !height || !weight || !age || !ratio) {
               result.textContent = '____'; 
               return;
           }
           if (sex === 'female') {
               result.textContent = Math.round(((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio));
           } else {
               result.textContent = Math.round(((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio));
           }
       }
   
       calcTotal();
   
       function initLocalSettings (selector, activeClass) {
           const elements = document.querySelectorAll (selector);
   
           elements.forEach ( elem =>{
               elem.classList.remove (activeClass);
   
               if (elem.getAttribute ('id') === localStorage.getItem ('sex')) {
                   elem.classList.add (activeClass);
               }
   
               if (elem.getAttribute ('data-ratio') === localStorage.getItem ('ratio')) {
                   elem.classList.add (activeClass);
               }
           });
       }
   
       initLocalSettings ('#gender div', 'calculating__choose-item_active');
       initLocalSettings ('.calculating__choose_big div', 'calculating__choose-item_active');
   
       function getStaticInformation(selector, activeClass) {
           const elements = document.querySelectorAll(selector);
   
           elements.forEach(elem => {
               elem.addEventListener('click', (e) => {
                   if (e.target.getAttribute('data-ratio')) {
                       ratio = +e.target.getAttribute('data-ratio');
                       localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                   } else {
                       sex = e.target.getAttribute('id');
                       localStorage.setItem('sex', e.target.getAttribute('id'));
                   }
       
                   elements.forEach(elem => {
                       elem.classList.remove(activeClass);
                   });
       
                   e.target.classList.add(activeClass);
       
                   calcTotal();
               });
           });
       }
   
       getStaticInformation('#gender div', 'calculating__choose-item_active');
       getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
   
   
       function getDynamicInformation (selector) {
           const input = document.querySelector (selector);
   
       
   
           input.addEventListener ('input', () => {
               if (input.value.match (/\D/g)) {
                   input.style.border = 'solid 1px red';
               } else {
                   input.style.border = 'none';
               }
   
               switch (input.getAttribute ('id')) {
                   case 'height':
                       height = +input.value;
                       break;
                   case 'weight':
                       weight = +input.value;
                       break; 
                   case 'age':
                       age = +input.value;
                       break;
               }
               calcTotal();
           });  
       }
   
       getDynamicInformation ('#height');
       getDynamicInformation('#weight');
       getDynamicInformation ('#age');
}

module.exports = calc;


/***/ }),

/***/ "./dist/js/modules/cards.js":
/*!**********************************!*\
  !*** ./dist/js/modules/cards.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards () {
    // Используем классы для карточек

    class Menu {
        constructor(src, alt, title, description, price, parentSelector, ... classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add (this.element);
            } else {
                this.classes.forEach (className => element.classList.add(className));
            }
            

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResource = async  (url) => {
        const res = await fetch (url);

        if (!res.ok) {
            throw new Error(`could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    //getResource ('http://localhost:3000/menu')
    //.then (data => {
        //data.forEach (({img, altimg, title, description, price}) => {
        //    new Menu(img, altimg, title, description, price, '.menu .container').render();
        //});
    //});

    axios.get ('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach (({img, altimg, title, description, price}) => {
            new Menu(img, altimg, title, description, price, '.menu .container').render();
        });
    });
}

module.exports = cards;

/***/ }),

/***/ "./dist/js/modules/forms.js":
/*!**********************************!*\
  !*** ./dist/js/modules/forms.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms () {
    // Forms

    /*
    const forms = document.querySelectorAll ('form');

    const message = {
        loading: 'loading',
        success: 'all is okay',
        fail: 'something is wrong'
    };

    forms.forEach ( form => {
        postData (form);
    });

    function postData (form) {
        form.addEventListener ('submit', (event) => {
            event.preventDefault ();

            let statusMessage = document.createElement ('div');
            statusMessage.classList.add ('status');
            statusMessage.textContent = message.loading;
            form.append (statusMessage);


            const request = new XMLHttpRequest ();
            request.open ('POST', 'js/server.php');

            const formData = new FormData (form);

            request.send (formData);

            request.addEventListener ('load', () => {
                if (request.status === 200) {
                    console.log (request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout ( () => {
                        statusMessage.remove();
                    }, 3000);
                } else {
                    statusMessage.textContent = message.fail;
                }
            });
        });
    }
    */


    // в форматі json

    const forms = document.querySelectorAll ('form');

    const message = {
        loading: 'js/img/form/spinner.svg',
        success: 'all is okay',
        fail: 'something is wrong'
    };

    forms.forEach ( form => {
        bindPostData (form);
    });

    const postData = async  (url, data) => {
        const res = await fetch (url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData (form) {
        form.addEventListener ('submit', (event) => {
            event.preventDefault ();

            let statusMessage = document.createElement ('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            statusMessage.textContent = message.loading;
            form.insertAdjacentElement ('afterend', statusMessage);


            const formData = new FormData (form);

            const json = JSON.stringify (Object.fromEntries(formData.entries()));

            postData ('http://localhost:3000/requests', json)
            .then (data => {
                console.log (data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(()=> {
                showThanksModal(message.fail);
            }).finally( () => {
                form.reset();
            });
        }); 
    }

    function showThanksModal (message) {
        const prevModalDialog = document.querySelector ('.modal__dialog');

        prevModalDialog.classList.add ('hide');
        openModal();

        const thanksModal = document.createElement ('div');
        thanksModal.classList.add ('modal__dialog');
        
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div class = 'modal__close' data-close>×</div>
                <div class = "modal__title">${message}</div>
            </div>
        `;

        document.querySelector ('.modal').append(thanksModal);

        setTimeout (() => {
            thanksModal.remove ();
            prevModalDialog.classList.add ('show');
            prevModalDialog.classList.remove ('hide');
            closeModal();
        }, 4000);
    }

    fetch ('http://localhost:3000/menu')
    .then (data => data.json())
    .then (res => console.log (res));

}

module.exports = forms;

/***/ }),

/***/ "./dist/js/modules/modal.js":
/*!**********************************!*\
  !*** ./dist/js/modules/modal.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal () {
    // Modal

    const modalTrigger = document.querySelectorAll ('[data-modal]'),
          modalWindow = document.querySelector ('.modal');

    function openModal () {
        modalWindow.classList.add ('show');
        modalWindow.classList.remove ('hide');
        document.body.style.overflow = 'hidden';
        clearInterval (modalTimer);
    }
    
    modalTrigger.forEach ( btn => {
        btn.addEventListener ('click', openModal);
    });

    

    function closeModal () {
        modalWindow.classList.remove ('show');
        modalWindow.classList.add ('hide');
        document.body.style.overflow = '';
    }

    modalWindow.addEventListener ('click', (event) => {
        if(event.target == modalWindow || event.target.getAttribute ('data-close') == "") {
            closeModal ();
        }
    });

    document.addEventListener ('keydown', (event) => {
        if (event.code == 'Escape' && modalWindow.classList.contains ('show')) {
            closeModal();
        }
    });

    const modalTimer = setTimeout (openModal, 100000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal ();
            window.removeEventListener ('scroll', showModalByScroll);
        }
    }


    window.addEventListener ('scroll', showModalByScroll);
    
}

module.exports = modal;

/***/ }),

/***/ "./dist/js/modules/slider.js":
/*!***********************************!*\
  !*** ./dist/js/modules/slider.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {
     // Slider

     const slides = document.querySelectorAll (".offer__slide"),
     slider = document.querySelector (".offer__slider"),
     prev = document.querySelector (".offer__slider-prev"),
     next = document.querySelector (".offer__slider-next"),
     total = document.querySelector ('#total'),
     current = document.querySelector ("#current"),
     slidesWrapper = document.querySelector (".offer__slider-wrapper"),
     slidesField = document.querySelector (".offer__slider-inner"),
     width = window.getComputedStyle(slidesWrapper).width;

let slideNum = 1;  
let offset = 0;

if (slides.length < 10 ) {
   total.textContent =`0${slides.length}`;
   current.textContent = `0${slideNum}`;
} else {
   total.textContent = slides.length;
   current.textContent = slideNum;
}


slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
   slide.style.width = width;
});

slider.style.position = 'relative';

const dots = document.createElement ('ol'),
     indicators = [];
dots.classList.add ('carusel-dots');
dots.style.cssText = `
   position: absolute;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: 15;
   display: flex;
   justify-content: center;
   margin-right: 15%;
   margin-left: 15%;
   list-style: none;
`;
slider.append (dots);

for (let i = 0; i < slides.length; i++) {
   const dot = document.createElement ('li');
   dot.setAttribute ('data-slide-to', i + 1);
   dot.style.cssText = `
       box-sizing: content-box;
       flex: 0 1 auto;
       width: 30px;
       height: 6px;
       margin-right: 3px;
       margin-left: 3px;
       cursor: pointer;
       background-color: #fff;
       background-clip: padding-box;
       border-top: 10px solid transparent;
       border-bottom: 10px solid transparent;
       opacity: .5;
       transition: opacity .6s ease;
   `;

   if ( i == 0) {
       dot.style.opacity = 1;
   }
   dots.append (dot);
   indicators.push (dot);
}

next.addEventListener('click', () => {
   if (offset == deleteNoDigits(width)   * (slides.length - 1)) {
       offset = 0;
   } else {
       offset += deleteNoDigits(width)  ; 
   }
   slidesField.style.transform = `translateX(-${offset}px)`;

   if (slideNum == slides.length ) {
       slideNum = 1;
   } else {
       slideNum++;
   }


   if (slides.length < 10 ) {
       current.textContent = `0${slideNum}`;
   } else {
       current.textContent = slideNum;
   }

   indicators.forEach (dot => dot.style.opacity = '.5');
   indicators[slideNum-1].style.opacity = 1;
       
});

prev.addEventListener('click', () => {
   if (offset == 0) {
       offset = deleteNoDigits(width)  * (slides.length - 1);
   } else {
       offset -= deleteNoDigits(width)  ;
   }

   slidesField.style.transform = `translateX(-${offset}px)`;

   if (slideNum == 1) {
       slideNum = slides.length;
   } else {
       slideNum--;
   }


   if (slides.length < 10 ) {
       current.textContent = `0${slideNum}`;
   } else {
       current.textContent = slideNum;
   }

   indicators.forEach (dot => dot.style.opacity = '.5');
   indicators[slideNum-1].style.opacity = 1;
}); 

indicators.forEach (dot => {
   dot.addEventListener ('click', (event) => {
       const slideTo = event.target.getAttribute ('data-slide-to');

       slideNum = slideTo;
       offset = deleteNoDigits(width)  * (slideTo - 1);
       slidesField.style.transform = `translateX(-${offset}px)`;

       if (slides.length < 10 ) {
           current.textContent = `0${slideNum}`;
       } else {
           current.textContent = slideNum;
       }

       indicators.forEach (dot => dot.style.opacity = '.5');
       indicators[slideNum-1].style.opacity = 1;           
   });
});

    function deleteNoDigits (str) {
    return +str.replace (/\D/g, "");
    }
}

module.exports = slider;


/***/ }),

/***/ "./dist/js/modules/tabs.js":
/*!*********************************!*\
  !*** ./dist/js/modules/tabs.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs () {
    
    //Tabs

    const tabs = document.querySelectorAll ('.tabheader__item'),
          tabsContent = document.querySelectorAll ('.tabcontent'),
          tabsParent = document.querySelector ('.tabcontainer');

    function hideTabContent () {
        tabsContent.forEach ( item => {
            // item.style.display = 'none'; 1 вариант

            item.classList.add ('hide');
            item.classList.remove ('show', 'fade'); // 2 вариант, через сss
        });

        tabs.forEach ( item => {
            item.classList.remove ('tabheader__item_active');
        });
    }      

    function showTabContent (i = 0) {
        // tabsContent[i].style.display = 'block'; 1 вариант

        tabsContent[i].classList.add ('show', 'fade');
        tabsContent[i].classList.remove ('hide'); // 2 вариант, через сss

        tabs[i].classList.add ('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener ('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains ('tabheader__item')) {
            tabs.forEach ( (item, i) => {
                if (target == item) {
                    hideTabContent ();
                    showTabContent (i);
                }
            });
        }
    });

}

module.exports = tabs;

/***/ }),

/***/ "./dist/js/modules/timer.js":
/*!**********************************!*\
  !*** ./dist/js/modules/timer.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer () {
     // Timer

     const deadline = '2021-05-29';

     function getTimeRemaining(endtime) {
 
         let days, hours, minutes, seconds;
         const subtraction = Date.parse(endtime) - Date.parse(new Date());
 
         if (subtraction <= 0) {
             days = 0;
             hours = 0;
             minutes = 0;
             seconds = 0;
         } else {
               days = Math.floor(subtraction/(1000 * 60 *60 * 24)),
               hours = Math.floor((subtraction/(1000 * 60 * 60) % 24)),
               minutes = Math.floor ((subtraction/(1000 * 60) % 60)),
               seconds = Math.floor((subtraction/1000) % 60) ;
         }
 
         return {
             'total': subtraction,
             'days': days,
             'hours': hours,
             'minutes': minutes,
             'seconds': seconds
         }; 
      
     }
 
     function getZero (num) {
         if (num>=0 && num < 10) {
             return `0${num}`;
         } else {
             return num;
         }
     }
 
 
     function setClock (sel, endtime) {
         const timer = document.querySelector (sel),
               days = timer.querySelector ('#days'),
               hours = timer.querySelector ('#hours'),
               minutes = timer.querySelector ('#minutes'),
               seconds = timer.querySelector ('#seconds'),
               timeInterval = setInterval (updateClock, 1000);
         
 
         function updateClock () {
             const t = getTimeRemaining (endtime);
 
             days.innerHTML = getZero (t.days);
             hours.innerHTML = getZero (t.hours);
             minutes.innerHTML = getZero (t.minutes);
             seconds.innerHTML = getZero (t.seconds);
 
             if (t.total <= 0) {
                 clearInterval(timeInterval);
             }
         }      
 
         updateClock();      
 
     }
 
     
     setClock ('.timer', deadline); 
}

module.exports = timer;

/***/ }),

/***/ "./dist/js/script.js":
/*!***************************!*\
  !*** ./dist/js/script.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function() {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./dist/js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./dist/js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./dist/js/modules/timer.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./dist/js/modules/cards.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./dist/js/modules/calc.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./dist/js/modules/forms.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./dist/js/modules/slider.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider(); 
});



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
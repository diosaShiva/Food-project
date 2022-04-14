window.addEventListener('DOMContentLoaded', function() {


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


    // Timer

    const deadline = '2022-03-29';

    function getTimeRemaining(endtime) {
        const subtraction = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(subtraction/(1000 * 60 *60 * 24)),
              hours = Math.floor((subtraction/(1000 * 60 * 60) % 24)),
              minutes = Math.floor ((subtraction/(1000 * 60) % 60)),
              seconds = Math.floor((subtraction/1000) % 60);
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

    
    // Калькулятор

    const result = document.querySelector('.calculating__result span');


    let sex = 'male',
        height, weight, age,
        ratio = 1.2;

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

    function getStaticInformation (parentSelector, activeClass) {
        const elements = document.querySelectorAll (`${parentSelector} div`);

        elements.forEach (element => {
            element.classList.remove (activeClass);
        });

        elements.forEach ( elem => {
            elem.addEventListener ('click', (event) => {
                if (event.target.getAttribute ('data-ratio')) {
                    ratio = +event.target.getAttribute ('data-ratio');
                } else {
                    sex = event.target.getAttribute ('id');
                }

                event.target.classList.add (activeClass);
                calcTotal();
            });
        });   
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformatio (selector) {
        const input = document.querySelector (selector);

        input.addEventListener ('input', () => {
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

    getDynamicInformatio ('#height');
    getDynamicInformatio ('#weight');
    getDynamicInformatio ('#age');
});
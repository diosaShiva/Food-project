window.addEventListener ('DOMContentLoaded', () =>{


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
          modalWindow = document.querySelector ('.modal'),
          modalClose = document.querySelector ('[data-close]');

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

    modalClose.addEventListener ('click', closeModal);

    modalWindow.addEventListener ('click', (event) => {
        if(event.target == modalWindow) {
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

    new Menu(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        'menu__item'
    ).render();

    new Menu(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
        'menu__item'
    ).render();

    new Menu(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
        'menu__item'
    ).render();

    // Forms

    /*
    const forms = document.querySelectorAll ('form');

    const message = {
        loading: 'Loading',
        success: 'Thanks. We will contact you!',
        failure: 'Something got wrong'
    };

    forms.forEach( item => {
        postData (item);
    });

    function  postData(form) {
        form.addEventListener ('submit', (event) => {
            event.preventDefault ();

            let statusMessage = document.createElement ('div');
            statusMessage.classList.add ('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);
            
            const request  = new XMLHttpRequest();
            request.open ('POST', 'server.php');

            request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData =  new FormData(form);

            request.send(formData);

            request.addEventListener ('load', () => {
                if (request.status === 200) {
                    console.log (request.response);
                    statusMessage.textContent = message.success;
                } else {
                    statusMessage.textContent = message.failure;
                }
            });

        });
    }
    */

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы c вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);
        
            const request = new XMLHttpRequest();
            request.open('POST', 'js/server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });

            const json = JSON.stringify (obj);       

            request.send (json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout ( () => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});
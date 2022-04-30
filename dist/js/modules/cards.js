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
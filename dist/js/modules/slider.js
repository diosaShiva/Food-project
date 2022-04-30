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

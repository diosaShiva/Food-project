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
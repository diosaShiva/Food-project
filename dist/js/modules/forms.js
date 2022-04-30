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
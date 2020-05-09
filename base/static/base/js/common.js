// let popbox = new Popbox();

(function () {
    document.querySelectorAll("form button").forEach(btn => {
        btn.addEventListener("click", function (e) {

            e.preventDefault();

            let form = this.closest("form");

            let csrfValue = form.querySelector("input[name=csrfmiddlewaretoken]").value;

            let nameInput = form.querySelector("input[name=name]");
            let nameValue = nameInput.value;
            // let isNameValid = validateName(nameValue);

            let emailInput = form.querySelector("input[name=email]");
            let emailValue = emailInput.value;
            // let isEmailValid = validateEmail(emailValue);

            let phoneInput = form.querySelector("input[name=phone]");
            let phoneValue = phoneInput.value;

            let messageInput = form.querySelector("textarea[name=message]");
            let messageValue = messageInput.value;

            // if (!isNameValid) inputErrorAnimation(nameInput);
            // if (!isEmailValid) inputErrorAnimation(emailInput);

            // let isFormValid = isNameValid && isEmailValid;

            // if (isFormValid) {
            postAjax('/contact/', {
                csrfmiddlewaretoken: csrfValue,
                name: nameValue,
                email: emailValue,
                phone: phoneValue,
                message: messageValue,
            }, function (data) {
                // document.querySelector('.my-spinner').style.display = "none";
                // document.querySelector('.js-popbox-result .title_h2').innerHTML = '<span class="text_color_primary">Спасибо, <br></span> ваша заявка отправлена';
                // popbox.open("popbox-result")


                let data_parsed = JSON.parse(data);

                form.querySelectorAll('.error_message').forEach(error_message => {
                    error_message.remove();
                });

                form.querySelectorAll('input').forEach(input => {
                    input.classList.remove('isInvalid');
                    input.classList.add('isValid');
                });

                if ('errors' in data_parsed) {
                    for (let key in data_parsed['errors']) {
                        let input_with_error = form.querySelector('[name=' + key + ']');
                        input_with_error.classList.add('isInvalid');

                        let final_error_message = '';
                        for (let i in data_parsed['errors'][key]) {
                            final_error_message += data_parsed['errors'][key][i] + '///'
                        }

                        input_with_error.insertAdjacentHTML('afterend', '<small class="error_message">' + final_error_message + '</small>');
                    }
                }
//
                if ('success' in data_parsed) {
                    console.log('success')
                }
            }, function (data) {
                // document.querySelector('.my-spinner').style.display = "none";
                // document.querySelector('.js-popbox-result .title_h2').innerHTML = '<span class="text_color_primary">Ошибка!</span> Пожалуйста, перезагрузите страницу и попробуйте отправить запрос снова.';
                // popbox.open("popbox-result")
            });
            // form.reset();

            // popbox.close(form.closest(".popbox"));
            // document.querySelector('.my-spinner').style.display = "inline-block";
            // }

        });
    });

    function postAjax(url, data, success, fail) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            }
        ).join('&');

        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status === 200) {
                success(xhr.responseText);
            } else {
                fail(xhr.responseText)
            }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        return xhr;
    }


}());
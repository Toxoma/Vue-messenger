class Validator {
    constructor({
        selector,
        pattern = {},
        method
    }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.error = new Set();
    }

    init() {
        // this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({
                target: elem
            }));
            if (this.error.size) {
                e.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                if (elem.dataset.valid === 'password') {
                    return pattern[0].test(elem.value) && !pattern[1].test(elem.value)
                } else {
                    return pattern.test(elem.value);
                }
            }
        };

        if (this.method) {
            const method = this.method[elem.dataset.valid];

            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }

        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
        }

        return true;
    }

    checkIt(event) {
        const target = event.target;
        if (document.querySelector('.password-text')) {
            document.querySelector('.password-text').remove();
        }

        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.error.add(target);
            this.showError(target);
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.dataset.valid === 'password') {
            if (elem.dataset.key === 'password') {
                elem.insertAdjacentHTML('afterend', `
                    <div class="password-text"><p>Пароль не меньше 6 символов на латинице;</p>
                    <p>Иметь 1 букву в верхнем и нижнем регистрах;</p>
                    <p>Иметь 1 цифру;</p>
                    </div>
                    `);
            } else {
                elem.insertAdjacentHTML('afterend', `
                    <div class="password-text"><p>Пароль не совпадает!</p></div>`);
            }
        }
        if (elem.dataset.valid === 'name') {
                elem.insertAdjacentHTML('afterend', `
                    <div class="password-text"><p>Не менее 2х букв на латинице;</p>
                    <p>Без спецсимволов и цифр;</p>
                    </div>
                    `);
        }
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
    }

    // applyStyle() {
    // }

    setPattern() {
        if (!this.pattern.name) {
            this.pattern.name = /^[A-Z][a-z]{1,}$/;
        }
        if (!this.pattern.message) {
            this.pattern.message = /[а-я\d]+/i;
        }
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+7921\d{7}/;
        }
        if (!this.pattern.email) {
            this.pattern.email = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        }
        if (!this.pattern.password) {
        this.pattern.password = [/(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{6,}/, /[\W_]/];
        }
    }
}

export default Validator;
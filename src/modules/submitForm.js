        //считывание формы
        import clear from '../modules/clear';

        function submitForm(e, _this) {
            if (e.target.querySelector('.error')) {
                return false;
            }
            const inputs = Array.from(e.target.querySelectorAll('input'));
            
            inputs.forEach(input => {
                _this.userData[input.dataset.key] = input.value;
            })
            console.log(_this.userData);
            clear(_this.info);
            return true;
        }

        export default submitForm;
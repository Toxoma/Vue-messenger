        //считывание формы
        import clear from '../modules/clear';

        function submitForm(e, _this) {
            if (e.target.querySelector('.error')) {
                return false;
            }
            const inputs = Array.from(e.target.querySelectorAll('input'));
            let arr = {};
            inputs.forEach(input => {
                arr[input.dataset.key]= input.value;
            });
            clear(_this.info);
            return arr;
        }

        export default submitForm;
const inputValid = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        // data.errCount.add(input);
        input.addEventListener('change', () => {
            if (!input.value) {
                input.classList.remove('success')
                input.classList.add('cancel')
                // data.errCount.add(input);
            } else {
                input.classList.remove('cancel')
                input.classList.add('success')
                // data.errCount.delete(input);
            }
        })
    })
}
export default inputValid;
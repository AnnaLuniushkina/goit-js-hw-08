const throttle = require('lodash.throttle');

const formRefs = document.querySelector('.feedback-form');

let formData = {};

formRefs.addEventListener('submit', onFormSubmit);
formRefs.addEventListener('input', throttle(onFormInput, 500));

savedForm();

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    console.log(formData);

    if (formData) {
        localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    }
}

function savedForm() {
    let formData = localStorage.getItem('feedback-form-state');

    if (formData) {
        formData = JSON.parse(formData);
        console.log(formData);
    };

    Object.entries(formData).forEach(
        ([name, value]) => (formRefs.elements[name].value = value),
    );
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log('Відправляємо форму');
    event.currentTarget.reset();
    localStorage.removeItem("feedback-form-state");
    console.log(formData);
}
const throttle = require('lodash.throttle');

const formRefs = document.querySelector('.feedback-form');
const KEY = "feedback-form-state";
const formSavedData = {};

savedForm();

formRefs.addEventListener('input', throttle((event) => {
    const formData = new FormData(formRefs);
    formData.forEach((name, value) => console.log(`${value} - ${name}`));

    let parsedData = localStorage.getItem(KEY);
    parsedData = parsedData ? JSON.parse(parsedData) : formSavedData;
    console.log(parsedData);
    parsedData[event.target.name] = event.target.value;
    if (parsedData) {
        localStorage.setItem(KEY, JSON.stringify(parsedData));
    }
}, 500));

formRefs.addEventListener('submit', onFormSubmit);

function savedForm() {
    let savedData = localStorage.getItem(KEY);

    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        formRefs.email.value = email;
        formRefs.message.value = message;
        formSavedData.email = email;
        formSavedData.message = message;
        console.log(savedData);
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log('Відправляємо форму');
    event.currentTarget.reset();
    localStorage.removeItem(KEY);
    console.log(formSavedData);
}

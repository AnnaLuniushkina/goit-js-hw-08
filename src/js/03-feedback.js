const throttle = require('lodash.throttle');

const formRefs = document.querySelector('.feedback-form');
const KEY = "feedback-form-state";

let parsedData;
let savedData;

savedForm();

formRefs.addEventListener('input', throttle((event) => {
    const formData = new FormData(formRefs);
    formData.forEach((name, value) => console.log(`${value} - ${name}`));

    parsedData = localStorage.getItem(KEY);

    parsedData = parsedData ? JSON.parse(parsedData) : {};

    parsedData[event.target.name] = event.target.value;
    console.log(parsedData);

    if (parsedData) {
        localStorage.setItem(KEY, JSON.stringify(parsedData));
    }

}, 500));

formRefs.addEventListener('submit', onFormSubmit);

function savedForm() {
    savedData = localStorage.getItem(KEY);

    if (savedData) {
        savedData = JSON.parse(savedData);
        Object.entries(savedData).forEach(([name, value]) => {
        formRefs.elements[name].value = value;
        });
        console.log(savedData);
    }
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log('Відправляємо форму');
    event.currentTarget.reset();
    localStorage.removeItem(KEY);
    console.log(savedData || parsedData);
}
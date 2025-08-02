const feedback = document.querySelector('.feedback-form');
 
let formData = {
    email: '',
    message: '',
};



function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    return defaultValue || jsonData;
  }
}

const savedData = getFromLS('feedback-form-state', {});
if (savedData) {
  formData.email = savedData.email?.trim() || '';
  formData.message = savedData.message?.trim() || '';

  feedback.elements.email.value = formData.email;
  feedback.elements.message.value = formData.message;
}
    

feedback.addEventListener('input', e => {
    formData[e.target.name] = e.target.value.trim();
    saveToLS('feedback-form-state', formData);
});

feedback.addEventListener('submit', e => {
    e.preventDefault();

    if (formData.email === '' || formData.message === '') {
        alert('Fill please all fields');
        return;
    }
    console.log(formData);

    feedback.reset();
    localStorage.removeItem('feedback-form-state');
    formData = { email: '', message: '' };
});
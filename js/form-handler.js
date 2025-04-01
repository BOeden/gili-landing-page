const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data === 'success') {
      alert('הטופס נשלח בהצלחה!');
      form.reset();
    } else {
      alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('אירעה שגיאה בשליחת הטופס. אנא נסה שוב.');
  });
});
const form = document.getElementById('form');
const msg = document.getElementById('message');
const submitBtn = document.getElementById('submitButton');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault(); // Prevent the default form submission
  msg.textContent = 'Submitting..';
  msg.style.color = 'beige';
  msg.style.display = 'block';
  submitBtn.disabled = true;
  // Collect the form data
  const formData = new FormData(form);
  let keyValuePairs = [];
  for (let pair of formData.entries()) {
    keyValuePairs.push(pair[0] + '=' + pair[1].toString());
  }
  let formDataString = keyValuePairs.join('&');
  // Send a POST request to your Google Apps Script
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzTjOJyAzUxFz2NVXXln_iA7HkOPfRH7q_NLXj6uvxQy_Xj8R2uIpKI1k1KyC8CF3Qq/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: formDataString,
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      }
    );
    // Display a success message
    msg.textContent = 'Data submitted successfully!';
    msg.style.display = 'block';
    msg.style.backgroundColor = 'green';
    submitBtn.disabled = false;
    form.reset();
    setTimeout(() => {
      msg.textContent = '';
      msg.style.display = 'none';
    }, 2000);
  }
  catch (error) {
    // Handle errors, you can display an error message here
    console.error(error);
    msg.textContent = 'An error occurred while submitting the form: ' + error;
    msg.style.color = 'red';
    msg.style.display = 'block';
  }
});

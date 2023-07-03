// Get the submit button element from the login form
var submitButton = document.getElementById('submit-button');

// Add an event listener to the submit button
submitButton.addEventListener('click', function(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the username and password from the login form
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Store the login credentials in local storage
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  // Log the stored credentials to the console
  console.log('Stored credentials: ', localStorage.getItem('username'), localStorage.getItem('password'));

  // Send the login data to the server
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://example.com/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log('Response from server:', xhr.responseText);
    }
  };
  xhr.send(JSON.stringify({username: username, password: password}));
});

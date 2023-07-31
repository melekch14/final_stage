// JavaScript
$(document).ready(function() {
  $('#submit').click(function() {
    var username = $('#username').val();
    var password = $('#password').val();

    // Validate inputs
    if (!username || !password) {
      console.log('Username and password are required.');
      return;
    }

    // Disable the submit button during the AJAX request
    $('#submit').prop('disabled', true);

    $.ajax({
      url: '/api/auth/login',
      method: 'POST',
      data: { username, password },
      success: function(response) {
        localStorage.setItem('token', response.token);
        // Handle successful login
        window.location.href = '/index.html'; // Redirect to the home page
      },
      error: function(error) {
        console.log(error);
        // Handle login error
      },
      complete: function() {
        // Re-enable the submit button after the AJAX request is complete
        $('#submit').prop('disabled', false);
      }
    });
  });
});

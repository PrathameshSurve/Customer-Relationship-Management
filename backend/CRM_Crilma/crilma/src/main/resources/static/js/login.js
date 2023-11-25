document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-container");
    const emailInput = document.getElementById("username");
    const passwordInput = document.getElementById("confirmedpassword");
    
  
      loginForm.addEventListener("submit", function(event) {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,16}$/;
  
      // Check email and password format validity
      const isEmailValid = emailPattern.test(emailInput.value);
      const isPasswordValid = passwordPattern.test(passwordInput.value);
  
      if (!isEmailValid) {
        showValidMail();
        emailInput.value = '';
        event.preventDefault(); // Prevent form submission
      }
  
      if (!isPasswordValid) {
        showInValidPassword();
        passwordInput.value = '';
        event.preventDefault(); // Prevent form submission
      }
  
      if (isEmailValid && isPasswordValid) {
        fetch("/dashboard", {
          method: "POST",
          body: JSON.stringify({
            email: email.value,
            password: password.value
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => {
          if (response.status === 200) {
            // Handle a successful response (e.g., show a success message)
            console.log("Form data submitted successfully!");
          } else {
            // Handle an error response (e.g., show an error message)
            console.error("Form data submission failed.");
          }
        }).catch(error => {
          console.error("An error occurred:", error);
        });
      }
  
      // Function to show email validation error
      function showValidMail() {
        emailInput.style.color = 'red';
        emailInput.placeholder = 'Invalid Email Format';
        setTimeout(function() {
          emailInput.style.color = '';
          emailInput.placeholder = 'Enter Valid Email';
        }, 4000);
      }
  
      // Function to show password validation error
      function showInValidPassword() {
        passwordInput.style.color = 'red';
        passwordInput.placeholder = 'Invalid Password Format';
        setTimeout(function() {
          passwordInput.style.color = '';
          passwordInput.placeholder = 'Enter Valid Password ex: Pass@123';
        }, 4000);
      }
    });
  });
  

  //open dialog box for forgot password
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordDialog = document.getElementById('forgotPasswordDialog');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    
    forgotPasswordLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default link behavior
        forgotPasswordDialog.style.display = 'block';
    });

 
    forgotPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const userEmail = document.getElementById('forgotEmail').value;
        
        // You can now submit this email to your server for the "Forgot Password" process
        // Use AJAX or form submission as needed
        // Example:
        // fetch('/forgot-password', {
        //     method: 'POST',
        //     body: JSON.stringify({ email: userEmail }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => {
        //     // Handle the response, e.g., show a success message or error message
        // });
    });
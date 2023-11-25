document.addEventListener("DOMContentLoaded", function() {
  const signupForm = document.querySelector(".signupform");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  
  signupForm.addEventListener("submit", function(event) {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,16}$/;

    // Check email and password validity
    const isEmailValid = emailPattern.test(email.value);
    const isPasswordValid = passwordPattern.test(password.value);

    if (!isEmailValid) {
      showValidMail();
      email.value = '';
      event.preventDefault(); // Prevent form submission
    }  

    if (!isPasswordValid) {
      showValidPassword();
      password.value = '';
      event.preventDefault(); // Prevent form submission
    }

    if (isEmailValid && isPasswordValid) {
      fetch("/signupsuccessful", {
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
      email.placeholder = 'Please Enter Valid Email'; 
      email.style.color = 'red';
      setTimeout(function() {
        email.placeholder = 'Enter Email Again'; 
        email.style.color = '';
      }, 4000);
    }

    // Function to show password validation error
    function showValidPassword() {
      password.placeholder = 'Use 8-16 Strongly Combined characters';
      password.style.color = 'red';
      setTimeout(function() {
        password.placeholder = 'Enter Password Again';
        password.style.color = '';
      }, 4000);
    }
  });
});

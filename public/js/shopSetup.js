function showStep2(){
    document.getElementById("signupForm").style.display = "inline-block";
    step1 = document.getElementsByClassName("step1")
    for (ele of step1) {
        ele.style.display="none";
    }
  }
//...........................SignUp..........................

//checking password strength
function checkPasswordStrength(password) {
  var message = document.getElementById("password-strength-message");

  // Minimum length requirement
  var minLength = 8;

  // Regular expressions to check for various criteria
  var hasLowerCase = /[a-z]/.test(password);
  var hasUpperCase = /[A-Z]/.test(password);
  var hasNumbers = /\d/.test(password);
  var hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if the password meets all criteria
  var isStrong = password.length >= minLength && hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChars;

  // Display message based on strength
  if (isStrong) {
      message.innerText = "Password is strong.";
      message.style.color = "green";
      return true;
  } else {
      message.innerText = "Password is not strong. Please make sure it is at least 8 characters long and includes lowercase and uppercase letters, numbers, and special characters.";
      message.style.color = "red";
      return false;
  }
}

async function signup() {
  var email = document.getElementById('signupEmail').value;
  var city = document.getElementById('city').value;
  var userName = document.getElementById('signupUsername').value;
  var password = document.getElementById('signupPassword').value;
  var confirmPassword = document.getElementById('signupConfirmPassword').value;
  var message = document.getElementById("password-strength-message");
  var logo = document.getElementById('file').files[0]; // Get the file from the input element
  var category=document.getElementById("category").value;
  console.log(category)
  // category.addEventListener("change", function() {
  //  selectedValue = category.value;
  // console.log("Selected value: " + selectedValue);
  // });
  if (document.getElementById('toggle').checked) {
    var api = '/api/restaurants';
  } else {
    var api = '/api/marts';
  }

  // Fetching Data
  try {
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    // Check if username already exists
    const match = data.find(user => user.userName === userName);
    if (match) {
      message.innerText = "User Name already exists";
      message.style.color = "red";
      return;
    }
  } catch (error) {
    console.error('Error:', error.message);
  }

  if (password !== confirmPassword) {
    window.alert("Passwords don't match.");
    return;
  }

  if (!checkPasswordStrength(password)) {
    return;
  }

  // Prepare form data for submission
  const formData = new FormData();
  formData.append('userName', userName);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('city', city);
  formData.append('image', logo); // Append the file
  formData.append('Type', category);

  // Send form data to the server
  try {
    console.log(api)
    const response = await fetch(api, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log(data); // Log the response from the server
    alert('Your account has been successfully created!');
  } catch (error) {
    console.error('Error:', error);
  }
  
}
alert('Your account has been successfully create!');



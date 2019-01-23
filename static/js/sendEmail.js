function sendMail(contactForm) {
    emailjs.send("gmail", "online_profile", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "from_phone_number": contactForm.phone.value,
        "information_request": contactForm.message.value
    })
    
    .then(
        function(response) {
            alert('Your mail is sent!')

            console.log("SUCCESS", response);
      },
        function(error) {
            alert('Oops... ' + JSON.stringify(error));
            console.log("FAILED", error);
        }
    );
    document.getElementById("contactForm").reset();
    return false;
}
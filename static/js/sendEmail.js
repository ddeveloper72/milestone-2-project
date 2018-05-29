function sendMail(contactForm) {
    emailjs.send("gmail", "medical_dashboard", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "information_request": contactForm.messagesummary.value
        })    
    .then(
        function(response) {
            alert("Thank you for your message!  Send Successful");
            console.log("SUCCESS", response);
      },
        function(error) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
            console.log("FAILED", error);
        }
    );
    return false;    
}
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactUsComponent.css';

const validateEmail = (email) => {
    // Simple regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};

const ContactUsComponent = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailBlur = () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const sendEmail = (e) => {
        e.preventDefault(); // Prevent form refresh

        const form = e.target; // Reference to the form element
        const fromName = "Smart Communities Calgary Application team"; 
        const toName = form.name.value; // Get the value of the "name" input
        const replyTo = form.email.value; // Get the value of the "email" input
        const message = form.message.value; // Get the value of the "message" textarea
        
        // Validate the email on submit
        if (!validateEmail(replyTo)) {
            setEmailError('Please enter a valid email address.');
            return; // Prevent form submission if the email is invalid
        }

        const serviceID = "service_bsztg52"; // Service Id from EmailJS
        const templateID = "template_euuvkry"; // Template Id from EmailJS
        const publicKey = 'dtesIxXfxzdg9BiYr'; // Public Key from EmailJS
    
        //Sending email using emailjs.send
        //console.log('Data sent:', { fromName, toName, replyTo, message });
        //console.log('Reply To Email:', replyTo);
        emailjs
            .send(serviceID, templateID, {
                from_name: fromName, 
                to_name: toName, 
                reply_to: replyTo, 
                user_message: message, 
            }, publicKey)
            .then((result) => {
                 console.log('Email sent successfully:', result.text);
                 alert('Your message has been sent successfully!');
                 form.reset(); // Reset form inputs
                setEmail(''); // Reset state for email field
                setEmailError(''); // Clear any email validation error
            })
            .catch((error) => {
                console.error('Error sending email:', error.text);
                alert('There was an error sending your message. Please try again.');
            });
    };

    return (
        <form onSubmit={sendEmail}>
            <h3>Feedback</h3>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={email}
                onBlur={handleEmailBlur} // Validate email when the user tabs out
                onChange={(e) => setEmail(e.target.value)} // Update email state
                required
            />
            {/* Display email error if validation fails */}
            {emailError && <div className="error">{emailError}</div>}
            <textarea
                name="message"
                placeholder="Your Message"
                required
            />
            <button className="universal-color" type="submit">Send</button>
        </form>
    );
};

export default ContactUsComponent;

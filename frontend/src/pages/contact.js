
import React, { useState } from 'react';
import Navbar from './Navbar';
import {contactvalidation} from './Validation'
function Contact() {
    const [formData, setFormData] = useState({
        fname: '',
        email: '',
        subject: '',
        message: ''
    });
    const [contactMessage, setContactMessage] = useState('');
    const [errors, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = contactvalidation(formData);
        setError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!data.error) {
                setContactMessage(data.message);
            } else {
                setContactMessage(data.error);
            }
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setContactMessage(error);
        }
    }
    };

    return (
        <div className="container-xxl p-0">
            <Navbar />
            <div className="container-xxl py-5 bg-dark">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <h1 className="mb-3 text-white">Contact Us</h1>
                        <p className="text-white">{contactMessage}</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-12 col-md-6">
                            <div className="wow fadeInUp" data-wow-delay="0.5s">
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="name" name="fname" value={formData.name} onChange={handleChange} placeholder="Your Name" />
                                                <label htmlFor="name">Your Name</label>
                                                {errors.fname && <p style={{color:"red",fontSize:"13px",}}>{errors.fname}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" />
                                                <label htmlFor="email">Your Email</label>
                                                {errors.email && <p style={{color:"red",fontSize:"13px",}}>{errors.email}</p>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <input type="text" className="form-control" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
                                                <label htmlFor="subject">Subject</label>
                                                {errors.subject && <p style={{color:"red",fontSize:"13px",}}>{errors.subject}</p>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea className="form-control" placeholder="Leave a message here" id="message" name="message" value={formData.message} onChange={handleChange} style={{ height: "150px" }}></textarea>
                                                <label htmlFor="message">Message</label>
                                                {errors.message && <p style={{color:"red",fontSize:"13px",}}>{errors.message}</p>}

                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+91');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [fieldError, setFieldError] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [passwordLengthError, setPasswordLengthError] = useState(false);
    const [phoneLengthError, setPhoneLengthError] = useState(false);

    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (countryCode === '+91' && value.length > 10) {
            return;
        }
        setPhoneNumber(value);
        setPhoneLengthError(countryCode === '+91' && value.length !== 10);
    };

    const handleCountryCodeChange = (e) => {
        const newCountryCode = e.target.value;
        setCountryCode(newCountryCode);
        setPhoneNumber('');
        setPhoneLengthError(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(!validateEmail(e.target.value));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordLengthError(value.length < 6);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setPasswordError(value !== password);
    };

    const handleDobChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        setDob(e.target.value);
        setDobError(selectedDate >= today);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const isEmailValid = validateEmail(email);
        setEmailError(!isEmailValid);

        if (!name || !email || !password || !confirmPassword || !phoneNumber || !dob) {
            setFieldError(true);
            return;
        }

        if (passwordLengthError) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (phoneLengthError) {
            alert('Phone number must be exactly 10 digits for India');
            return;
        }

        if (dobError) {
            alert('Date of Birth cannot be in the future');
            return;
        }

        if (!isEmailValid) {
            alert('Invalid email format');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError(true);
            alert('Passwords do not match');
            return;
        }
  
        
        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
                dob,
                phoneNumber
            });
            console.log('Registration successful:', response.data);
            alert('Registration successful');
            console.log('Form submitted');
        } 
        catch (error) {
            console.error('Error response:', error.response);
            const errorMessage = error.response && error.response.data ? error.response.data.message : 'Registration Failed';
            alert(errorMessage);
        }
          
        
        setPasswordError(false);
        setFieldError(false);
        setPhoneLengthError(false);
        setDobError(false);
        setEmailError(false);
        
        setPhoneNumber('');
        setCountryCode('+91');
        setEmail('');
        setName('');
        setDob('');
        setPassword('');
        setConfirmPassword('');

        
        
    };

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center gap-y-5 mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        className={`block w-full mb-2 ${fieldError && !name ? 'border-red-500' : ''}`}
                        value={name}
                        onChange={handleNameChange}
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className={`block w-full mb-2 ${emailError ? 'border-red-500' : ''}`}
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <div className='relative mb-2'>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            className={`block w-full pr-10 ${fieldError && !password ? 'border-red-500' : ''} ${passwordLengthError ? 'border-red-500' : ''}`}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <button type="button" className='absolute right-2 top-2' onClick={togglePasswordVisibility}>
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordLengthError && (
                        <div className='text-red-500 text-sm mb-2'>Password must be at least 6 characters long</div>
                    )}
                    <div className='relative mb-2'>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            placeholder="Confirm Password"
                            className={`block w-full pr-10 ${passwordError ? 'border-red-500' : ''}`}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <button type="button" className='absolute right-2 top-2' onClick={toggleConfirmPasswordVisibility}>
                            {confirmPasswordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {passwordError && (
                        <div className='text-red-500 text-sm mb-2'>Passwords do not match</div>
                    )}
                    <div className='flex space-x-2 mb-2'>
                        <select
                            value={countryCode}
                            onChange={handleCountryCodeChange}
                            className='flex-1'
                        >
                            <option value="+91">+91 (India)</option>
                            <option value="+1">+1 (USA)</option>
                            <option value="+44">+44 (UK)</option>
                            {/* Add more country codes as needed */}
                        </select>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className={`flex-1 ${fieldError && !phoneNumber ? 'border-red-500' : ''} ${phoneLengthError ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        className={`block w-full mb-2 ${dobError ? 'border-red-500' : ''}`}
                        value={dob}
                        onChange={handleDobChange}
                    />
                    {dobError && (
                        <div className='text-red-500 text-sm mb-2'>Date of Birth cannot be in the future</div>
                    )}
                    {fieldError && (
                        <div className='text-red-500 text-sm mb-2'>All fields are required</div>
                    )}
                    <button type='submit' className='primary'>SignUp</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already have an account?
                        <Link className='text-bold text-black' to='/login'> Login </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
 
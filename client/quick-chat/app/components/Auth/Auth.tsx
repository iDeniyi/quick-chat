"use client";

import React, { FormEvent, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
// css
import styles from "./Auth.module.css";

const cookies = new Cookies();
interface InputProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputField: React.FC<InputProps> = ({
    label,
    type,
    name,
    placeholder,
    handleChange,
    required,
}) => (
    <div className={styles.inputContainer}>
        <label htmlFor={name}>{label}</label>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            required={required}
        />
    </div>
);

const formInitialState = {
    fullName: "",
    username: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
};

const Auth: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState(formInitialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { fullName, username, password, phoneNumber } = form;
        const URL = "http://localhost:5000/auth";
        const {
            data: { token, userId, hashedPassword },
        } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
            username,
            password,
            fullName,
            phoneNumber,
        });
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("fullName", fullName);

        if (isSignUp) {
            cookies.set("phoneNumber", phoneNumber);
            cookies.set("hashedPassword", hashedPassword);
        }
        window.location.reload();
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    };

    const additionalFields = isSignUp && (
        <>
            <InputField
                label="Full Name"
                name="fullName"
                type="text"
                placeholder="Full Name"
                handleChange={handleChange}
                required
            />
            <InputField
                label="Phone Number"
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                handleChange={handleChange}
                required
            />
            <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                handleChange={handleChange}
                required
            />
        </>
    );

    return (
        <div className={styles.authContainer}>
            <h2 className={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                {additionalFields}
                <InputField
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    handleChange={handleChange}
                    required
                />
                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    handleChange={handleChange}
                    required
                />
                <div className={styles.buttonContainer}>
                    <button type="submit">
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </form>
            <div className={styles.switchMode}>
                <p>
                    {isSignUp
                        ? "Already have an account? "
                        : "Don't have an account? "}
                    <span onClick={switchMode}>
                        {isSignUp ? "Sign in" : "Sign up"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;

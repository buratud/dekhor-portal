'use client'
import { useState } from 'react';
import { redirect, useRouter } from "next/navigation";
import Image from 'next/image';
import styles from './register.module.css';
import Link from 'next/link';
import axios from 'axios';
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../../../config';
import TopBar from '../../../components/TopBar';
import { supabase } from '../../../session'

export default function Home() {
    const router = useRouter();
    const initialFormData = {
        username: '',
        email: '',
        password: '',
        reenterPassword: '',
    };
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setIsRegistering(true);
        if (!formData.username || !formData.email || !formData.password || !formData.reenterPassword) {
            setError('Please fill in all fields.');
            setIsRegistering(false);
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address.');
            setIsRegistering(false);
            return;
        }

        if (formData.password != formData.reenterPassword) {
            setError('Please enter the same password.');
            setIsRegistering(false);
            return;
        }

        console.log('Submitted Data:', formData);

        axios.put(`${NEXT_PUBLIC_BASE_API_URL}/register`, {
            email: formData.email,
            username: formData.username,
        })
            .then(async res => {
                const { message, next } = res.data;
                message ? setError(message) : '';
                if (next) {
                    const { data, error } = await supabase.auth.signUp({
                        email: formData.email,
                        password: formData.password,
                        options: {
                            data: {
                                username: formData.username,
                            },
                        },
                    });

                    if (error) {
                        setError(error.message);
                        console.log(error);
                    }
                    else {

                        axios.put(`${NEXT_PUBLIC_BASE_API_URL}/update-username`, {
                            email: formData.email,
                            username: formData.username,
                            data
                        })
                        router.push(`/verify?email=${formData.email}`)
                    }
                }
            })
            .catch((err) => {
                setError(err.response.data.message)
                console.log(err);
            })
        setIsRegistering(false);
        setFormData(initialFormData);

        // router.push('/verify');
    };

    return (
        <>
            <title>DekHor | Register </title>

            <div className={styles.main}>
                <div className={styles.topbar}>
                    <TopBar />
                </div>
                <div className={styles.container}>
                    <div className={styles.register_form}>
                        <div className={styles.leftside}>
                            <div className={styles.Intro}>
                                <div className={styles.Intro_1}>
                                    <head1>Get Started with</head1>  <br />
                                    <head2>DekHor ID</head2>
                                </div>
                                <div className={styles.Intro_2}>
                                    One account for everything. <br />
                                    Blogs, Dorms, Eats, Markets <br />
                                    We’ve got you covered!
                                </div>
                            </div>

                            <div className={styles.pic}>
                                <Image alt="dekhor1" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/dekhor_1.png`} height={412} width={288} />
                            </div>
                        </div>

                        <div className={styles.rightside}>
                            <div className={styles.form}>
                                <div className={styles.block}>
                                    <div>Username</div>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.block}>
                                    <div>Email</div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                                        title="Please enter a valid email address."
                                    />
                                </div>
                                <div className={styles.block}>
                                    <div>Password</div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.block}>
                                    <div>Re-enter Password</div>
                                    <input
                                        type="password"
                                        name="reenterPassword"
                                        value={formData.reenterPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button onClick={handleSubmit}>Register</button>
                                <div id="customer-error" aria-live="polite" aria-atomic="true">
                                    {error && <div className={`${styles["error-text"]}`}>{error}</div>}
                                </div>
                            </div>
                            <account>
                                <span>
                                    Already have an account? <Link href="/login">Sign In.</Link>
                                </span>
                            </account>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

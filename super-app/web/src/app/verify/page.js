'use client'
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import axios from 'axios';
import { NEXT_PUBLIC_BASE_WEB_PATH, NEXT_PUBLIC_BASE_API_URL } from "../../../config";
import { Suspense } from 'react';
import TopBar from "../../../components/TopBar";
import { supabase } from '../../../session'

const Verify = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const sendOtp = async () => {
    // The loading state is now set before the timeout to ensure it shows immediately
    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp.join(""),
      type: "email",
    });

    if (error) {
      if (
        error.message.includes("invalid") ||
        error.message.includes("expired")
      ) {
        setError('OTP has invalid or expired');
      } else {
        console.log(error);
        setError('An error occurred while verifying OTP');
      }
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = paste.split('');
    setOtp(newOtp);

    /*if (otp.length === 6) {
      // Add a delay before submitting
      setTimeout(sendOtp, 10);
    }*/
  };

  const handleInputChange = (e, index) => {
    if (loading) return; // Prevent input when loading
    const { value, id } = e.target;
    let newOtp = [...otp];
    // Handle backspace/delete key for empty field
    if (value === '' && e.keyCode === 8 && index !== 0) {
      newOtp[index] = '';
      newOtp[index - 1] = ''; // Clear the previous field
      setOtp(newOtp);
      document.getElementById(`input${index}`).focus(); // Focus the previous field
    } else if (/^\d$/.test(value)) { // Check if the value is a single digit
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to next field if not the last
      if (index < otp.length - 1) {
        document.getElementById(`input${index + 2}`).focus();
      }
      // If all OTP inputs are filled, add a delay before submitting
      /*if (otp.every((num) => num.trim() !== '')) {
        setTimeout(sendOtp, 10);
      }*/
    } else {
      // Handle case where non-digit character is entered
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  useEffect(() => {
    // Focus the first input when the component mounts
    document.getElementById("input1").focus();
  }, []);

  return (
    <>
      <TopBar />
      <div className={styles.container}>
        {loading && <div className={styles.overlay}>
          <div className={styles.loading}>Loading...</div>
        </div>}
        <div className={styles.section}>
          <div className={styles.title}>
            <img src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/sendotp.png`} alt="" />
            <div>Verification Code</div>
          </div>
          <div className={styles.describ}>We have sent a verification code to your Email</div>
          <div id="inputs" onPaste={handlePaste}>
            {otp.map((value, index) => (
              <input
                key={index}
                id={`input${index + 1}`}
                className={styles.input}
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleInputChange(e, index)}
                autoComplete="off" // Disable autocomplete for security
              />
            ))}
          </div>
          <div className={styles.footer}>
            <button className={styles.button} onClick={sendOtp}>
              Submit
            </button>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true" className={`${styles["error-text"]}`}>
            {error && <div >{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default function VerifyPage() {
  return (
    <Suspense>
      <Verify />
    </Suspense>
  )
}

import React, { useState } from 'react';
import axiosInstance from "../../api/axiosInstance";
import styles from "./PatientSignup.module.css"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import registerImage from "./registerImage.jpg";
import Tilt from 'react-parallax-tilt';
const PatientSignup = () => {
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    age: '',
    maritalStatus: 'yes',
    height: '',
    weight: '',
    allergies: '',
    bloodGroup: 'A Positive',
    state: '',
    city: '',
    pincode: '',
    mobileNumber: '',
    emergencyContact: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axiosInstance.post('/patients/register', formData);
      setIsLoading(false);
      navigate('/auth/patientslogin');
      toast.success("Registration Success. Please Login To Continue", {
        position: "top-right",
        toastId: 3
      });
    } catch (error) {
      setIsLoading(false);
      // Handle errors here
      console.error('Registration failed', error);
    }
  };

  return (<>
    <div className={styles["main"]}>
      <div className={styles["image-div"]}>
        <h1 className={styles["brand"]}>CHS</h1>
        <h4 className={styles["tag-line"]}>India's First CHR Portal</h4>
        <Tilt
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          glareEnable={true}
          glareMaxOpacity={0.6}
          scale={1.02}
          transitionSpeed={2000}
          className="parallax-tilt"
        >
          <img alt='register__image' src={registerImage} />
        </Tilt>
      </div>
      {!isloading &&
        <div className={styles["form-div"]}>
          <h3>Ready to get started with CHS ?</h3>
          <p>Complete the form below and get started:</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h5>Personal Details</h5>
            <div className={styles["input-group"]}>
              <input placeholder="Name" name="name" required onChange={handleInputChange} value={formData.name} />
              <label>
                Gender:
                <select name="gender" onChange={handleInputChange} value={formData.gender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
            <div className={styles["input-group"]}>
              <input placeholder="Age" name="age" required onChange={handleInputChange} value={formData.age} />
              <label>
                Married:
                <select name="maritalStatus" onChange={handleInputChange} value={formData.maritalStatus}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <h5>Medical Details:</h5>
            <div className={styles["input-group"]}>
              <input placeholder="Height" name="height" required onChange={handleInputChange} value={formData.height} />
              <input placeholder="Weight" name="weight" required onChange={handleInputChange} value={formData.weight} />
            </div>
            <div className={styles["input-group"]}>
              <input placeholder="Allergies Enter ',' separated" name="allergies" className={styles["full-width"]} onChange={handleInputChange} value={formData.allergies} />
            </div>
            <div className={`${styles["input-group"]} ${styles["float-left"]}`}>
              <label className={styles["on-top"]}>Blood Group:</label>
              <select name="bloodGroup" onChange={handleInputChange} value={formData.bloodGroup}>
                <option>A Positive</option>
                <option>A Negative</option>
                <option>B Positive</option>
                <option>B Negative</option>
                <option>AB Positive</option>
                <option>AB Negative</option>
                <option>O Positive</option>
                <option>O Negative</option>
              </select>
            </div>
            <h5>Address:</h5>
            <div className={styles["input-group"]}>
              <input placeholder="State" name="state" required onChange={handleInputChange} value={formData.state} />
              <input placeholder="City" name="city" required onChange={handleInputChange} value={formData.city} />
            </div>
            <div className={styles["input-group"]}>
              <input placeholder="Pincode" name="pincode" required onChange={handleInputChange} value={formData.pincode} />
            </div>
            <h5>Contact Details:</h5>
            <div className={styles["input-group"]}>
              <input
                placeholder="Mobile Number"
                name="mobileNumber"
                required
                pattern="^[6-9]\d{9}$"
                onChange={handleInputChange}
                value={formData.mobileNumber}
              />
              <input placeholder="Emergency Contact" name="emergencyContact" required onChange={handleInputChange} value={formData.emergencyContact} />
            </div>
            <div className={styles["last-details"]}>
              <input placeholder="Email" name="email" required id="input--email" onChange={handleInputChange} value={formData.email} />
              <input
                placeholder="Password"
                name="password"
                required
                type="password"
                id="input--password"
                onChange={handleInputChange}
                value={formData.password}
              />
              <input
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button className={styles['btn']} type="submit">Submit</button>
            </div>
          </form>
        </div>
      }{
        isloading && <p>Loading ...</p>
      }
    </div >
  </>
  );
};

export default PatientSignup;

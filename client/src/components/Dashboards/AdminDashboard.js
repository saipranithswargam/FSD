import styles from "./AdminDashboard.module.css";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import { userActions } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import ProfileImageUpdate from "./UpdateImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
const AdminDashboard = () => {
  const user = useAppSelector((state) => state.user);
  let activeProfileStyles = true ? styles.activeButton : styles.button;
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.upper}>
          <div className={styles.info}>
            <ProfileImageUpdate />
            <h5>{user.name}</h5>
            <p></p>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.buttonsDiv}>
            <button className={activeProfileStyles}>Profile</button>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.upperHeading}>
            <h1>Profile</h1>

          </div>
          <div className={styles.profileManagement}>
            <div className={styles.InputGroup}>
              <div className={styles.InputDiv}>
                <label>Name</label>
                <input
                  disabled
                  value={user.name}
                />
              </div>
              <div className={styles.InputDiv}>
                <label>Email</label>
                <input
                  disabled
                  type="email"
                  value={user.email}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;

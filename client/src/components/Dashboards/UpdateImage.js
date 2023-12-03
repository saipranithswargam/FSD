import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import convertToBase64 from "../../helper/ConvertToBase64";
import axiosInstance from "../../api/axiosInstance";
import { userActions } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./UpdateImage.module.css";
const ProfileImageUpdate = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    const [image, setImage] = useState(user.image ? user.image : null);
    const [change, setChange] = useState(false);
    const [showSave, setShowSave] = useState(false);
    const dispatch = useAppDispatch();

    const handleImage = async (e) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/jpg"
            ) {
                let base64 = await convertToBase64(file);
                setShowSave(true);
                setImage(base64);
                setChange(true);
            } else {
            }
        }
    };

    const updateImage = async (e) => {
        setChange(false);
        try {
            const type = user.type + 's';
            await axiosInstance.post(`/${type}/updateimage`, {
                image,
                email: user.email,
            });
            dispatch(userActions.setImage(image));
            setChange(false);
            setShowSave(false);
        } catch (err) {
            console.log(err);
            if (err.message === "Network Error") {
            } else {
            }
            setChange(true);
        }
    };

    return (
        <div className={styles["update-image"]}>
            <label className={styles["update-image__label"]} htmlFor="proimage">
                <input
                    type="file"
                    id="proimage"
                    hidden
                    onChange={handleImage}
                />
                {image ? (
                    <img
                        src={image}
                        alt=""
                        className={styles["update-image__image"]}
                    />
                ) : (
                    <div className={styles["update-image__image-icon"]}>
                        {user.name[0].toUpperCase()}
                    </div>
                )}
            </label>
            {showSave ? (
                <button
                    className={styles[" "]}
                    id="probtn"
                    onClick={updateImage}
                    disabled={change ? false : true}
                >
                    Save
                </button>
            ) : null}
        </div>
    );
};

export default ProfileImageUpdate;

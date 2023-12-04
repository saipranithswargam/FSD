import React from 'react'
import Image from "./NoDoc.svg";
import styles from "./NoData.module.css";
export const NoData = () => {
    return (
        <div className={styles.imageDiv}>
            <img src={Image} alt='no doctors' />
        </div>
    )
}

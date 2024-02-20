import styles from "./AdminDoctors.module.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import List from "../../components/table/table";
import Chart from "../../components/chart/chart";

const AdminDoctors = () => {
    return (
        <div className={styles["doctors"]}>
            <Sidebar />
            <div className={styles["doctorsContainer"]}>
                <Navbar />
                <div className={styles["top"]}>
                    <div className={styles["left"]}>
                        <h1 className={styles["title"]}>Doctors Information</h1>
                        <div className={styles["item"]}>
                            <img
                                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                                alt=""
                                className={styles["itemImg"]}
                            />
                            <div className={styles["details"]}>
                                <h1 className={styles["itemTitle"]}>Jane Doe</h1>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Email:</span>
                                    <span className={styles["itemValue"]}>janedoe@gmail.com</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Phone:</span>
                                    <span className={styles["itemValue"]}>+91 2345 67 89</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Specialization:</span>
                                    <span className={styles["itemValue"]}>
                                        Cardiology
                                    </span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Last Appointment Date:</span>
                                    <span className={styles["itemValue"]}>16-02-2024</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>No Of Appointments:</span>
                                    <span className={styles["itemValue"]}>10</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Associated Hospital:</span>
                                    <span className={styles["itemValue"]}>ABC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["right"]}>
                        <Chart aspect={3 / 1} title="Jane Doe's Appointments ( Last 1 Year)" />
                    </div>
                </div>
                <div className={styles["bottom"]}>
                    <h1 className={styles["title"]}>Latest Appointments</h1>
                    <List />
                </div>
            </div>
        </div>
    );
};

export default AdminDoctors;
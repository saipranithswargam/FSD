import styles from "./AdminPatients.module.css"
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Chart from "../../components/chart/chart";
import List from "../../components/table/table";

const AdminPatients = () => {
    return (
        <div className={styles["patients"]}>
            <Sidebar />
            <div className={styles["patientsContainer"]}>
                <Navbar />
                <div className={styles["top"]}>
                    <div className={styles["left"]}>
                        <h1 className={styles["title"]}>Patients Information</h1>
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
                                    <span className={styles["itemKey"]}>Address:</span>
                                    <span className={styles["itemValue"]}>
                                        630, Gnan Marg , Satyavedu
                                    </span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Age:</span>
                                    <span className={styles["itemValue"]}>65</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Recent Disease:</span>
                                    <span className={styles["itemValue"]}>Common Cold</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Last Appointment Date:</span>
                                    <span className={styles["itemValue"]}>16-02-2024</span>
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

export default AdminPatients;
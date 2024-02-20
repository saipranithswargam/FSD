import styles from "./AdminDoctorList.module.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import DataTable from "../../components/datatable/datatable";

const AdminDoctorsList = () => {
    return (
        <div className={styles["doctors-list"]}>
            <Sidebar />
            <div className={styles["DoctorslistContainer"]}>
                <Navbar />
                <DataTable user="doctors" />
            </div>
        </div>
    );
};

export default AdminDoctorsList;
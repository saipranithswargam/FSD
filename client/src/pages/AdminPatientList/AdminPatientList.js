import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import DataTable from "../../components/datatable/datatable";
import styles from "./AdminPatientList.module.css"

const AdminPatientList = () => {
    return (
        <div className={styles["patient-list"]}>
            <Sidebar />
            <div className={styles["PatientlistContainer"]}>
                <Navbar />
                <DataTable user="patients" />
            </div>
        </div>
    );
};

export default AdminPatientList;
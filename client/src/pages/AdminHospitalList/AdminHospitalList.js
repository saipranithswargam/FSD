import styles from "./AdminHospitalList.module.css"
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import DataTable from "../../components/datatable/datatable";


const AdminHospitalList = () => {
    return (
        <div className={styles["hospital-list"]}>
            <Sidebar />
            <div className={styles["HospitalslistContainer"]}>
                <Navbar />
                <DataTable user="hospitals" />
            </div>
        </div>
    );
};

export default AdminHospitalList;
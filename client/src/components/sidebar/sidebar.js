import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css"
import axiosInstance from "../../api/axiosInstance"
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userActions } from "../../features/userSlice";
const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.get("/admin/logout");
            dispatch(userActions.reset());
            toast.success("Logged out successfully!", {
                position: "top-right",
                toastId: 7,
            });
            navigate("/", { replace: true });
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message, {
                position: "top-right",
            });
        }
    }
    return (
        <div className={styles["sidebar"]}>
            <div className={styles["top"]}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className={styles["logo"]}>Admin</span>
                </Link>
            </div>
            <hr />
            <div className={styles["center"]}>
                <ul>
                    <p className={styles["title"]}>MAIN</p>
                    <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className={styles["icon"]} />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className={styles["title"]}>LISTS</p>
                    <Link to="/admin/dashboard/patients" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className={styles["icon"]} />
                            <span>Patients</span>
                        </li>
                    </Link>
                    <Link to="/admin/dashboard/doctors" style={{ textDecoration: "none" }}>
                        <li>
                            <AdminPanelSettingsOutlinedIcon className={styles["icon"]} />
                            <span>Doctors</span>
                        </li>
                    </Link>
                    <Link to="/admin/dashboard/hospitals" style={{ textDecoration: "none" }}>
                        <li>
                            <MedicalServicesIcon className={styles["icon"]} />
                            <span>Hospitals</span>
                        </li>
                    </Link>
                    <p className={styles["title"]}>USER</p>
                    <li onClick={handleLogout}>
                        <ExitToAppIcon className={styles["icon"]} />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
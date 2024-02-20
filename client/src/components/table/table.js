import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./Table.module.css"

const List = () => {
    const rows = [
        {
            id: 1143155,
            patientName: "John Smith",
            doctorName: "ABC",
            appointmentDate: "1 March",
            disease: "Common Cold",
            status: "Medicated",
        },
        {
            id: 2235235,
            patientName: "Michael Doe",
            doctorName: "XYZ",
            appointmentDate: "1 March",
            disease: "Common Cold",
            status: "Medicated",
        },
        {
            id: 2342353,
            patientName: "John Smith",
            doctorName: "Red",
            appointmentDate: "1 March",
            disease: "Common Cold",
            status: "Not-Medicated",
        },
        {
            id: 2357741,
            patientName: "Jane Smith",
            doctorName: "Razer",
            appointmentDate: "1 March",
            disease: "Common Cold",
            status: "Medicated",
        },
        {
            id: 2342355,
            patientName: "Harold Carol",
            doctorName: "ASUS",
            appointmentDate: "1 March",
            disease: "Common Cold",
            status: "Not-Medicated",
        },
    ];

    return (
        <TableContainer component={Paper} className={styles["table"]}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={styles["tableCell"]}>Appointment ID</TableCell>
                        <TableCell className={styles["tableCell"]}>Patient Name</TableCell>
                        <TableCell className={styles["tableCell"]}>Doctor Name</TableCell>
                        <TableCell className={styles["tableCell"]}>Appointment Date</TableCell>
                        <TableCell className={styles["tableCell"]}>Disease</TableCell>
                        <TableCell className={styles["tableCell"]}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={styles["tableCell"]}>{row.id}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.patientName}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.doctorName}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.appointmentDate}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.disease}</TableCell>
                            <TableCell className={styles["tableCell"]}>
                                <span className={`${styles.status}  ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;

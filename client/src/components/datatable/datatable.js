import { DataGrid } from "@mui/x-data-grid";
import {
    userColumnsPatients,
    userRowsPatients,
    userColumnsDoctors,
    userRowsDoctors,
    userColumnsHospitals,
    userRowsHospitals
} from "../../datatablesource";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DataTable.module.css";
const DataTable = (props) => {
    let userRow, userColumns;
    if (props?.user === 'patients') {
        userRow = userRowsPatients;
        userColumns = userColumnsPatients;
    }
    else if (props?.user === 'doctors') {
        userRow = userRowsDoctors;
        userColumns = userColumnsDoctors;
    }
    else if (props?.user === 'hospitals') {
        userRow = userRowsHospitals;
        userColumns = userColumnsHospitals;
    }

    const [data, setData] = useState(userRow);

    const handleDelete = (id) => {
        setData(data?.filter((item) => item.id !== id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className={styles["cellAction"]}>
                        <Link to={`/admin/dashboard/${props?.user}/${params?.row.id}`} style={{ textDecoration: "none" }}>
                            <div className={styles["viewButton"]}>View</div>
                        </Link>
                        <div
                            className={styles["deleteButton"]}
                            onClick={() => handleDelete(params?.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className={styles["datatable"]}>
            <DataGrid
                className={styles["datagrid"]}
                rows={data}
                columns={userColumns?.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DataTable;
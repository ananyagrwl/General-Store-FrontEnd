import { useEffect, useState } from "react";
import { useStyles } from "./DisplayCompanyCss";
import MaterialTable from "@material-table/core";
import { ServerURL, getData, postData } from "../services/ServerServices";
import { Avatar } from "@mui/material";

export default function DisplayCategory() {

    var classes = useStyles();
    const [category, setCategory] = useState([])

    useEffect(function () {
        fetchAllCategories();
    }, [])

    const fetchAllCategories = async () => {
        var result = await getData("category/display")
        console.log("result.data",result.data)
        setCategory(result.data)
    }

    function showCompany() {
        return (
            <MaterialTable
                // height="50%"
                title={<span className={classes.heading}>Company Details</span>}
                columns={[
                    // { title: 'Company Name', field: 'companyname' },
                    { title: 'Product Name', field: 'productname' },
                    { title: 'Description', field:},
                    { title: 'Email Address', render: rowData => <div>{rowData.emailaddress}<br />{rowData.mobilenumber}</div> },
                    { title: 'Status', field: 'status' },
                    { title: 'Last Update', render: rowData => <div>{rowData.updateat}<br />{rowData.createat}<br />{rowData.createdby}</div> },
                    { title: 'Logo', render: rowData => <Avatar src={`${ServerURL}/images/${rowData.logo}`}></Avatar> }
                ]}
                data={companies}
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                    }
                ]}
                options={{
                    maxBodyHeight:"300px"
                  }}
            />
        )
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {showCompany()}
            </div>
        </div>
    )
}

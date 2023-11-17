import { useEffect, useState } from "react";
import { useStyles } from "./DisplayCompanyCss";
import MaterialTable from "@material-table/core";
import { ServerURL, getData, postData } from "../services/ServerServices";
import { Avatar } from "@mui/material";

export default function DisplayProduct() {

    var classes = useStyles();
    const [product, setProduct] = useState([])

    useEffect(function () {
        fetchAllProducts();
    }, [])

    const fetchAllProducts = async () => {
        var result = await getData("product/display")
        console.log("result.data",result.data)
        setProduct(result.data)
    }

    function showCompany() {
        return (
            <MaterialTable
                // height="50%"
                title={<span className={classes.heading}>Products List</span>}
                columns={[
                    { title: 'Product Name', field: 'productname'},
                    { title: 'Description', field: 'description' },
                    { title: 'Status', field: 'status' },
                    { title: 'Trending', field: 'trending' },
                    { title: 'Deals', field: 'deals' },
                    { title: 'Last Update', render: rowData => <div>{rowData.updateat}<br />{rowData.createat}<br />{rowData.createdby}</div> },
                    { title: 'Image', render: rowData => <Avatar src={`${ServerURL}/images/${rowData.image}`}></Avatar> }
                ]}
                data={product}
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

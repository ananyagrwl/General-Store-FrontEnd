import { useEffect, useState } from "react";
import { TextField, Button, Grid, IconButton, FormControl, Avatar, Box, MenuItem, Select, InputLabel } from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { useStyles } from "./CompanyCss";
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";

export default function Category() {
    var classes = useStyles();

    const [categoryName, setCategoryName] = useState();
    const [description, setDescription] = useState();
    const [categoryIcon, setCategoryIcon] = useState({ fileName: "/assets/watermark.jpg", bytes: "" });

    const handleIcon = (event) => {
        setCategoryIcon({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] }, { type: 'application/octet-stream' })
        // console.log(categoryIcon.fileName)
    }

    const handleSubmit = async () => {
        var formData = new FormData();
        var cd = new Date();
        var dd = cd.getDate() + "/" + (cd.getMonth() + 1) + "/" + cd.getFullYear() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
        formData.append("companyid", "1")
        formData.append("categoryname", categoryName)
        formData.append("description", description)
        formData.append("icon", categoryIcon.bytes)
        formData.append("createat", dd);
        formData.append("updateat", dd);
        formData.append("createdby", "ADMIN");
        var result = await postData("category/category_data", formData)
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: result.message,
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: result.message,
            })
        }
        clearAll();
    }

    function clearAll() {
        setCategoryName("")
        setDescription("")
        setCategoryIcon({ fileName: "/assets/watermark.jpg", bytes: "" })
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.row}>
                        <div><img src="/assets/add.png" width="40" /></div>
                        <div className={classes.heading}>
                            Add New Category
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={categoryName} varient="outlined" label="Category Name" onChange={(event) => setCategoryName(event.target.value)} />
                    </Grid>
                    <Grid item xs={6} className={classes.row}>
                        <IconButton fullWidth color="primary" aria-label="Upload Category Icon" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleIcon} />
                            <PhotoCamera />
                        </IconButton>
                        <Avatar variant="rounded" src={categoryIcon.fileName} sx={{ width: 56, height: 56 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth value={description} varient="outlined" label="Add Description" onChange={(event) => setDescription(event.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={handleSubmit} variant="contained">Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={clearAll} variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}
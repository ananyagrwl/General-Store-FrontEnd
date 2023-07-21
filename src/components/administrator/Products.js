import { useEffect, useState } from "react";
import { TextField, Button, Grid, IconButton, FormControl, Avatar, Link, MenuItem, Select, InputLabel, RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { useStyles } from "./CompanyCss";
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";

export default function Products() {
    var classes = useStyles();

    const [productName, setProductName] = useState();
    const [description, setDescription] = useState();
    const [productImage, setProductImage] = useState({ fileName: "/assets/watermark.jpg", bytes: "" });
    const [category, setCategory] = useState([]);
    const [cat, setCat] = useState([]);
    const [status, setStatus] = useState();
    const [deals, setDeals] = useState();
    const [trend, setTrend] = useState();
    const [priceType, setPriceType] = useState();

    const handleImage = (event) => {
        setProductImage({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] }, { type: 'application/octet-stream' })
        // console.log(categoryIcon.fileName)
    }

    useEffect(function () {
        fetchCategory()
    }, [])

    const fetchCategory = async () => {
        var result = await getData("product/fetch_category")
        // console.log("category", result)
        setCategory(result.data)
    }

    const fillCategory = () => {
        return category.map((i) => {
            return (<MenuItem value={i.categoryid}>{i.categoryname}</MenuItem>)
        })
    }

    const handleChangeCategory = (event) => {
        setCat(event.target.value);
    }

    const handleSubmit = async () => {
        var formData = new FormData();
        var cd = new Date();
        var dd = cd.getDate() + "/" + (cd.getMonth() + 1) + "/" + cd.getFullYear() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
        formData.append("companyid", "1")
        formData.append("categoryid", cat)
        formData.append("productname", productName)
        formData.append("description", description)
        formData.append("status", status)
        formData.append("trending", trend)
        formData.append("deals", deals)
        formData.append("pricetype", description)
        formData.append("image", productImage.bytes)
        formData.append("createat", dd);
        formData.append("updateat", dd);
        formData.append("createdby", "ADMIN");
        var result = await postData("product/product_data", formData)
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
        setProductName("")
        setDescription("")
        setProductImage({ fileName: "/assets/watermark.jpg", bytes: "" })
        setCat("Choose Category")
        setStatus("Select Staus")
        setDeals("")
        setTrend("")
        setPriceType("Choose Price Type")
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.row}>
                        <div><img src="/assets/add.png" width="40" /></div>
                        <div className={classes.heading}>
                            Add New Product
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={productName} varient="outlined" label="Product Name" onChange={(event) => setProductName(event.target.value)} />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={cat}
                                label="Category"
                                onChange={handleChangeCategory}
                            >
                                <MenuItem value={"Choose Category"}>Choose Category</MenuItem>
                                {fillCategory()}
                                <MenuItem sx={{ textDecoration: "none" }}><a href="/category">Add New Category</a></MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                value={status}
                                label="Status"
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <MenuItem value={"select staus<"}>Select Staus</MenuItem>
                                <MenuItem value={"available"}>Available</MenuItem>
                                <MenuItem value={"not available"}>Not Available</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="pricetype">Price Type</InputLabel>
                            <Select
                                labelId="pricetype"
                                id="pricetype"
                                value={priceType}
                                label="Price Type"
                            onChange={(e)=>setPriceType(e.target.value)}

                            >
                                <MenuItem value={"choose price type"}>Choose Price Type</MenuItem>
                                <MenuItem value={"kg"}>Kg</MenuItem>
                                <MenuItem value={"liter"}>Liter</MenuItem>
                                <MenuItem value={"pieces"}>Pieces</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl>
                            <FormLabel id="deals">Deals</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="deals"
                                name="row-radio-buttons-group"
                                value={deals}
                                defaultValue=""
                                onChange={(event)=>setDeals(event.target.value)}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl>
                            <FormLabel id="trending">Trending</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="trending"
                                name="row-radio-buttons-group"
                                value={trend}
                                onChange={(event)=>setTrend(event.target.value)}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />

                            </RadioGroup>
                        </FormControl>

                    </Grid>


                    <Grid item xs={6} className={classes.row}>
                        <IconButton fullWidth color="primary" aria-label="Upload Product Image" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleImage} />
                            <PhotoCamera />
                        </IconButton>
                        <Avatar variant="rounded" src={productImage.fileName} sx={{ width: 56, height: 56 }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={description} varient="outlined" label="Add Description" onChange={(event) => setDescription(event.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={clearAll} fullWidth variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div >
    )
}
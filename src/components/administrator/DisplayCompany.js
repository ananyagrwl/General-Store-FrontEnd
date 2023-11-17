import { useEffect, useState } from "react";
import { useStyles } from "./DisplayCompanyCss";
import MaterialTable from "@material-table/core";
import { ServerURL, getData, postData } from "../services/ServerServices";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { TextField, Grid, IconButton, FormControl, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import { PhotoCamera, Close } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function DisplayCompany() {

    var classes = useStyles();
    const [companies, setCompanies] = useState([])

    useEffect(function () {
        fetchAllCompanies()
    }, [])

    const fetchAllCompanies = async () => {
        var result = await getData("company/display")
        // console.log("result.data",result.data)
        setCompanies(result.data)
    }

    function showCompany() {
        
    }

    const [open, setOpen] = useState(false);

    const handleOpen = (rowData) => {
        setOpen(true);
        fetchAllCities(rowData.state)
        setCompanyName(rowData.companyname)
        setOwnerName(rowData.ownername)
        setEmailAddress(rowData.emailaddress)
        setAddress(rowData.address)
        setMobileNumber(rowData.mobilenumber)
        setCity(rowData.city)
        setState(rowData.state)
        setStatus(rowData.status)
        setCompanyLogo({ fileName:`${ServerURL}/images/${rowData.logo}`, bytes: "" })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [companyLogo, setCompanyLogo] = useState({ fileName: "/assets/watermark.jpg", bytes: "" });
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [status, setStatus] = useState('');
    const [btnStatus, setBtnStatus]=useState(false);

    useEffect(function () {
        fetchAllStates()
    }, [])

    const fetchAllStates = async () => {
        var result = await getData("statecity/fetch_state")
        // console.log("result.data",result.data)
        setStates(result.data)
        // console.log("Staes",states)
    }

    const fillStates = () => {
        return states.map((i) => {
            return (<MenuItem value={i.stateid}>{i.statename}</MenuItem>)
        })
    }

    const handleChangeState = (event) => {
        setState(event.target.value);
        fetchAllCities(event.target.value);
    }

    const fetchAllCities = async (stateid) => {
        var body = { "stateid": stateid }
        var result = await postData("statecity/fetch_city", body)
        // console.log("city",result)
        setCities(result.data)
    }

    const fillCities = () => {
        return cities.map((i) => {
            return (<MenuItem value={i.cityid}>{i.cityname}</MenuItem>)
        })
    }

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    }

    const handleLogo = (event) => {
        setCompanyLogo({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] }, { type: 'application/octet-stream' })
        // console.log(companyLogo.fileName)
        setBtnStatus(true);
    }

    const handleStatus=(status)=>{
        if(status==="Pending") setStatus("Verified")
        else if (status==="Verified") setStatus("Pending")
    }

    const handleEdit = async () => {
        var cd = new Date();
        var dd = cd.getDate() + "/" + (cd.getMonth() + 1) + "/" + cd.getFullYear() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
        // console.log("date", dd);
        // console.log("name",companyName)
        var body = {
            "companyname": companyName,
            "ownername": ownerName,
            "emailaddress": emailAddress,
            "mobilenumber": mobileNumber,
            "address": address,
            "state": state,
            "city": city,
            "createat": dd,
            "updateat": dd,
            "createdby": "ADMIN",
            "status": "Pending",
        }
        var result = await postData("company/edit", body)
        // console.log(result)
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
        handleClose();
    }
  

    // const PictureButton=()=>{
    //     return(
    //         <div className={btnStatus?classes.unhide:classes.hide}>
    //             {/* <div className={classes.hide}> */}
    //             <Button>Save</Button>
    //             <Button>Cancel</Button>
    //         </div>
    //     )
    // }

    const PictureButton=()=>{
        return(
            <div className={btnStatus?classes.unhide:classes.hide}>
                {/* <div className={classes.hide}> */}
                <Button>Save</Button>
                <Button>Cancel</Button>
            </div>
        )
    }

    function editCompany() {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className={classes.heading}>Edit Company</div>
                            <div onClick={handleClose} style={{ cursor: "pointer" }}><IconButton><Close /></IconButton></div>
                        </div>
                    </DialogTitle>
                    <DialogContent >
                        <Grid container spacing={2} style={{ marginTop: 10 }}>
                            <Grid item xs={6}>
                                <TextField fullWidth value={companyName} variant="outlined" label="Company Name" onChange={(event) => setCompanyName(event.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth value={ownerName} variant="outlined" label="Owner Name" onChange={(event) => setOwnerName(event.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth value={emailAddress} variant="outlined" label="Email Address" onChange={(event) => setEmailAddress(event.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth value={mobileNumber} variant="outlined" label="Mobile Number" onChange={(event) => setMobileNumber(event.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth value={address} variant="outlined" label="Address" onChange={(event) => setAddress(event.target.value)} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state}
                                        label="State"
                                        onChange={handleChangeState}
                                    >
                                        <MenuItem value={"Choose State"}>Choose State</MenuItem>
                                        {fillStates()}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={city}
                                        label="City"
                                        onChange={handleChangeCity}
                                    >
                                        <MenuItem value={"Choose City"}>Choose City</MenuItem>
                                        {fillCities()}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6} className={classes.row}>
                                 {status==="Pending"?<Switch onChange={()=>handleStatus(status)} />:<Switch onChange={()=>handleStatus(status)} defaultChecked/>}
                                 {status}
                            </Grid> 

                            <Grid item xs={6} className={classes.row}>
                                <IconButton fullWidth color="primary" aria-label="Upload Logo" component="label">
                                    <input hidden accept="image/*" type="file" onChange={handleLogo} />
                                    <PhotoCamera />
                                </IconButton>
                                <Avatar variant="rounded" src={companyLogo.fileName} sx={{ width: 56, height: 56 }} />
                                <PictureButton/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEdit}>Edit</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {editCompany()}
                {showCompany()}
            </div>
        </div>
    )
}

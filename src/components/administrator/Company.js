import { useEffect, useState } from "react";
import { TextField, Button, Grid, IconButton, FormControl, InputAdornment, InputLabel, OutlinedInput, Avatar, MenuItem, Select } from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { useStyles } from "./CompanyCss";
import { getData, postData } from "../services/ServerServices";
import Swal from "sweetalert2";

export default function Company() {
    var classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [companyLogo, setCompanyLogo] = useState({ fileName: "/assets/watermark.jpg", bytes: ""});
    const [state, setState] =useState('');
    const [city, setCity] =useState('');
    const [companyName, setCompanyName] =useState(''); 
    const [ownerName, setOwnerName] =useState('');
    const [emailAddress, setEmailAddress] =useState('');
    const [mobileNumber, setMobileNumber] =useState('');
    const [address, setAddress] =useState('');
    const [password, setPassword] =useState('');
    const [states, setStates] =useState([]);
    const [cities, setCities] =useState([]);

    useEffect(function(){
        fetchAllStates()
    },[])

    const fetchAllStates=async()=>{
        var result=await getData("statecity/fetch_state")
        // console.log("result.data",result.data)
        setStates(result.data)
        // console.log("Staes",states)
    }

    const fillStates=()=>{
        return states.map((i)=>{
            return (<MenuItem value={i.stateid}>{i.statename}</MenuItem>)
        })
    }

    const handleChangeState = (event) => {
        setState(event.target.value);
        fetchAllCities(event.target.value);
    }

    const fetchAllCities=async(stateid)=>{
        var body = {"stateid":stateid}
        var result=await postData("statecity/fetch_city", body)
        // console.log("city",result)
        setCities(result.data)
    }

    const fillCities=()=>{
        return cities.map((i)=>{
            return (<MenuItem value={i.cityid}>{i.cityname}</MenuItem>)
        })
    }
    
    const handleChangeCity = (event) => {
        setCity (event.target.value);
  }

    const handleLogo = (event) => {
        setCompanyLogo({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] }, { type: 'application/octet-stream' })
        // console.log(companyLogo.fileName)
    }

    const handleSubmit=async()=>{
        var formData = new FormData();
        var cd= new Date();
        var dd= cd.getDate() + "/" + (cd.getMonth()+1)+ "/" + cd.getFullYear()+" " + cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
        // console.log("date", dd);
        // console.log("name",companyName)
        formData.append("companyname", companyName);
        formData.append("ownername", ownerName);
        formData.append("emailaddress", emailAddress);
        formData.append("mobilenumber", mobileNumber);
        formData.append("address", address);
        formData.append("state", state);
        formData.append("city", city);
        formData.append("logo", companyLogo.bytes);
        formData.append("password", password);
        formData.append("createat", dd);
        formData.append("updateat", dd);
        formData.append("createdby", "ADMIN");
        formData.append("status", "pending");
        var result=await postData("company/company_data", formData)
        if(result.status){
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

    function clearAll(){
        setCompanyName("")
        setOwnerName("")
        setEmailAddress("")
        setAddress("")
        setMobileNumber("")
        setPassword("")
        setCity("Choose City")
        setState("Choose State")
        setCompanyLogo({ fileName: "/assets/watermark.jpg", bytes: ""})
    }


    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.row}>
                        <div><img src="/assets/logo.png" width="40" /></div>
                        <div className={classes.heading}>
                            Company Registration Form
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={companyName} variant="outlined" label="Company Name" onChange={(event)=>setCompanyName(event.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={ownerName} variant="outlined" label="Owner Name" onChange={(event)=>setOwnerName(event.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={emailAddress} variant="outlined" label="Email Address" onChange={(event)=>setEmailAddress(event.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth value={mobileNumber} variant="outlined" label="Mobile Number" onChange={(event)=>setMobileNumber(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth value={address} variant="outlined" label="Address" onChange={(event)=>setAddress(event.target.value)}/>
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
                        <IconButton fullWidth color="primary" aria-label="Upload Logo" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleLogo} />
                            <PhotoCamera />
                        </IconButton>
                        <Avatar variant="rounded" src={companyLogo.fileName} sx={{ width: 56, height: 56 }} />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlfor="pwd">Password</InputLabel>
                            <OutlinedInput
                                id="pwd"
                                value={password}
                                onChange={(event)=>setPassword(event.target.value)}
                                type={showPassword === false ? "password" : "text"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} onMouseDown={() => setShowPassword(!showPassword)}>
                                            {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>}
                            />
                        </FormControl>

                        {/* My Logic */}
                        {/* <FormControl>
                        <TextField variant="outlined" label="Password" type={showPassword==false? "password" : "text"}/>
                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                {showPassword==false? <VisibilityOff /> : <Visibility/>}
                            </IconButton>
                    </FormControl> */}

                        {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleSubmit} fullWidth variant="contained">Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={clearAll} fullWidth variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
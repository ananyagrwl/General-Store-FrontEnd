import { useState } from "react";
import { TextField, Button, Grid, IconButton, FormControl, InputAdornment, InputLabel, OutlinedInput, Avatar, Box, MenuItem, Select } from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { useStyles } from "./CompanyCss";

export default function Company() {
    var classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [companyLogo, setCompanyLogo] = useState({ fileName: "/assets/watermark.jpg", bytes: "" });
    const [state, setState] =useState('');
    const [city, setCity] =useState('');
    const [companyName, setCompanyName] =useState(''); 
    const [ownerName, setOwnerName] =useState('');
    const [emailAddress, setEmailAddress] =useState('');
    const [mobileNumber, setMobileNumber] =useState('');
    const [address, setAddress] =useState('');
    const [password, setPassword] =useState('');
 
    const handleLogo = (event) => {
        setCompanyLogo({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] }, { type: 'application/octet-stream' })
    }

    const handleChangeState = (event) => {
          setState(event.target.value);
    }
    const handleChangeCity = (event) => {
        setCity (event.target.value);
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
                        <TextField fullWidth variant="outlined" label="Company Name" onClick={(event)=>setCompanyName(event.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined" label="Owner Name" onClick={(event)=>setOwnerName(event.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined" label="Email Address" onClick={(event)=>setEmailAddress(event.target.value)}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined" label="Mobile Number" onClick={(event)=>setMobileNumber(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="outlined" label="Address" onClick={(event)=>setAddress(event.target.value)}/>
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
                                onClick={(event)=>setPassword(event.target.value)}
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
                        <Button fullWidth variant="contained" type="submit">Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" type="reset">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
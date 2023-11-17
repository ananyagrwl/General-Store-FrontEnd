import { makeStyles } from "@mui/styles";

export const useStyles= makeStyles({
    mainContainer: {
        display:"flex",
        width:"100vw",
        height:"100vh",
        justifyContent:"center",
        backgroundColor:"#dfe6e9",
        alignItems:"center",
    },
    box:{
        display:"flex",
        height:"fit-content",
        width:"50%",
        padding:"20px",
        justifyContent:"center",
        alignItems:"center",
        background:"white"
    },
    row:{
        display:"flex",
        alignItem:"center",
        gap:3,
    },
    heading:{
        display:"flex",
        fontFamily:"Poppins",
        fontSize:"18px",
        fontWeight:"bold",
        textAlign:"center",
        alignItems:"center"
    }
})
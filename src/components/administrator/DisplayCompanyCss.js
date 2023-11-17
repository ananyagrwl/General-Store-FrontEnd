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
        // height:"20%",
        width:"75%",
        padding:"20px",
        justifyContent:"center",
        alignItems:"center",
        // background:"white"
    },
    heading:{
        display:"flex",
        alignItems:"center",
        fontFamily:"Poppins",
        fontSize:"18px",
        fontWeight:"bold",
        textAlign:"center",
    },
    row:{
        display:"flex",
        alignItem:"center",
        gap:3,
    },
    hide:{
        display:"hidden",
    },
    unhide:{
        display:"flex",
    }
})
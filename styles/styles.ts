import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        padding:20,
        borderColor:"#c0c0c0"
    },
    profileImage:{
        borderRadius:50,
        width:100,
        height:100,
        marginRight:20,
    },
    profileContainer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:20,
        borderRadius:10,
        backgroundColor:"#EBF0FFF",
        elevation:5,
        marginTop:50,
    },
    profileName:{
        color:"#7A007A",
        fontWeight:"bold",
        fontSize:22
    }
});

export default styles
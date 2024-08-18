import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    conatiner: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '15%',
    },
    forgotpasswordContainer: {
        marginTop: '10%'
    },
    forgotpasswordText: {
        fontSize: 28,
        color: Colors.skyblue,
        fontWeight: '600'
    },
    imageContainer: {
        height: 142,
        width: 290
    },
    textContainer: {
        width: '80%',
        marginTop: '3%',
    },
    noticeText: {
        color: Colors.skyblue,
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'center',
    },
    textInputContainer: {
        marginTop: '4%',
    },
    buttonSend: {
        alignSelf: 'center',
        width: '68%',
        left: 10,
        marginTop: 20,
        borderRadius: 7,
    },

    textSend: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    }

});

export default styles;
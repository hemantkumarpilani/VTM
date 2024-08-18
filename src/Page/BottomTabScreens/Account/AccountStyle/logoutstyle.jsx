import { StyleSheet } from "react-native";

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Colors from "../../../../utils/Colors";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: Colors.white,
        width: responsiveWidth(90),
        overflow: 'hidden',
    },
    header: {
        backgroundColor: '#004672',
        paddingVertical: responsiveWidth(2),
    },
    body: {
        padding: responsiveWidth(3),
        alignItems: 'center'
    },
    VTM: {
        color: Colors.black,
        fontSize: responsiveFontSize(3)
    },
    bodyText: {
        fontSize: 16,
        marginBottom: 20,

    },
    cancelButton: {
        width: responsiveWidth(35),
        // height: responsiveHeight(5),
        marginHorizontal: responsiveWidth(5),
        padding:10,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightblue, 
        borderRadius: 7, 
    },
    buttonview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imageicon2: {
        height: responsiveHeight(5),
        width: responsiveWidth(5),
        tintColor: Colors.white,
    },
    iconContainer: {
        alignSelf: 'center'
    },
    textStyle:{
        color: Colors.white,
        fontWeight: '900',
        fontSize: 15,
        letterSpacing: 2,
      }
});

export default styles;

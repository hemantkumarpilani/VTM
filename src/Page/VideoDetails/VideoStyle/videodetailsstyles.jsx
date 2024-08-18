
import {StyleSheet,} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import Colors from '../../../utils/Colors';


  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
      height: responsiveHeight(100)
    },
    container2: {
      backgroundColor: Colors.lightblue,
      height: responsiveHeight(50)
    },
    container3: {
      backgroundColor:Colors.white,
      height: responsiveHeight(50),
      marginHorizontal: responsiveWidth(11),
      marginTop: responsiveWidth(-20),
      elevation: 5,
      borderRadius: 10,
    },
    imagearrow: {
      height: 20, width: 20, marginTop: 5, left: 5, tintColor: Colors.white
    },
    text: {
      color: '#a5234f',
      fontWeight: 'bold',
      fontSize: responsiveFontSize(2.4),
    },
    textview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      padding: responsiveWidth(5)
    },
    communityContainer: {
      marginTop: responsiveWidth(10),
      flexDirection:'column',
      alignItems: 'flex-end',
      marginHorizontal: responsiveWidth(1),
    },
    communityText: {
      fontSize: responsiveFontSize(2),
      color: Colors.white,
      fontWeight: '400',
    },
    videoNameContainer: {
      alignItems: 'flex-start',
      marginTop: responsiveWidth(1.5),
      marginBottom: responsiveWidth(3),
      marginHorizontal: 10,
    },
    videoNameText: {
      color: Colors.white,
      fontSize: responsiveFontSize(2.6),
      fontWeight: '700',
    },
    detailsContainer: {
      marginTop: responsiveWidth(1),
      marginHorizontal: responsiveWidth(3),
    },
    detailsText: {
      color: Colors.white,
      fontSize: responsiveFontSize(2),
      fontWeight: '500',
    },
    checkListText: {
      color: Colors.white,
      fontSize: responsiveFontSize(2.5),
      fontWeight: '500',
    },
    checkListTextContainer: {
      marginTop: responsiveWidth(2),
      marginHorizontal: responsiveWidth(3),
    },
    checkListContainer: {
      marginTop: responsiveWidth(2.4),
      marginHorizontal: responsiveWidth(2),
    },
    image: {
      height: responsiveHeight(20),
      width: '100%',
      alignSelf: 'center',
      top: responsiveHeight(13)
    },
    play: {
      width: responsiveWidth(14),
      height: responsiveWidth(14),
  
    },
    text4: {
      fontSize: 19,
      fontWeight: 'bold',
      color: '#942c4f',
  },
    Con:{ backgroundColor: Colors.lightblue, },
    imgBckgd:{ alignSelf: 'center',height:'100%',justifyContent:'center' },
    editImgCon:{alignSelf:'flex-end',marginHorizontal:5,top:15},
    editButton:{alignSelf:'flex-end',marginHorizontal:5,top:15},
    editImgPencil:{height:18,width:18,tintColor:'white'}
    
  })
  export default styles;
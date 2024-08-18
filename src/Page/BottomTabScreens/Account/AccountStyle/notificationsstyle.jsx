import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
      container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        
      },
      container1:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:'6%',
      },
      label: {
        fontSize: 20,
      },
      switch: {
        transform: [
            { scaleX: 1.3 }, 
            { scaleY: 1.3 }
        ], 
      },
      border:{
        borderBottomWidth:1,
        width:'100%',
        marginTop:4,
        opacity:0.3
      },
    });

    export default styles;


import { View, ScrollView, StyleSheet,Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HTML from 'react-native-render-html';
import LoaderModal from '../../../Components/LoaderModal';

import { LogBox } from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import Colors from '../../../utils/Colors';
LogBox.ignoreAllLogs();
const arrowimg = require('../../../assets/images/back.png')

const getTermsOfUse = async () => {
    try {
        const response = await axios.get('http://3.21.214.37/admin/api/V1/general/getPrivacyPolicy');
        return response.data.data.terms_and_conditions;
    } catch (error) {
        console.error('Error fetching terms Of Use:', error);
        return null;
    }
};

const TermsOfUse= () => {
    const [termsOFUseData, setTermsOFUseData] = useState('');
    const [loaderModal, setLoaderModal] = useState(false);
    useEffect(() => {
      setLoaderModal(true);
      setTimeout(() => {
          setLoaderModal(false)
      }, 2900);
        const fetchData = async () => {
            const data = await getTermsOfUse();
            if (data && typeof data === 'string') {
              setTermsOFUseData(data);
            } else {
                console.error('Privacy policy data is not in expected format:', data);
            }
        };
        fetchData();
    }, []);
    const htmlStyles = {
        p: { fontSize: 8, color: 'black'}, 
        h1: { fontSize:8},
    };

    return (
      <View>
        <View style={{right:6}}>
         <CustomHeader headerTitle={'Terms Of Use'} require={arrowimg} />
         </View>
        <ScrollView>
          <View style={styles.container}>
            <HTML source={{ html: termsOFUseData }} contentWidth={0}  ignoredDomTags={['o:p']} tagsStyles={htmlStyles} 
           />
           </View>
           <LoaderModal visible={loaderModal} transparent={true} />
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
  container:{
    marginLeft:5,
    marginRight:5,
    backgroundColor:Colors.white
  }
   
});

export default TermsOfUse;
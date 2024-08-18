

import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import LoaderModal from '../../../Components/LoaderModal';
import RenderHtml from "react-native-render-html";
import CustomHeader from '../../../Components/CustomHeader';
import Colors from '../../../utils/Colors';
import { useWindowDimensions } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

const arrowimg = require('../../../assets/images/back.png')

const PrivacyPolicy = () => {
    const [privacyPolicy, setPrivacyPolicy] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { width } = useWindowDimensions();

    useEffect(() => {
        getPrivacyPolicy();
    }, []);

    const getPrivacyPolicy = async () => {
        try {
            const response = await axios.get('http://3.21.214.37/admin/api/V1/general/getPrivacyPolicy');
            setPrivacyPolicy(response.data.data.privacy_policy);
            setIsLoading(false);
          //  console.log(response.data);
        } catch (error) {
            console.error('Error fetching Privacy Policy:', error);
            console.log('Error response:', error.response);
            setIsLoading(false);
        }
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <CustomHeader headerTitle={'Privacy Policy'} require={arrowimg} />
            <LoaderModal visible={isLoading} transparent={true} />
            <SectionList
                sections={[
                    { title: 'Privacy Policy', data: [privacyPolicy] }
                ]}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => (
                    <View style={styles.privacyPolicyContainer}>
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: item }}
                        />
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeaderContainer}>
                        <Text style={styles.sectionHeader}>{title}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    privacyPolicyContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        top: -40, 
    },
    sectionHeaderContainer: {
       // backgroundColor: Colors.lightblue,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.white,
    },
});

export default PrivacyPolicy;

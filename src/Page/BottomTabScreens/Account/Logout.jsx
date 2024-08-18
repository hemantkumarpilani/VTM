
import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './AccountStyle/logoutstyle';

const logimg=require('../../../assets/images/logout1.png');

const Logout = ({ visible, onCancel, onLogout }) => {
    const handleCancel = () => {
        onCancel(); 
    };
    const handleLogout = () => {
        onLogout(); 
    };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Image source={logimg} resizeMode='contain' style={styles.imageicon2} />
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.VTM}>VTM</Text>
                        <Text style={styles.bodyText}>Are you sure you want to logout?</Text>
                        <View style={styles.buttonview}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                             {/* <Button style={styles.cancelButton} label={'cancel'} onPress={handleCancel}/> */}
                            <TouchableOpacity style={styles.cancelButton} onPress={handleLogout}>
                                <Text style={styles.textStyle}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};



export default Logout;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

const CustomAlertModal2 = ({ visible, message, onCancel, onSubmit,allAnswersCorrect }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.messageText}>{message}</Text>
                    <View style={styles.buttonContainer}>
                    {!allAnswersCorrect && (
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.buttonText}>CANCEL</Text>
                        </TouchableOpacity>
                    )}
                        <TouchableOpacity onPress={onSubmit}>
                            <Text style={styles.buttonText}>SUBMIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: responsiveWidth(5),
        width: responsiveWidth(83),
        margin: responsiveWidth(3)
    },
    messageText: {
        fontSize: responsiveFontSize(2.1),
        marginBottom: responsiveWidth(5),
        color: 'black',
        paddingRight:responsiveWidth(2.5)
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'flex-end'
    },

    buttonText: {
        color: '#007ac3',
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        marginLeft:responsiveWidth(4)
    },
});

export default CustomAlertModal2;

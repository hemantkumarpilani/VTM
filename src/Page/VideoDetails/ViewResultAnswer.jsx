import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader';
const arrowimg = require('../../assets/images/back.png');

const ViewResultAnswer = ({ route }) => {
    const { userData } = route.params;
    console.log(userData);
    console.log(userData.questionData);

    return (
    <View>
         <CustomHeader headerTitle={'View Result'} require={arrowimg}/>
        <FlatList
            data={userData.questionData}
            renderItem={({ item, index }) => (
                <View style={styles.questionContainer} key={index}>
                    <Text style={styles.questionText}>{index + 1}. {item.question_name}</Text>
                    <View>
                        {item.question_option.map((option, oIndex) => (
                            <View style={styles.optionContainer} key={oIndex}>
                                <View style={styles.optionIndicator}>
                                    {option.user_answer === 'Y' && <View style={styles.innerIndicator} />}
                                </View>
                                <Text style={styles.optionText}>{option.options}</Text>

                                {option.user_answer && (
                                    <Text style={styles.answerMessage}>
                                        {option.is_correct === 'Y' ? "Correct" : "Incorrect"}
                                    </Text>
                                )}

                            </View>
                        ))}
                    </View>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    questionContainer: {
        borderColor: '#ccc',
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#e0e0e0',

    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        padding: 10
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    optionIndicator: {
        height: 19,
        width: 19,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,

    },
    innerIndicator: {
        height: 10,
        width: 10,
        borderRadius: 7,
        backgroundColor: '#000',
    },
    optionText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
        padding: 5,
        marginHorizontal: 15
    },
    answerMessage: {
        marginLeft: 10,
        color: 'green',
    },
});

export default ViewResultAnswer;

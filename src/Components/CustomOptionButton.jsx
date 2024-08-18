import { View, Text, Pressable } from 'react-native'
import React from 'react'

const CustomOptionButton = props => {
    return (
        <View style={{ width: props.width || '100%', padding: props.padding ,marginLeft:props.marginLeft || '0%' }}>
            {!!props?.label && <Text>{props?.label}</Text>}
            <Pressable onPress={props.onPress} style={{
                borderRadius: 5,
                padding: 10,
                backgroundColor: props.disabled ? '#8c8c8c' : '#007ac2',
                alignItems: 'center',
                opacity: props.disabled ? 0.6 : 1,
                margin:10
                
            }}
            disabled={props.disabled}>
                <Text style={{
                    fontSize: 16,
                    color: '#fff',
                    textAlign: 'center',
                    fontWeight: '700',
                    letterSpacing: 2,
                }}>{props?.title}</Text>
            </Pressable>
        </View>
    )
}

export default CustomOptionButton;

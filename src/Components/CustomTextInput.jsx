import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Mail from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Entypo';
import Eye from 'react-native-vector-icons/Entypo';
import EyeWithLine from 'react-native-vector-icons/Entypo';
import Colors from '../utils/Colors';
import styles from '../ComponentsStyles/customtextinputstyle';
import {useIsFocused} from '@react-navigation/native';
const CustomTextInput = props => {
  // console.log('custom textinput',props )
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [textInputFocused, setTextInputFocused] = useState(false);
  const isFocused = useIsFocused();
  const textInputRef = useRef();

  const blurFunctionHandle = () => {
    if (props.email) {
      if (props.password) {
        setTextInputFocused(true);
        return;
      } else {
        setTextInputFocused(false);
      }
    } else {
      setTextInputFocused(false);
    }
  };

  useEffect(() => {
    if (!isFocused) {
      textInputRef.current.value = '';
    }
  }, [isFocused]);

  return (
    <View
      style={[
        styles.outerContainer,
        {
          height: props?.description ? '20%' : null,
          right:
            props?.description ||
            props?.name ||
            props?.manualName ||
            props?.temporaryParam == 'temporaryParam'
              ? '5%'
              : null,
        },
      ]}>
      <View
        style={[
          styles.innerContainer,
          {height: props?.description || props?.temporaryParam ? 100 : null},
        ]}>
        <Icon
          name={
            props.emailTextInput == 'Email'
              ? 'mail'
              : props?.name == 'name'
              ? null
              : props?.description == 'description'
              ? null
              : props?.manualName
              ? null
              : props?.temporaryParam == 'temporaryParam'
              ? null
              : props?.InviteUser
              ? null
              : 'lock'
          }
          color={Colors.black}
          size={25}
          style={[{right: props?.position}, styles.emailOrLockIcon]}
        />
        <View
          style={[
            {
              borderColor: textInputFocused
                ? Colors.activeTextInputColor
                : Colors.grey,
              width:
                props?.name ||
                props?.description ||
                props?.manualName ||
                props?.temporaryParam == 'temporaryParam'
                  ? '96%'
                  : props?.InviteUser ? '1300%'
                  : '80%',

              height: '100%',
              bottom: props?.InviteUser? '20%' : null,
              borderRadius: 5,
              position: props?.InviteUser ? 'absolute' : null
            },
            styles.textInputContainer,
          ]}>
          {textInputFocused && (
            <View style={{position: 'absolute'}}>
              <Text
                style={{
                  color: textInputFocused
                    ? Colors.activeTextInputColor
                    : Colors.grey,
                  bottom: 10,
                  left: 20,
                  backgroundColor: 'white',
                }}>
                {props.emailTextInput == 'Email'
                  ? 'Email'
                  : props.changePassword == 'Old Password'
                  ? 'Old Password'
                  : props.changePassword == 'New Password'
                  ? 'New Password'
                  : props.changePassword == 'Confirm Password'
                  ? 'Confirm Password'
                  : props.name == 'name'
                  ? 'Manual Name'
                  : props.description == 'description'
                  ? 'Manual Description'
                  : props.manualName
                  ? 'Manual Name'
                  : props.temporaryParam
                  ? 'Manual Description'
                  : props?.InviteUser
                  ? 'Invite User'
                  : 'Password'}
              </Text>
            </View>
          )}

          {props.email && (
            <View style={{position: 'absolute'}}>
              <Text
                style={{
                  color: textInputFocused
                    ? Colors.activeTextInputColor
                    : Colors.grey,
                  bottom: 10,
                  left: 20,
                  backgroundColor: 'white',
                }}>
                {props.emailTextInput == 'Email' ? 'Email' : 'Password'}
              </Text>
            </View>
          )}

          {props.password && (
            <View style={{position: 'absolute'}}>
              <Text
                style={{
                  color: textInputFocused
                    ? Colors.activeTextInputColor
                    : Colors.grey,
                  bottom: 10,
                  left: 20,
                  backgroundColor: 'white',
                }}>
                {props.emailTextInput == 'Email' ? 'Email' : 'Password'}
              </Text>
            </View>
          )}
          <TextInput
            ref={textInputRef}
            placeholder={
              textInputFocused
                ? ''
                : props.emailTextInput == 'Email'
                ? 'Email'
                : props.changePassword == 'Old Password'
                ? 'Old Password'
                : props.changePassword == 'New Password'
                ? 'New Password'
                : props.changePassword == 'Confirm Password'
                ? 'Confirm Password'
                : props.name == 'name'
                ? 'Manual Name'
                : props.description == 'description'
                ? 'Manual Description'
                : props.temporaryParam
                ? 'Manual Description'
                : props.InviteUser
                ? 'Invite User'
                : 'Password'
            }
            value={
              props.emailTextInput
                ? props.email
                : props?.name
                ? props?.manualName
                : props?.description
                ? props?.manualDescription
                : props?.manualName
                ? props?.manualName
                : props?.temporaryParam
                ? props?.manualDescription
                : props?.InviteUser ? props?.inviteUser
                : props.password
            }
            secureTextEntry={passwordVisible ? true : false}
            multiline={props.description == 'description' ? true : false}
            style={[
              styles.textInput,
              {
                position:
                  props.description || props?.temporaryParam
                    ? 'absolute'
                    : null,
              },
            ]}
            onChangeText={text => {
              props.emailTextInput
                ? props.setEmail(text)
                : props.changePassword == 'Old Password'
                ? props.setPassword(text)
                : props.changePassword == 'New Password'
                ? props.setPassword(text)
                : props.changePassword == 'Confirm Password'
                ? props.setPassword(text)
                : props.name == 'name'
                ? props.setManualName(text)
                : props.description == 'description'
                ? props.setManualDescription(text)
                : props.manualName
                ? props?.setUpdatedManualName(text)
                : props?.temporaryParam
                ? props?.setUpdatedManualDescription(text)
                : props?.InviteUser ? props?.setInviteUser(text)
                : props.setPassword(text);
            }}
            onFocus={() => setTextInputFocused(true)}
            onBlur={() => blurFunctionHandle()}
          />
          {props.passwordTextInput && (
            <TouchableOpacity
              style={styles.passwordEyeContainer}
              onPress={() => setPasswordVisible(!passwordVisible)}>
              <Eye
                name={passwordVisible ? 'eye' : 'eye-with-line'}
                size={25}
                color={Colors.black}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomTextInput;

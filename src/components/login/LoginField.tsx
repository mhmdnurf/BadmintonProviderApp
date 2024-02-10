import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

interface LoginField {
  onPress: () => void;
  emailValue: string;
  passwordValue: string;
  onChangeTextEmail: (text: string) => void;
  onChangeTextPassword: (text: string) => void;
}

const LoginField = ({
  onPress,
  emailValue,
  passwordValue,
  onChangeTextEmail,
  onChangeTextPassword,
}: LoginField) => {
  return (
    <>
      <View>
        <InputField
          placeholder="Email"
          secureTextEntry={false}
          value={emailValue}
          onChangeText={onChangeTextEmail}
        />
        <InputField
          placeholder="Password"
          secureTextEntry={true}
          value={passwordValue}
          onChangeText={onChangeTextPassword}
        />
        <Pressable onPress={onPress}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </Pressable>
      </View>
    </>
  );
};

export default LoginField;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 2,
    borderColor: '#EEEDEB',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#AAC8A7',
    fontSize: 12,
  },
});

import React from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput} from 'react-native';

interface InputField {
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string | undefined;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
}

const InputField = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  editable,
  keyboardType = 'default',
  maxLength,
}: InputField) => {
  return (
    <>
      <TextInput
        style={styles.inputField}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexGrow: 1,
  },
});

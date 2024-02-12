import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

const ProfileField = () => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField value="Pedry" editable={false} />
        <Text style={styles.label}>Jenis Kelamin</Text>
        <InputField value="Laki-Laki" editable={false} />
        <Text style={styles.label}>Email</Text>
        <InputField value="zaldebarenz@gmail.com" editable={false} />
        <Text style={styles.label}>Nomor HP</Text>
        <InputField value="083801310191" editable={false} />
      </View>
    </>
  );
};

export default ProfileField;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

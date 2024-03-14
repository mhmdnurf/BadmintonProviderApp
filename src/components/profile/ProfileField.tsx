import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

interface ProfileField {
  fullName: string;
  jenisKelamin: string;
  email: string;
  nomor: string;
  status: string;
}

const ProfileField = ({
  fullName,
  jenisKelamin,
  email,
  nomor,
  status,
}: ProfileField) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField value={fullName} editable={false} />
        <Text style={styles.label}>Jenis Kelamin</Text>
        <InputField value={jenisKelamin} editable={false} />
        <Text style={styles.label}>Email</Text>
        <InputField value={email} editable={false} />
        <Text style={styles.label}>Nomor HP</Text>
        <InputField value={nomor} editable={false} />
        <Text style={styles.label}>Status GOR</Text>
        <InputField value={status} editable={false} />
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
    fontFamily: 'Poppins Regular',
    color: '#000000',
  },
});

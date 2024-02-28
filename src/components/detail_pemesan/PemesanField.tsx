import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';

const PemesanField = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField placeholder="Nama Lengkap" />
        <Text style={styles.label}>Nomor Telepon</Text>
        <InputField placeholder="Nomor Telepon" />
        <Text style={styles.label}>Durasi</Text>
        <InputField placeholder="Durasi" />
        <Pressable style={styles.btnHapus} onPress={() => console.log('ok')}>
          <Text style={styles.btnText}>Hapus</Text>
        </Pressable>
      </View>
    </>
  );
};

export default PemesanField;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnHapus: {
    backgroundColor: '#FD4949',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

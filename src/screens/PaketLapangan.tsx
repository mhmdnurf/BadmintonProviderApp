import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import InputField from '../components/InputField';

const PaketLapangan = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <View style={styles.container}>
          <Header title="Paket Lapangan" marginBottom={40} />
          <Text style={styles.label}>Harga Paket Lapangan (2 jam)</Text>
          <InputField placeholder="Harga Lapangan" />
          <Pressable style={styles.btnContainer}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </View>
      </RootContainer>
    </>
  );
};

export default PaketLapangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#41444B',
  },
  btnContainer: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
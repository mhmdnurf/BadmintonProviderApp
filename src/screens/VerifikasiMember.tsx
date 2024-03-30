import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';

const VerifikasiMember = () => {
  return (
    <>
      <View style={styles.container}>
        <Header title="Verifikasi Member" />
      </View>
    </>
  );
};

export default VerifikasiMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

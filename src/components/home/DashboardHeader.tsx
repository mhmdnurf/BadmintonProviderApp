import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DashboardHeader {
  fullName: string;
  status: string;
}

const DashboardHeader = ({fullName, status}: DashboardHeader) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Halo, {fullName}</Text>
        <Text style={styles.title}>
          {status === 'Belum Terverifikasi' || status === 'Ditolak'
            ? 'Mohon tunggu hingga akun anda diverifikasi oleh admin'
            : 'Sudah cek pendapatan hari ini?'}
        </Text>
      </View>
    </>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#41444B',
  },
});

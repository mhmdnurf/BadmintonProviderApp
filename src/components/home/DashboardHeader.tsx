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
        <Text style={styles.subTitle}>
          {status === 'Menunggu Aktivasi' ? (
            'Mohon tunggu hingga akun anda diverifikasi oleh admin'
          ) : status === 'Ditolak' ? (
            <Text style={styles.ditolak}>Akun anda ditolak oleh admin</Text>
          ) : (
            'Sudah cek pendapatan hari ini?'
          )}
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
    fontFamily: 'Poppins SemiBold',
    color: '#41444B',
  },
  subTitle: {
    fontSize: 18,
    fontFamily: 'Poppins SemiBold',
    color: '#41444B',
  },
  ditolak: {
    fontSize: 18,
    fontFamily: 'Poppins SemiBold',
    color: '#FF8080',
  },
});

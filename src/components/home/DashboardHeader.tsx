import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DashboardHeader {
  fullName: string;
}

const DashboardHeader = ({fullName}: DashboardHeader) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Halo, {fullName}</Text>
        <Text style={styles.title}>Sudah cek pendapatan hari ini?</Text>
      </View>
    </>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6F7789',
  },
});

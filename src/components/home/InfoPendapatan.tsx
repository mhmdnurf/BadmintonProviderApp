import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface InfoPendapatan {
  pendapatan: number;
}

const InfoPendapatan = ({pendapatan}: InfoPendapatan) => {
  const monthName = new Date().toLocaleString('id-ID', {month: 'long'});
  const year = new Date().getFullYear();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{`Pendapatan ${monthName} ${year}`}</Text>
        <View style={styles.subTitleContainer}>
          <Text style={[styles.subTitle]}>{`Rp. ${pendapatan.toLocaleString(
            'id-ID',
          )}`}</Text>
        </View>
      </View>
    </>
  );
};

export default InfoPendapatan;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#41444B',
  },
  subTitleContainer: {
    marginTop: 10,
    backgroundColor: '#FFB996',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

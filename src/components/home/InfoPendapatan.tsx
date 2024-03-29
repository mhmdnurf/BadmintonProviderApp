import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
          <View style={styles.iconContainer}>
            <Icon name="cash-fast" size={50} color="#40A2E3" />
          </View>
          <Text style={styles.subTitle}>Jumlah Pendapatan</Text>
          <Text
            style={[
              styles.subTitle,
              styles.number,
            ]}>{`Rp. ${pendapatan?.toLocaleString('id-ID')}`}</Text>
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
    fontFamily: 'Poppins SemiBold',
    color: '#41444B',
  },
  subTitleContainer: {
    marginTop: 10,
    backgroundColor: '#40A2E3',
    borderWidth: 3,
    borderColor: '#EEEDEB',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    minHeight: 150,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'Poppins SemiBold',
    color: 'white',
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: 'white',
    width: 60,
    alignItems: 'center',
    borderRadius: 10,
  },
  number: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'Poppins SemiBold',
  },
});

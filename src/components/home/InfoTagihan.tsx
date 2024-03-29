import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InfoTagihan {
  tagihan: number;
}

const InfoTagihan = ({tagihan}: InfoTagihan) => {
  const monthName = new Date().toLocaleString('id-ID', {month: 'long'});
  const year = new Date().getFullYear();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{`Tagihan Admin ${monthName} ${year}`}</Text>
        <View style={styles.subTitleContainer}>
          <View style={styles.iconContainer}>
            <Icon name="card-bulleted" size={50} color="#AAC8A7" />
          </View>
          <Text style={styles.subTitle}>Jumlah Tagihan</Text>
          <Text
            style={[
              styles.subTitle,
              styles.number,
            ]}>{`Rp. ${tagihan?.toLocaleString('id-ID')}`}</Text>
        </View>
      </View>
    </>
  );
};

export default InfoTagihan;

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
    backgroundColor: '#AAC8A7',
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

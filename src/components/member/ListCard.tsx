import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ListCard {
  fullName: string;
  masaAktif: string;
  status: string;
  backgroundColor: string;
}

const ListCard = ({fullName, status, masaAktif, backgroundColor}: ListCard) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Nama Lengkap</Text>
          </View>
          <Text style={styles.title}>{fullName}</Text>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Periode</Text>
          </View>
          <Text style={styles.title}>{masaAktif}</Text>
          <View style={[styles.statusContainer, {backgroundColor}]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardContainer: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#EEEDEB',
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    color: '#4F4F4F',
    fontFamily: 'Poppins Regular',
  },
  mainTitle: {
    fontSize: 18,
    color: '#4F4F4F',
    fontFamily: 'Nunito Bold',
    textAlign: 'center',
  },
  statusContainer: {
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  statusText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins SemiBold',
  },
  headerContainer: {
    backgroundColor: '#F3F3F3',
    padding: 10,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#4F4F4F',
    fontFamily: 'Nunito Bold',
  },
});

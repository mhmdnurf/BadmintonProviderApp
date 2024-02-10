import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

interface TransaksiCard {
  date: string;
  nomorLapangan: number;
  width?: number;
  time: string;
  gor: string;
}

const TransaksiCard = ({
  date,
  nomorLapangan,
  width = Dimensions.get('window').width - 40,
  time,
  gor,
}: TransaksiCard) => {
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, {width}]}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDate}>{date}</Text>
          <Text style={styles.infoJumlah}>
            Lapangan {nomorLapangan} - GOR {gor}
          </Text>
          <Text style={styles.infoJumlah}>{time}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>Selesai</Text>
        </View>
      </View>
    </View>
  );
};

export default TransaksiCard;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    marginStart: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginTop: 15,
    height: 200,
    borderWidth: 3,
    borderColor: '#EEEDEB',
    elevation: 1,
  },
  infoContainer: {
    marginLeft: 16,
    marginTop: 16,
  },
  infoDate: {fontSize: 18, color: '#6F7789', fontWeight: '600'},
  infoJumlah: {fontSize: 16, color: '#6F7789'},
  statusContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#AAC8A7',
    width: 200,
    height: 40,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
  },
  statusText: {color: 'white', fontSize: 16, fontWeight: '600'},
});

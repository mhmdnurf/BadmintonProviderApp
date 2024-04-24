import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

interface Waktu {
  status: string;
  waktuBuka: string;
  waktuTutup: string;
}

const Waktu = ({status, waktuBuka, waktuTutup}: Waktu) => {
  return (
    <>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {status === 'Menunggu Aktivasi' || status === 'Ditolak'
            ? 'Belum Aktif'
            : `${waktuBuka} - ${waktuTutup}`}
        </Text>
      </View>
    </>
  );
};

export default Waktu;

const styles = StyleSheet.create({
  timeContainer: {
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: '#AAC8A7',
    padding: 10,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.9,
  },
  timeText: {
    fontSize: 18,
    fontFamily: 'Poppins SemiBold',
    color: 'white',
    textAlign: 'center',
  },
});

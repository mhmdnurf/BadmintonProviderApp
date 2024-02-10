import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const Waktu = () => {
  return (
    <>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>08.00 - 22.00</Text>
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
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface JadwalItem {
  title: string;
  isBooked: boolean;
  onPress: (booking_uid: string) => () => void;
  booking_uid: string;
}

const JadwalItem = ({title, isBooked, onPress, booking_uid}: JadwalItem) => {
  return (
    <>
      <Pressable
        onPress={onPress(booking_uid)}
        style={[styles.container, isBooked ? styles.booked : {}]}>
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </>
  );
};

export default JadwalItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    marginHorizontal: 2,
  },
  booked: {
    backgroundColor: '#AAC8A7',
  },
  title: {fontSize: 18, color: 'white', fontFamily: 'Nunito Bold'},
});

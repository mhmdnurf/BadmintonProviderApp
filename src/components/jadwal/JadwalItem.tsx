import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface JadwalItem {
  title: string;
  isBooked: boolean;
  onPress: () => void;
}

const JadwalItem = ({title, isBooked, onPress}: JadwalItem) => {
  return (
    <>
      <Pressable
        onPress={onPress}
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
    backgroundColor: '#AAC8A7',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    marginHorizontal: 2,
  },
  booked: {
    backgroundColor: 'grey',
  },
  title: {fontSize: 18, color: 'white', fontFamily: 'Nunito Bold'},
});

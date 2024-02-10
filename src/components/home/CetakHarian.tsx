import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CetakHarian {
  onPress: () => void;
}

const CetakHarian = ({onPress}: CetakHarian) => {
  return (
    <>
      <Pressable style={styles.btnContainer} onPress={onPress}>
        <Text style={styles.btnText}>Cetak Pendapatan Harian</Text>
        <Icon name="printer" size={24} color="white" style={styles.icon} />
      </Pressable>
    </>
  );
};

export default CetakHarian;

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAC8A7',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  icon: {marginLeft: 10},
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NotifikasiCard {
  status: string;
  title: string;
  pesan: string;
  user_uid?: string;
}

const NotifikasiCard = ({status, title, pesan}: NotifikasiCard) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.icon}>
          {status === 'success' ? (
            <Icon name="check" size={20} color="#AAC8A7" />
          ) : (
            <Icon name="close" size={20} color="#FF8080" />
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{pesan}</Text>
      </View>
    </>
  );
};

export default NotifikasiCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins Regular',
  },
  icon: {
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
});

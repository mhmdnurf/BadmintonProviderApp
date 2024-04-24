import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TagihanCard {
  createdAt: string;
  jumlahKomisi: number;
  status: string;
}

const TagihanCard = ({createdAt, jumlahKomisi, status}: TagihanCard) => {
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer]}>
        <View style={styles.icon}>
          <Icon name="text-box-check-outline" size={30} color="#AAC8A7" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoDate}>{createdAt}</Text>
        </View>
        <View>
          <Text style={styles.infoJumlah}>
            Rp.{jumlahKomisi?.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
    </View>
  );
};

export default TagihanCard;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    alignSelf: 'center',
  },
  infoContainer: {
    marginVertical: 20,
  },
  infoDate: {
    fontSize: 20,
    fontFamily: 'Poppins Bold',
    textAlign: 'center',
    color: '#6F7789',
  },
  infoJumlah: {
    fontSize: 32,
    fontFamily: 'Poppins Bold',
    textAlign: 'center',
    color: '#6F7789',
  },
  statusContainer: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#4F6F52',
    marginHorizontal: 20,
  },
  statusText: {
    fontSize: 20,
    fontFamily: 'Poppins Bold',
    textAlign: 'center',
    color: 'white',
  },
  cardContainer: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width - 40,
    borderRadius: 18,
    marginTop: 15,
    height: 200,
    borderWidth: 3,
    borderColor: '#EEEDEB',
    elevation: 1,
  },
  icon: {
    position: 'absolute',
    top: -20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    elevation: 3,
  },
});

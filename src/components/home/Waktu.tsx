import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface Waktu {
  status: string;
}

const Waktu = ({status}: Waktu) => {
  const [waktuBuka, setWaktuBuka] = React.useState('');
  const [waktuTutup, setWaktuTutup] = React.useState('');
  const user = auth().currentUser;
  const fetchWaktu = React.useCallback(async () => {
    const userDocument = await firestore()
      .collection('gor')
      .doc(user?.uid)
      .get();

    const data = userDocument.data();
    setWaktuBuka(data?.waktuBuka);
    setWaktuTutup(data?.waktuTutup);
  }, [user]);

  React.useEffect(() => {
    fetchWaktu();
  }, [fetchWaktu]);
  return (
    <>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {status === 'Belum Terverifikasi' || status === 'Ditolak'
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
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import InputField from '../components/InputField';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface PaketLapangan {
  navigation: any;
}

const PaketLapangan = ({navigation}: PaketLapangan) => {
  const [hargaLapangan, setHargaLapangan] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchHargaLapangan = React.useCallback(async () => {
    const user = auth().currentUser;
    const query = firestore().collection('gor').doc(user?.uid).get();
    query.then(doc => {
      const data = doc.data();
      setHargaLapangan(data?.hargaLapangan);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const user = auth().currentUser;
      const docRef = firestore().collection('gor').doc(user?.uid);

      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        if (data?.status === 'Ditolak') {
          await docRef.update({
            hargaLapangan: hargaLapangan,
            status: 'Menunggu Aktivasi',
          });
        } else {
          await docRef.update({
            hargaLapangan: hargaLapangan,
          });
        }
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };

  React.useEffect(() => {
    fetchHargaLapangan();
  }, [fetchHargaLapangan]);
  return (
    <>
      <RootContainer backgroundColor="white">
        <View style={styles.container}>
          <Header title="Paket Lapangan" marginBottom={40} />
          <Text style={styles.label}>Harga Paket Lapangan (2 jam)</Text>
          <InputField
            placeholder="Harga Lapangan"
            value={hargaLapangan}
            onChangeText={setHargaLapangan}
          />
          <Pressable
            style={({pressed}) => [
              styles.btnContainer,
              {
                backgroundColor: pressed ? '#7F9F80' : '#AAC8A7',
                borderWidth: pressed ? 3 : 0,
                borderColor: pressed ? '#EEEEEE' : '#AAC8A7',
              },
            ]}
            onPress={handleSubmit}>
            {isLoading ? (
              <ActivityIndicator size={25} color="white" />
            ) : (
              <Text style={styles.btnText}>Submit</Text>
            )}
          </Pressable>
        </View>
      </RootContainer>
    </>
  );
};

export default PaketLapangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    color: '#41444B',
    fontFamily: 'Poppins SemiBold',
  },
  btnContainer: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
  },
});

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
interface TambahLapangan {
  navigation: any;
}

const TambahLapangan = ({navigation}: TambahLapangan) => {
  const [jumlahLapangan, setJumlahLapangan] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchJumlahLapangan = React.useCallback(() => {
    const user = auth().currentUser;
    const query = firestore().collection('gor').doc(user?.uid).get();
    query.then(doc => {
      const data = doc.data();
      setJumlahLapangan(data?.jumlahLapangan);
    });
  }, []);

  const handleSubmit = () => {
    try {
      setIsLoading(true);
      const user = auth().currentUser;
      firestore().collection('gor').doc(user?.uid).update({
        jumlahLapangan: jumlahLapangan,
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };

  React.useEffect(() => {
    fetchJumlahLapangan();
  }, [fetchJumlahLapangan]);
  return (
    <>
      <RootContainer backgroundColor="white">
        <View style={styles.container}>
          <Header title="Tambah Lapangan" marginBottom={40} />
          <Text style={styles.label}>Jumlah Lapangan</Text>
          <InputField
            placeholder="Jumlah Lapangan"
            value={jumlahLapangan}
            onChangeText={setJumlahLapangan}
            keyboardType="number-pad"
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

export default TambahLapangan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#41444B',
  },
  btnContainer: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

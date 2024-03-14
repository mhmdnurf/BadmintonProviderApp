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

interface PaketMember {
  navigation: any;
}

const PaketMember = ({navigation}: PaketMember) => {
  const [hargaMember, setHargaMember] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = () => {
    try {
      setIsLoading(true);
      const user = auth().currentUser;
      firestore().collection('users').doc(user?.uid).update({
        hargaMember: hargaMember,
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <View style={styles.container}>
          <Header title="Paket Member" marginBottom={40} />
          <Text style={styles.label}>Harga Paket Member (4 Pertemuan)</Text>
          <InputField
            placeholder="Harga Member"
            value={hargaMember}
            onChangeText={setHargaMember}
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

export default PaketMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins SemiBold',
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
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
  },
});

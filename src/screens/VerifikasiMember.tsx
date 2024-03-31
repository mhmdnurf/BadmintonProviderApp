import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ListVerifikasiMember from '../components/member/ListVerifikasiMember';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';

interface Member {
  id: string;
  namaLengkap: string;
  jumlahPembayaran: string;
  masaAktif: string;
  status: string;
  nomor: string;
  buktiPembayaran: string;
}

interface VerifikasiMember {
  navigation: any;
}

const VerifikasiMember = ({navigation}: VerifikasiMember) => {
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataMember, setDataMember] = React.useState<Member[]>([]);

  const fetchMember = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const user = auth().currentUser;
      const query = await firestore()
        .collection('member')
        .where('gor_uid', '==', user?.uid)
        .get();

      const data: Member[] = [];
      query.forEach(documentSnapshot => {
        data.push({
          id: documentSnapshot.id,
          namaLengkap: documentSnapshot.data().namaLengkap,
          jumlahPembayaran: documentSnapshot.data().jumlahPembayaran,
          masaAktif: documentSnapshot.data().masaAktif,
          status: documentSnapshot.data().status,
          nomor: documentSnapshot.data().nomor,
          buktiPembayaran: documentSnapshot.data().buktiPembayaran,
        });
      });
      setDataMember(data);
    } catch (error) {
      console.log('Error fetching member: ', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      fetchMember();
    }
  }, [fetchMember, isFocused]);

  const onRefresh = () => {
    fetchMember();
  };

  const handleNavigate = () => {
    navigation.navigate('DetailVerifikasiMember', {data: dataMember});
  };
  return (
    <>
      <View style={styles.container}>
        <Header title="Verifikasi Member" />
        <ListVerifikasiMember
          data={dataMember}
          onPress={handleNavigate}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </>
  );
};

export default VerifikasiMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

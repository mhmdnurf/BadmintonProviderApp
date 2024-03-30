import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ListVerifikasiMember from '../components/member/ListVerifikasiMember';

interface VerifikasiMember {
  navigation: any;
}

const VerifikasiMember = ({navigation}: VerifikasiMember) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const data = [
    {
      id: '1',
      namaLengkap: 'Muhammad Iqbal Mubarok',
      hargaMember: 'Rp 200.000',
      masaAktif: 'Maret 2024',
      status: 'Menunggu Aktivasi',
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleNavigate = () => {
    navigation.navigate('DetailVerifikasiMember', {data: data});
  };
  return (
    <>
      <View style={styles.container}>
        <Header title="Verifikasi Member" />
        <ListVerifikasiMember
          data={data}
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

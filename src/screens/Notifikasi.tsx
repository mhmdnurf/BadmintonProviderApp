import React from 'react';
import Header from '../components/Header';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FlatContainer from '../components/FlatContainer';
import NotifikasiCard from '../components/notifikasi/NotifikasiCard';
import BottomSpace from '../components/BottomSpace';

const Notifikasi = () => {
  const data = [
    {
      user_uid: '1',
      title: 'Pembayaran Berhasil',
      pesan: 'Pembayaran untuk lapangan 1 berhasil',
      status: 'success',
    },
    {
      user_uid: '1',
      title: 'Pembayaran Gagal',
      pesan: 'Pembayaran untuk lapangan 1 berhasil',
      status: 'failed',
    },
  ];
  return (
    <FlatContainer backgroundColor="white">
      <Header title="Notifikasi" />
      <View style={styles.container}>
        <Text style={styles.title}>Informasi Terkini</Text>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <NotifikasiCard
              key={index}
              status={item.status}
              title={item.title}
              pesan={item.pesan}
            />
          )}
          ListFooterComponent={<BottomSpace marginBottom={100} />}
        />
      </View>
    </FlatContainer>
  );
};

export default Notifikasi;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins SemiBold',
  },
});

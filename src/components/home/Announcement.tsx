import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface Announcement {
  status: string;
  catatan: string;
  navigation: any;
}

const Announcement = ({status, catatan, navigation}: Announcement) => {
  const handleNavigateEditProfile = () => {
    navigation.navigate('Profile');
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Announcement</Text>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            Selamat datang di aplikasi Badminton Booking App
          </Text>
          {status === 'Menunggu Aktivasi' ? (
            <>
              <Text style={styles.cardText}>
                Selagi menunggu verifikasi akun, silahkan atur terlebih dahulu
                harga paket lapangan dan paket member GOR anda sebagai bagian
                dari verifikasi.
              </Text>
            </>
          ) : status === 'Ditolak' ? (
            <>
              <Text style={styles.cardText}>Catatan Penolakan :</Text>
              <Pressable onPress={handleNavigateEditProfile}>
                <Text style={styles.ditolakText}>{catatan}</Text>
              </Pressable>
            </>
          ) : (
            <Text style={styles.cardText}>
              Setiap transaksi yang dilakukan pemesan lapangan dikenakan biaya
              admin Rp.2500 yang dibebankan kepada pemesan lapangan dan
              diberikan kepada admin sebagai bentuk komisi.
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default Announcement;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#41444B',
    fontFamily: 'Poppins SemiBold',
  },
  cardContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#C7C8CC',
  },
  cardText: {
    fontSize: 16,
    color: '#31363F',
    fontFamily: 'Poppins SemiBold',
    textAlign: 'justify',
  },
  ditolakText: {
    fontSize: 16,
    color: '#FF8080',
    fontFamily: 'Poppins Bold',
    textAlign: 'justify',
    textDecorationLine: 'underline',
  },
});

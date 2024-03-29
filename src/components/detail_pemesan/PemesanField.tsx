import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';
import BottomSpace from '../BottomSpace';
import InAppBrowser from 'react-native-inappbrowser-reborn';

interface DataBooking {
  lamaBermain: string;
  tanggalPemesanan: string;
  waktuBooking: string;
  waktuAkhir: string;
}

interface DataUser {
  namaLengkap: string;
  nomor: string;
}

interface DataPayment {
  buktiPembayaran: string;
}

interface PemesananField {
  dataBooking: DataBooking;
  dataUser: DataUser;
  dataPayment: DataPayment;
}

const PemesanField = ({dataBooking, dataUser, dataPayment}: PemesananField) => {
  console.log(dataPayment);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Hari</Text>
        <InputField
          placeholder="Hari"
          value={new Date(dataBooking.tanggalPemesanan).toLocaleDateString(
            'id-ID',
            {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          )}
        />
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField placeholder="Nama Lengkap" value={dataUser.namaLengkap} />
        <Text style={styles.label}>Nomor Telepon</Text>
        <InputField placeholder="Nomor Telepon" value={dataUser.nomor} />
        <Text style={styles.label}>Durasi</Text>
        <InputField placeholder="Durasi" value={dataBooking.lamaBermain} />
        <Text style={styles.label}>Jam</Text>
        <InputField
          placeholder="Jam"
          value={`${dataBooking.waktuBooking} - ${dataBooking.waktuAkhir}`}
        />
        <Pressable
          style={styles.btnBukti}
          onPress={() => InAppBrowser.open(dataPayment?.buktiPembayaran)}>
          <Text style={styles.btnText}>Bukti Pembayaran</Text>
        </Pressable>
        <Pressable style={styles.btnHapus} onPress={() => console.log('ok')}>
          <Text style={styles.btnText}>Hapus</Text>
        </Pressable>
        <BottomSpace marginBottom={40} />
      </View>
    </>
  );
};

export default PemesanField;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnHapus: {
    backgroundColor: '#FD4949',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnBukti: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

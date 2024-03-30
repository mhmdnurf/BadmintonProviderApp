import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';
import BottomSpace from '../BottomSpace';
import InAppBrowser from 'react-native-inappbrowser-reborn';

interface VerifikasiField {
  onConfirm: () => void;
  onTolak: () => void;
}

const VerifikasiField = ({onConfirm, onTolak}: VerifikasiField) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField placeholder="Nama Lengkap" value="Pedry" />
        <Text style={styles.label}>Nomor Telepon</Text>
        <InputField placeholder="Nomor Telepon" value="083801310191" />
        <Text style={styles.label}>Harga Member</Text>
        <InputField placeholder="Harga Member" value="Rp. 100.000" />
        <Text style={styles.label}>Masa Aktif</Text>
        <InputField placeholder="Masa Aktif" value="Maret 2024" />
        <Text style={styles.label}>Status</Text>
        <InputField placeholder="Status" value="Menunggu Aktivasi" />
        {/* <Pressable
          style={styles.btnBukti}
          onPress={() => InAppBrowser.open(dataPayment?.buktiPembayaran)}>
          <Text style={styles.btnText}>Bukti Pembayaran</Text>
        </Pressable> */}
        <View style={styles.btnRootContainer}>
          <Pressable style={styles.btnConfirm} onPress={onConfirm}>
            <Text style={styles.btnText}>Konfirmasi</Text>
          </Pressable>
          <Pressable style={styles.btnTolak} onPress={onTolak}>
            <Text style={styles.btnText}>Tolak</Text>
          </Pressable>
        </View>
        <BottomSpace marginBottom={40} />
      </View>
    </>
  );
};

export default VerifikasiField;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnTolak: {
    backgroundColor: '#FD4949',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '48%',
  },
  btnConfirm: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '48%',
  },
  btnBukti: {
    backgroundColor: '#9BB0C1',
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
  btnRootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

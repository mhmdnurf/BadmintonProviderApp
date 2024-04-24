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
  status: string;
  metodePembayaran: string;
}

interface PemesananField {
  dataBooking: DataBooking;
  dataUser: DataUser;
  dataPayment: DataPayment;
  onConfirm: () => void;
  onTolak: () => void;
}

const PemesanField = ({
  dataBooking,
  dataUser,
  dataPayment,
  onConfirm,
  onTolak,
}: PemesananField) => {
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
          editable={false}
        />
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField
          placeholder="Nama Lengkap"
          value={dataUser.namaLengkap}
          editable={false}
        />
        <Text style={styles.label}>Nomor Telepon</Text>
        <InputField
          placeholder="Nomor Telepon"
          value={dataUser.nomor}
          editable={false}
        />
        <Text style={styles.label}>Durasi</Text>
        <InputField
          placeholder="Durasi"
          value={dataBooking.lamaBermain}
          editable={false}
        />
        <Text style={styles.label}>Jam</Text>
        <InputField
          placeholder="Jam"
          value={`${dataBooking.waktuBooking} - ${dataBooking.waktuAkhir}`}
          editable={false}
        />
        <Text style={styles.label}>Metode Pembayaran</Text>
        <InputField
          placeholder="Metode Pembayaran"
          value={dataPayment?.metodePembayaran}
          editable={false}
        />
        <Text style={styles.label}>Status</Text>
        <InputField
          placeholder="Status"
          value={dataPayment?.status}
          editable={false}
        />
        {dataPayment?.metodePembayaran !== 'member' ? (
          <>
            <Pressable
              style={styles.btnBukti}
              onPress={() => InAppBrowser.open(dataPayment?.buktiPembayaran)}>
              <Text style={styles.btnText}>Bukti Pembayaran</Text>
            </Pressable>
            {dataPayment?.status !== 'Selesai' &&
            dataPayment?.status !== 'Ditolak' ? (
              <>
                <View style={styles.btnRootContainer}>
                  <Pressable style={styles.btnConfirm} onPress={onConfirm}>
                    <Text style={styles.btnText}>Konfirmasi</Text>
                  </Pressable>
                  <Pressable style={styles.btnTolak} onPress={onTolak}>
                    <Text style={styles.btnText}>Tolak</Text>
                  </Pressable>
                </View>
              </>
            ) : null}
          </>
        ) : null}
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
    fontFamily: 'Poppins SemiBold',
    color: '#6F7789',
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
    fontFamily: 'Poppins SemiBold',
  },
  btnRootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

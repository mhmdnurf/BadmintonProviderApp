import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import PemesanField from '../components/detail_pemesan/PemesanField';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator, Alert} from 'react-native';

interface DetailPemesan {
  route: any;
  navigation: any;
}

const DetailPemesan = ({route, navigation}: DetailPemesan) => {
  const {booking_uid} = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataBooking, setDataBooking] = React.useState<any>({});
  const [dataUser, setDataUser] = React.useState<any>({});
  const [dataPayment, setDataPayment] = React.useState<any>({});
  const [dataGOR, setDataGOR] = React.useState<any>({});

  const fetchGOR = React.useCallback(async () => {
    try {
      const query = await firestore()
        .collection('gor')
        .doc(dataBooking.gor_uid)
        .get();
      setDataGOR(query.data());
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, [dataBooking.gor_uid]);
  const fetchBooked = React.useCallback(async () => {
    try {
      const query = await firestore()
        .collection('booking')
        .doc(booking_uid)
        .get();
      setDataBooking(query.data());
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  }, [booking_uid]);

  const fetchUser = React.useCallback(async () => {
    try {
      const query = await firestore()
        .collection('users')
        .doc(dataBooking.user_uid)
        .get();
      setDataUser(query.data());
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, [dataBooking.user_uid]);

  const fetchPayment = React.useCallback(async () => {
    try {
      const query = await firestore()
        .collection('payment')
        .doc(dataBooking.booking_uid)
        .get();
      setDataPayment(query.data());
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, [dataBooking.booking_uid]);

  React.useEffect(() => {
    fetchBooked();
  }, [fetchBooked]);

  React.useEffect(() => {
    if (dataBooking.user_uid) {
      fetchUser();
    }
  }, [dataBooking.user_uid, fetchUser]);

  React.useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  React.useEffect(() => {
    if (dataBooking.gor_uid) {
      fetchGOR();
    }
  }, [dataBooking.gor_uid, fetchGOR]);

  const handleConfirmRequest = async () => {
    setIsLoading(true);
    try {
      const id = dataBooking.booking_uid;
      await firestore().collection('booking').doc(id).update({
        status: 'Selesai',
      });
      await firestore().collection('payment').doc(id).update({
        status: 'Selesai',
      });

      const date = new Date();
      const monthYear =
        date.toLocaleString('default', {month: 'long'}) +
        date.getFullYear().toString();
      const komisiRef = firestore()
        .collection('komisi')
        .doc(dataBooking.gor_uid)
        .collection('periode')
        .doc(monthYear);

      firestore()
        .runTransaction(async transaction => {
          const doc = await transaction.get(komisiRef);

          if (doc.exists) {
            transaction.update(komisiRef, {
              jumlahKomisi: firestore.FieldValue.increment(2500),
            });
          } else {
            transaction.set(komisiRef, {
              gor_uid: dataBooking.gor_uid,
              createdAt: firestore.FieldValue.serverTimestamp(),
              jumlahKomisi: 2500,
            });
          }
        })
        .catch(error => {
          console.log('Transaction failed for komisi: ', error);
        });

      const pendapatanRef = firestore()
        .collection('pendapatan')
        .doc(dataBooking.gor_uid)
        .collection('periode')
        .doc(monthYear);

      firestore()
        .runTransaction(async transaction => {
          const doc = await transaction.get(pendapatanRef);

          if (doc.exists) {
            transaction.update(pendapatanRef, {
              jumlahPendapatan: firestore.FieldValue.increment(
                dataBooking.harga,
              ),
            });
          } else {
            transaction.set(pendapatanRef, {
              gor_uid: dataBooking.gor_uid,
              createdAt: firestore.FieldValue.serverTimestamp(),
              jumlahPendapatan: dataBooking.harga,
            });
          }
        })
        .catch(error => {
          console.log('Transaction failed for pendapatan: ', error);
        });

      const totalKomisiRef = firestore()
        .collection('totalKomisi')
        .doc(monthYear);

      firestore()
        .runTransaction(async transaction => {
          const doc = await transaction.get(totalKomisiRef);

          if (doc.exists) {
            transaction.update(totalKomisiRef, {
              totalKomisi: firestore.FieldValue.increment(2500),
              status: 'Belum Lunas',
            });
          } else {
            transaction.set(totalKomisiRef, {
              createdAt: firestore.FieldValue.serverTimestamp(),
              totalKomisi: 2500,
              status: 'Belum Lunas',
            });
          }
        })
        .catch(error => {
          console.log('Transaction failed for pendapatan: ', error);
        });
      console.log('Data berhasil diupdate', {
        status: 'Terverifikasi',
      });

      const notifikasiQuery = firestore().collection('notifikasi');
      await notifikasiQuery.add({
        user_uid: dataBooking.user_uid,
        title: 'Pembayaran Berhasil',
        status: 'success',
        message: `Pemesanan anda di lapangan ${dataBooking.lapangan} - ${dataGOR.namaGOR} telah disetujui oleh Pemilik GOR. Silahkan cek status pemesanan anda di aplikasi.`,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };

  const handleTolakRequest = async () => {
    setIsLoading(true);
    try {
      const id = dataBooking.booking_uid;
      await firestore()
        .collection('booking')
        .doc(id)
        .update({
          status: 'Pending',
          expiredAt: firestore.Timestamp.fromDate(
            new Date(Date.now() + 30 * 60 * 1000),
          ),
        });

      await firestore().collection('payment').doc(id).update({
        status: 'Ditolak',
      });

      console.log('Data berhasil diupdate', {
        status: 'Ditolak',
      });
      const notifikasiQuery = firestore().collection('notifikasi');
      await notifikasiQuery.add({
        user_uid: dataBooking.user_uid,
        title: 'Pembayaran Gagal',
        status: 'failed',
        message: `Pemesanan anda di lapangan ${dataBooking.lapangan} - ${dataGOR.namaGOR} telah ditolak oleh Pemilik GOR. Jika anda yakin ini kesalahan, silahkan hubungi nomor Pemilik GOR di aplikasi.`,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };

  const handleConfirm = async () => {
    try {
      Alert.alert(
        'Data akan diverifikasi!',
        'Apakah anda yakin untuk setujui?',
        [
          {
            text: 'Confirm',
            onPress: handleConfirmRequest,
          },
          {
            text: 'Batal',
            style: 'cancel',
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleTolak = async () => {
    try {
      Alert.alert(
        'Data akan diverifikasi!',
        'Apakah anda yakin untuk menolak?',
        [
          {
            text: 'Confirm',
            onPress: handleTolakRequest,
          },
          {
            text: 'Batal',
            onPress: () => console.log('Batal'),
            style: 'cancel',
          },
        ],
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Pemesan" />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Header title={`Lapangan ${dataBooking.lapangan}`} />
            <PemesanField
              dataBooking={dataBooking}
              dataUser={dataUser}
              dataPayment={dataPayment}
              onConfirm={handleConfirm}
              onTolak={handleTolak}
            />
          </>
        )}
      </RootContainer>
    </>
  );
};

export default DetailPemesan;

import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import {ActivityIndicator, Alert} from 'react-native';
import VerifikasiField from '../components/member/VerifikasiField';
import firestore from '@react-native-firebase/firestore';

interface DetailVerifikasiMember {
  route: any;
  navigation: any;
}

const DetailVerifikasiMember = ({
  route,
  navigation,
}: DetailVerifikasiMember) => {
  const {data} = route.params;
  console.log(data);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmRequest = async () => {
    setIsLoading(true);
    try {
      await firestore()
        .collection('member')
        .doc(data[0].id)
        .update({
          status: 'Aktif',
          kuota: firestore.FieldValue.increment(4),
        });

      await firestore().collection('notifikasi').add({
        title: 'Pemberitahuan Aktivasi Member',
        pesan: 'Member anda berhasil diaktivasi oleh pemilik GOR',
        createdAt: firestore.FieldValue.serverTimestamp(),
        user_uid: data[0].user_uid,
        status: 'success',
      });
      Alert.alert('Persetujuan berhasil', 'Member berhasil diaktivasi');
    } catch (error) {
      console.log('Error confirming member: ', error);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };

  const handleTolakRequest = async () => {
    setIsLoading(true);
    try {
      const docRef = firestore().collection('member').doc(data[0].id);
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        const memberData = docSnapshot.data();
        if (memberData?.status !== 'Aktif' || memberData?.kuotaLapangan === 0) {
          await docRef.update({
            status: 'Tidak Aktif',
          });

          await firestore().collection('notifikasi').add({
            title: 'Pemberitahuan Aktivasi Member',
            pesan:
              'Member anda ditolak untuk diaktivasi oleh pemilik, jika ini adalah kesalahan, silahkan hubungi pemilik GOR',
            createdAt: firestore.FieldValue.serverTimestamp(),
            user_uid: data[0].user_uid,
            status: 'failed',
          });
        }
      }
      Alert.alert(
        'Penolakan berhasil',
        'Member berhasil ditolak untuk diaktivasi/perbarui',
      );
    } catch (error) {
      console.log('Error rejecting member: ', error);
    } finally {
      setIsLoading(false);
      navigation.goBack();
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
        <Header title="Detail Member" />
        <>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
          <VerifikasiField
            onConfirm={handleConfirm}
            onTolak={handleTolak}
            data={data}
          />
        </>
      </RootContainer>
    </>
  );
};

export default DetailVerifikasiMember;

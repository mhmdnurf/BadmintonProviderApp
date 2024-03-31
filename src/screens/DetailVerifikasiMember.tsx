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
  const [isLoading, setIsLoading] = React.useState(false);

  const handleConfirmRequest = async () => {
    setIsLoading(true);
    try {
      await firestore().collection('member').doc(data[0].id).update({
        status: 'Aktif',
      });
    } catch (error) {
      console.log('Error confirming member: ', error);
    } finally {
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };

  const handleTolakRequest = async () => {
    setIsLoading(true);
    try {
      await firestore().collection('member').doc(data[0].id).update({
        status: 'Tidak Aktif',
      });
    } catch (error) {
      console.log('Error rejecting member: ', error);
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

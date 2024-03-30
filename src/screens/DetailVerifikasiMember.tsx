import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import {ActivityIndicator, Alert} from 'react-native';
import VerifikasiField from '../components/member/VerifikasiField';

interface DetailVerifikasiMember {
  route: any;
  navigation: any;
}

const DetailVerifikasiMember = ({
  route,
  navigation,
}: DetailVerifikasiMember) => {
  const {booking_uid} = route.params;
  const [isLoading, setIsLoading] = React.useState(true);

  const handleConfirmRequest = async () => {};

  const handleTolakRequest = async () => {};

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
        {/* {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : ( */}
        <>
          <VerifikasiField onConfirm={handleConfirm} onTolak={handleTolak} />
        </>
        {/* )} */}
      </RootContainer>
    </>
  );
};

export default DetailVerifikasiMember;

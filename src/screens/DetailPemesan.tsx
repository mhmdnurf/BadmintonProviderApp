import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import PemesanField from '../components/detail_pemesan/PemesanField';
import firestore from '@react-native-firebase/firestore';
import {ActivityIndicator} from 'react-native';

interface DetailPemesan {
  route: any;
}

const DetailPemesan = ({route}: DetailPemesan) => {
  const {booking_uid} = route.params;
  const [isLoading, setIsLoading] = React.useState(true);
  const [dataBooking, setDataBooking] = React.useState<any>({});
  const [dataUser, setDataUser] = React.useState<any>({});
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

  React.useEffect(() => {
    fetchBooked();
  }, [fetchBooked]);

  React.useEffect(() => {
    if (dataBooking.user_uid) {
      fetchUser();
    }
  }, [dataBooking.user_uid, fetchUser]);
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Pemesan" />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Header title={`Lapangan ${dataBooking.lapangan}`} />
            <PemesanField dataBooking={dataBooking} dataUser={dataUser} />
          </>
        )}
      </RootContainer>
    </>
  );
};

export default DetailPemesan;

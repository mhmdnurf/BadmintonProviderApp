import React from 'react';
import RootContainer from '../components/RootContainer';
import HeaderContainer from '../components/home/HeaderContainer';
import Header from '../components/Header';
import DashboardHeader from '../components/home/DashboardHeader';
import Waktu from '../components/home/Waktu';
import InfoPendapatan from '../components/home/InfoPendapatan';
import Navbar from '../components/nav/Navbar';
import ContentHeader from '../components/home/ContentHeader';
import BottomSpace from '../components/BottomSpace';
import InfoTagihan from '../components/home/InfoTagihan';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {StatusBar} from 'react-native';

interface Home {
  navigation: any;
}

const Home = ({navigation}: Home) => {
  const [fullName, setFullName] = React.useState('');
  const [status, setStatus] = React.useState('');
  const user = auth().currentUser;
  const getUser = React.useCallback(async () => {
    const userDocument = await firestore()
      .collection('users')
      .doc(user?.uid)
      .get();

    const data = userDocument.data();
    setFullName(data?.namaLengkap);
    setStatus(data?.status);
  }, [user]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <RootContainer backgroundColor="white">
        <HeaderContainer>
          <Header title="Dashboard" marginBottom={40} />
          <DashboardHeader fullName={fullName} status={status} />
          <Waktu status={status} />
          <ContentHeader title="Overview" />
          <Navbar navigation={navigation} />
          <InfoPendapatan pendapatan={1000000} />
          <InfoTagihan tagihan={500000} />
        </HeaderContainer>
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Home;

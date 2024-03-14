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
import Announcement from '../components/home/Announcement';
import {useIsFocused} from '@react-navigation/native';

interface Home {
  navigation: any;
}

const Home = ({navigation}: Home) => {
  const isFocused = useIsFocused();
  const [fullName, setFullName] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const user = auth().currentUser;
  const fetchData = React.useCallback(async () => {
    setRefreshing(true);
    const userDocPromise = firestore().collection('users').doc(user?.uid).get();
    const gorDocPromise = firestore().collection('gor').doc(user?.uid).get();

    const [userDocument, gorDocument] = await Promise.all([
      userDocPromise,
      gorDocPromise,
    ]);

    const userData = userDocument.data();
    const gorData = gorDocument.data();

    setFullName(userData?.namaLengkap);
    setStatus(gorData?.status);
    setRefreshing(false);
  }, [user]);

  React.useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [fetchData, isFocused]);
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <RootContainer
        backgroundColor="white"
        refreshing={refreshing}
        onRefresh={fetchData}>
        <HeaderContainer>
          <Header title="Dashboard" marginBottom={40} />
          <DashboardHeader fullName={fullName} status={status} />
          <Waktu status={status} />
          <Announcement status={status} />
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

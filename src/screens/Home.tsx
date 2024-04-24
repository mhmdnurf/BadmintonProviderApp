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
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Announcement from '../components/home/Announcement';
import {useIsFocused} from '@react-navigation/native';

interface Home {
  navigation: any;
}

const Home = ({navigation}: Home) => {
  const isFocused = useIsFocused();
  const [fullName, setFullName] = React.useState('');
  const [catatan, setCatatan] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [dataAdmin, setDataAdmin] = React.useState<any>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tagihan, setTagihan] = React.useState<any>({});
  const [pendapatan, setPendapatan] = React.useState<any>({});
  const [dataGOR, setDataGOR] = React.useState({} as any);
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
    setCatatan(gorData?.catatan);
    setDataGOR(gorData);
    setRefreshing(false);
  }, [user]);

  const fetchTagihan = React.useCallback(async () => {
    const date = new Date();
    const monthYear =
      date.toLocaleString('default', {month: 'long'}) +
      date.getFullYear().toString();
    const tagihanDoc = await firestore()
      .collection('komisi')
      .doc(user?.uid)
      .collection('periode')
      .doc(monthYear)
      .get();

    if (tagihanDoc.exists) {
      console.log('Document data:', tagihanDoc.data());
      setTagihan(tagihanDoc.data());
    } else {
      console.log('No such document!');
    }
    const tagihanData = tagihanDoc.data();
    console.log(tagihanData);
  }, [user]);

  const fetchPendapatan = React.useCallback(async () => {
    const date = new Date();
    const monthYear =
      date.toLocaleString('default', {month: 'long'}) +
      date.getFullYear().toString();
    const pendapatanDoc = await firestore()
      .collection('pendapatan')
      .doc(user?.uid)
      .collection('periode')
      .doc(monthYear)
      .get();

    if (pendapatanDoc.exists) {
      console.log('Document data:', pendapatanDoc.data());
      setPendapatan(pendapatanDoc.data());
    } else {
      console.log('No such document!');
    }
  }, [user]);

  const fetchAdmin = React.useCallback(async () => {
    try {
      const query = firestore()
        .collection('users')
        .where('role', '==', 'admin');
      const querySnapshot = await query.get();
      const tempData: any = [];
      querySnapshot.forEach(doc => {
        tempData.push(doc.data());
      });
      setDataAdmin(tempData);
    } catch (error) {}
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      fetchData();
      fetchTagihan();
      fetchPendapatan();
      fetchAdmin();
    }
  }, [fetchData, isFocused, fetchTagihan, fetchPendapatan, fetchAdmin]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    fetchTagihan();
    fetchPendapatan();
    fetchAdmin();
    setRefreshing(false);
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <RootContainer
        backgroundColor="white"
        refreshing={refreshing}
        onRefresh={onRefresh}>
        <HeaderContainer>
          <Header title="Dashboard" marginBottom={40} />
          <DashboardHeader fullName={fullName} status={status} />
          <Waktu
            status={status}
            waktuBuka={dataGOR?.waktuBuka}
            waktuTutup={dataGOR?.waktuTutup}
          />
          <Announcement
            status={status}
            catatan={catatan}
            navigation={navigation}
          />
          <ContentHeader title="Overview" />
          <Navbar navigation={navigation} />
          <InfoPendapatan
            pendapatan={
              pendapatan.jumlahPendapatan ? pendapatan.jumlahPendapatan : 0
            }
          />
          <InfoTagihan
            tagihan={tagihan.jumlahKomisi ? tagihan.jumlahKomisi : 0}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Contact Support</Text>
            {dataAdmin.map((item: any, index: number) => (
              <View key={index} style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>{item.email}</Text>
              </View>
            ))}
            {dataAdmin.map((item: any, index: number) => (
              <View key={index} style={styles.subTitleContainer}>
                <Text style={styles.subTitle}>{item.nomor}</Text>
              </View>
            ))}
          </View>
        </HeaderContainer>
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    color: '#41444B',
    fontFamily: 'Poppins SemiBold',
  },
  subTitleContainer: {
    backgroundColor: '#003C43',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins SemiBold',
  },
});

import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import ImageProfile from '../components/profile/ImageProfile';
import BottomSpace from '../components/BottomSpace';
import ProfileField from '../components/profile/ProfileField';
import RiwayatButton from '../components/profile/RiwayatButton';
import LogoutButton from '../components/profile/LogoutButton';
import EditButton from '../components/profile/EditButton';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import TagihanButton from '../components/tagihan/TagihanButton';

interface Profile {
  navigation: any;
}

const Profile = ({navigation}: Profile) => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = React.useState<any>({});
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchUser = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        const data = userDoc.data();

        const gorDoc = await firestore().collection('gor').doc(user.uid).get();

        const gorData = gorDoc.data();

        setUserData({...data, status: gorData?.status});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const handleNavigateRiwayat = () => {
    navigation.navigate('Rekapitulasi');
  };

  const handleLogout = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        await AsyncStorage.removeItem('userToken');
        console.log('Logout');
        navigation.replace('Login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToEditProfile = () => {
    navigation.navigate('EditProfile', {
      data: userData,
    });
  };

  const handleNavigateDaftarTagihan = () => {
    navigation.navigate('DaftarTagihan');
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchUser();
    }
  }, [fetchUser, isFocused]);
  return (
    <>
      <RootContainer
        backgroundColor="white"
        refreshing={refreshing}
        onRefresh={fetchUser}>
        <Header title="Profile" />
        <ImageProfile uri={userData.fotoUser} />
        <EditButton onPress={handleNavigateToEditProfile} />
        <ProfileField
          fullName={userData.namaLengkap}
          jenisKelamin={userData.jenisKelamin}
          email={userData.email}
          nomor={userData.nomor}
          status={userData.status}
        />
        <TagihanButton onPress={handleNavigateDaftarTagihan} />
        <RiwayatButton onPress={handleNavigateRiwayat} />
        <LogoutButton onPress={handleLogout} />
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Profile;

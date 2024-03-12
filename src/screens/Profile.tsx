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

interface Profile {
  navigation: any;
}

const Profile = ({navigation}: Profile) => {
  const [userData, setUserData] = React.useState<any>({});
  const fetchUser = React.useCallback(async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        const data = userDoc.data();
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
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
    console.log('Edit Profile');
  };

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <>
      <RootContainer backgroundColor="white">
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
        <RiwayatButton onPress={handleNavigateRiwayat} />
        <LogoutButton onPress={handleLogout} />
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Profile;

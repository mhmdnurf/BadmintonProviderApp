import React from 'react';
import {Alert, StatusBar, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import Logo from '../assets/svg/login.svg';
import LoginButton from '../components/login/LoginButton';
import Footer from '../components/Footer';
import LoginField from '../components/login/LoginField';
import RootContainer from '../components/RootContainer';
import BottomSpace from '../components/BottomSpace';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Login {
  navigation: any;
}

const Login = ({navigation}: Login) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    if (!email || !password) {
      setIsLoading(false);
      Alert.alert('Login gagal', 'Email dan password tidak boleh kosong');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const userDoc = firestore()
        .collection('users')
        .doc(userCredential.user.uid);

      const docSnapshot = await userDoc.get();

      if (docSnapshot.exists) {
        const userData = docSnapshot.data();

        const userRole = userData?.role;
        if (userRole === 'provider') {
          const userToken = userCredential.user.uid;
          await AsyncStorage.setItem('userToken', userToken);
          navigation.replace('Home');
        } else {
          Alert.alert(
            'Login gagal',
            'Akun yang digunakan bukan akun pemilik GOR',
          );
        }
      }
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      if (e.code === 'auth/invalid-email') {
        Alert.alert('Login gagal', 'Format email tidak valid');
      } else if (e.code === 'auth/user-disabled') {
        Alert.alert('Login gagal', 'Pengguna ini telah dinonaktifkan');
      } else if (e.code === 'auth/user-not-found') {
        Alert.alert('Login gagal', 'Pengguna tidak ditemukan');
      } else if (e.code === 'auth/wrong-password') {
        Alert.alert('Login gagal', 'Password salah');
      } else if (e.code === 'auth/network-request-failed') {
        Alert.alert('Login gagal', 'Tidak ada koneksi internet');
      } else if (e.code === 'auth/invalid-credential') {
        Alert.alert('Login gagal', 'Email atau password tidak valid');
      } else {
        Alert.alert('Login gagal', 'Terjadi kesalahan');
      }
      return;
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgot = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <>
      <RootContainer backgroundColor="white">
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <Header title="Login" />
        <View style={styles.svgContainer}>
          <Logo width={300} height={300} />
        </View>
        <View style={styles.loginFieldContainer}>
          <Text style={styles.loginTitle}>
            Silahkan login dengan akun pemilik
          </Text>
          <LoginField
            onPress={handleForgot}
            emailValue={email}
            passwordValue={password}
            onChangeTextEmail={setEmail}
            onChangeTextPassword={setPassword}
          />
          <LoginButton onPress={handleLogin} isLoading={isLoading} />
          <Footer
            title="Belum punya akun?"
            subTitle="Register"
            onPress={handleRegister}
          />
        </View>
        <BottomSpace marginBottom={40} />
      </RootContainer>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  svgContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  loginFieldContainer: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  loginTitle: {
    fontSize: 18,
    fontFamily: 'Poppins SemiBold',
    color: '#6F7789',
  },
});

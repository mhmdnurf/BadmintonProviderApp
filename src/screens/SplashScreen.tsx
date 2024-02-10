import React from 'react';

import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Logo from '../assets/svg/splash_screen.svg';

interface SplashScreen {
  navigation: any;
}

const SplashScreen = ({navigation}: SplashScreen) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#AAC8A7" />
      <View style={styles.container}>
        <Logo width={300} height={300} />
        <Text style={styles.title}>Badminton Providers App</Text>
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Gelanggan Olahraga Badminton</Text>
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AAC8A7',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 20,
    color: 'white',
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
  },
  subTitleContainer: {
    marginTop: 10,
  },
});

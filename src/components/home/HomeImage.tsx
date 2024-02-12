import React from 'react';
import Image from '../../assets/svg/home.svg';
import {StyleSheet, View} from 'react-native';

const HomeImage = () => {
  return (
    <View style={styles.container}>
      <Image width={200} height={200} />
    </View>
  );
};

export default HomeImage;

const styles = StyleSheet.create({
  container: {alignSelf: 'center', marginTop: 20},
});

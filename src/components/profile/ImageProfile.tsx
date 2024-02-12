import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const ImageProfile = () => {
  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/img/user.jpg')}
          style={styles.image}
        />
      </View>
    </>
  );
};

export default ImageProfile;

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 40,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 200,
    borderWidth: 10,
    borderColor: '#AAC8A7',
    resizeMode: 'cover',
  },
});

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface Footer {
  onPress: () => void;
  title: string;
  subTitle: string;
}

const Footer = ({onPress, title, subTitle}: Footer) => {
  return (
    <>
      <View style={styles.footerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onPress}>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {color: '#6F7789'},
  subTitle: {color: '#AAC8A7', marginLeft: 5},
});

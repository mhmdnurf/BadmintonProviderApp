import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Header {
  title: string;
  marginBottom?: number;
}

const Header = ({title, marginBottom = 0}: Header) => {
  return (
    <>
      <View style={[styles.headerContainer, {marginBottom}]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 50,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Poppins SemiBold',
    color: '#41444B',
  },
});

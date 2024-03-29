import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ContentHeader {
  title: string;
  marginTop?: number;
}

const ContentHeader = ({title, marginTop}: ContentHeader) => {
  return (
    <>
      <View style={[styles.titleContainer, {marginTop}]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
};

export default ContentHeader;

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    color: '#41444B',
    fontFamily: 'Poppins SemiBold',
  },
});

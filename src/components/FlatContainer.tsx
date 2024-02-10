import React from 'react';
import {StyleSheet, View} from 'react-native';

interface FlatContainer {
  children: React.ReactElement | React.ReactElement[];
  backgroundColor: string;
}

const FlatContainer = ({children, backgroundColor}: FlatContainer) => {
  return (
    <>
      <View style={[styles.container, {backgroundColor}]}>{children}</View>
    </>
  );
};

export default FlatContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

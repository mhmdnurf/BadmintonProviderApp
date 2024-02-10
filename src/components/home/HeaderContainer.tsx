import React from 'react';
import {StyleSheet, View} from 'react-native';

interface HeaderContainer {
  children: React.ReactElement | React.ReactElement[];
}

const HeaderContainer = ({children}: HeaderContainer) => {
  return (
    <>
      <View style={styles.container}>{children}</View>
    </>
  );
};

export default HeaderContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 20,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
  },
});

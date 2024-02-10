import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

interface RootContainer {
  children: React.ReactElement | React.ReactElement[];
  backgroundColor: string;
}

const RootContainer = ({children, backgroundColor}: RootContainer) => {
  return (
    <>
      <ScrollView
        style={[styles.container, {backgroundColor}]}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </>
  );
};

export default RootContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

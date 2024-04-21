import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

interface ModalLoader {
  isLoading: boolean;
}

const ModalLoader = ({isLoading}: ModalLoader) => {
  return (
    <>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={isLoading}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <ActivityIndicator size="large" color="#AAC8A7" />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  wrapper: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

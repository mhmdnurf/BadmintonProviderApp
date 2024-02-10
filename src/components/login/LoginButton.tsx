import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface LoginButton {
  onPress: () => void;
}

const LoginButton = ({onPress}: LoginButton) => {
  return (
    <>
      <View style={styles.btnContainer}>
        <Pressable onPress={onPress}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
      </View>
    </>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  btnContainer: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 15,
    width: '100%',
    backgroundColor: '#AAC8A7',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },
});

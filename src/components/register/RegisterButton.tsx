import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface RegisterButton {
  onPress: () => void;
}

const RegisterButton = ({onPress}: RegisterButton) => {
  return (
    <>
      <View style={styles.btnContainer}>
        <Pressable onPress={onPress}>
          <Text style={styles.btnText}>Register</Text>
        </Pressable>
      </View>
    </>
  );
};

export default RegisterButton;

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

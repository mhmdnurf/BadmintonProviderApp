import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface LogoutButton {
  onPress: () => void;
}

const LogoutButton = ({onPress}: LogoutButton) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>Logout</Text>
        </Pressable>
      </View>
    </>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  btnContainer: {
    alignSelf: 'center',
    marginTop: 10,
    padding: 15,
    width: '100%',
    backgroundColor: '#FD4949',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
    color: 'white',
  },
});

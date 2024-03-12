import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface LoginButton {
  onPress: () => void;
  isLoading: boolean;
}

const LoginButton = ({onPress, isLoading}: LoginButton) => {
  return (
    <>
      <View>
        <Pressable
          onPress={onPress}
          style={({pressed}) => [
            styles.btnContainer,
            {
              backgroundColor: pressed ? '#7F9F80' : '#AAC8A7',
              borderWidth: pressed ? 3 : 0,
              borderColor: pressed ? '#EEEEEE' : '#AAC8A7',
            },
          ]}>
          {isLoading ? (
            <ActivityIndicator size={25} color="white" />
          ) : (
            <Text style={styles.btnText}>Login</Text>
          )}
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
    borderRadius: 15,
  },
  btnColor: {
    backgroundColor: '#AAC8A7',
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
    color: 'white',
  },
});

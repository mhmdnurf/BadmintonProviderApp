import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface RegisterButton {
  onPress: () => void;
  isLoading: boolean;
}

const RegisterButton = ({onPress, isLoading}: RegisterButton) => {
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
            <Text style={styles.btnText}>Register</Text>
          )}
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

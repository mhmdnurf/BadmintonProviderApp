import React from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';

interface SubmitButton {
  onPress: () => void;
  isLoading: boolean;
}

const SubmitButton = ({onPress, isLoading}: SubmitButton) => {
  return (
    <>
      <Pressable
        style={({pressed}) => [
          styles.container,
          {
            borderWidth: pressed ? 4 : 0,
            borderColor: pressed ? '#EEEEEE' : '#AAC8A7',
          },
        ]}
        onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <Text style={styles.text}>Submit</Text>
        )}
      </Pressable>
    </>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#AAC8A7',
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins SemiBold',
    fontSize: 16,
  },
});

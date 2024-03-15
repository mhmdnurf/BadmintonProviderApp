import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface SubmitButton {
  onPress: () => void;
}

const SubmitButton = ({onPress}: SubmitButton) => {
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
        <Text style={styles.text}>Submit</Text>
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

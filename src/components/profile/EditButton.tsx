import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface EditButton {
  onPress: () => void;
}

const EditButton = ({onPress}: EditButton) => {
  return (
    <>
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.text}>Edit Profile</Text>
      </Pressable>
    </>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#B4B4B8',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

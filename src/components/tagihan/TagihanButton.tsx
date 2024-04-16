import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface TagihanButton {
  onPress: () => void;
}

const TagihanButton = ({onPress}: TagihanButton) => {
  return (
    <>
      <View style={styles.container}>
        <Pressable style={styles.btnContainer} onPress={onPress}>
          <Text style={styles.btnText}>Daftar Tagihan</Text>
        </Pressable>
      </View>
    </>
  );
};

export default TagihanButton;

const styles = StyleSheet.create({
  container: {marginHorizontal: 20},
  btnContainer: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 15,
    width: '100%',
    backgroundColor: '#9AC8CD',
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins SemiBold',
    color: 'white',
  },
});

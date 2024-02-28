import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

interface OverviewCard {
  title: string;
  informasi: string;
  btnText: string;
  onPress: any;
  iconName: string;
  backgroundColor: string;
}

const OverviewCard = ({
  title,
  informasi,
  btnText,
  onPress,
  iconName,
  backgroundColor,
}: OverviewCard) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.iconContainer, {backgroundColor}]}>
          <Icon name={iconName} size={50} color="white" style={styles.icon} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{informasi}</Text>
        <View style={styles.btnContainer}>
          <Pressable
            style={[styles.btnTambah, {backgroundColor}]}
            onPress={() => navigation.navigate(onPress)}>
            <Text style={styles.btnText}>{btnText}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default OverviewCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 225,
    height: 250,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#EEEDEB',
    elevation: 5,
    marginRight: 20,
  },
  title: {
    color: '#41444B',
    fontWeight: '600',
    fontSize: 20,
  },
  subTitle: {
    color: '#6F7789',
    fontSize: 18,
    marginVertical: 5,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  btnTambah: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  iconContainer: {
    backgroundColor: '#AAC8A7',
    borderRadius: 10,
    width: 60,
    marginBottom: 20,
  },
  icon: {
    textAlign: 'center',
    padding: 5,
  },
});

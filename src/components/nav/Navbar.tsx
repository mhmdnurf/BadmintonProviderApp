import React from 'react';
import OverviewCard from './OverviewCard';
import {FlatList, StyleSheet, View} from 'react-native';
const Navbar = () => {
  const data = [
    {
      id: 1,
      title: 'Jumlah Lapangan',
      informasi: '5',
      btnText: 'Edit',
      onPress: 'TambahLapangan',
      iconName: 'soccer-field',
      backgroundColor: '#AAC8A7',
    },
    {
      id: 2,
      title: 'Paket Lapangan',
      informasi: '60000',
      btnText: 'Edit',
      onPress: 'PaketLapangan',
      iconName: 'currency-usd',
      backgroundColor: '#80BCBD',
    },
    {
      id: 3,
      title: 'Paket Member',
      informasi: '100000',
      btnText: 'Edit',
      onPress: 'PaketMember',
      iconName: 'card-account-details-star-outline',
      backgroundColor: '#FFCF96',
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <OverviewCard
              title={item.title}
              informasi={item.informasi}
              btnText={item.btnText}
              onPress={item.onPress}
              iconName={item.iconName}
              backgroundColor={item.backgroundColor}
            />
          )}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
});
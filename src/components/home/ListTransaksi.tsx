import React from 'react';
import {FlatList} from 'react-native';
import TransaksiCard from './TransaksiCard';

interface TransaksiData {
  id: string;
  date: string;
  nomorLapangan: number;
  gor: string;
  time: string;
}

interface ListTransaksi {
  data: TransaksiData[];
}

const ListTransaksi = ({data}: ListTransaksi) => {
  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TransaksiCard
            date={item.date}
            nomorLapangan={item.nomorLapangan}
            gor={item.gor}
            time={item.time}
          />
        )}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default ListTransaksi;

import React from 'react';
import {FlatList, Pressable, RefreshControl} from 'react-native';
import TagihanCard from './TagihanCard';

interface Data {
  createdAt: string;
  jumlahKomisi: number;
  status: string;
}

interface ListTagihan {
  data: Data[];
  refreshing: boolean;
  onRefresh: () => void;
  onPress: () => void;
}

const ListTagihan = ({data, refreshing, onRefresh, onPress}: ListTagihan) => {
  return (
    <>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item, index}) => (
          <Pressable onPress={onPress}>
            <TagihanCard
              key={index}
              createdAt={item.createdAt}
              jumlahKomisi={item.jumlahKomisi}
              status={item.status}
            />
          </Pressable>
        )}
      />
    </>
  );
};

export default ListTagihan;

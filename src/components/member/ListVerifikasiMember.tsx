import React from 'react';
import {Pressable, RefreshControl} from 'react-native';
import ListCard from './ListCard';
import {FlatList} from 'react-native-gesture-handler';

interface ListVerifikasiData {
  id: string;
  namaLengkap: string;
  jumlahPembayaran: string;
  masaAktif: string;
  status: string;
}

interface ListVerifikasiMember {
  data: ListVerifikasiData[];
  onPress: () => void;
  refreshing: boolean;
  onRefresh: () => void;
}

const ListVerifikasiMember = ({
  data,
  onPress,
  refreshing,
  onRefresh,
}: ListVerifikasiMember) => {
  return (
    <>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item, index}) => (
          <Pressable onPress={onPress}>
            <ListCard
              key={index}
              fullName={item.namaLengkap}
              status={item.status}
              masaAktif={item.masaAktif}
              backgroundColor={
                item.status === 'Aktif'
                  ? '#AAC8A7'
                  : item.status === 'Menunggu Aktivasi'
                  ? '#FFBB70'
                  : '#F3A0A2'
              }
            />
          </Pressable>
        )}
      />
    </>
  );
};

export default ListVerifikasiMember;

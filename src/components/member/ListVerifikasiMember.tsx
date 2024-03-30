import React from 'react';
import {Pressable, RefreshControl} from 'react-native';
import ListCard from './ListCard';
import {FlatList} from 'react-native-gesture-handler';

interface ListVerifikasiData {
  id: string;
  namaLengkap: string;
  hargaMember: string;
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
        renderItem={({item}) => (
          <Pressable onPress={onPress}>
            <ListCard
              fullName={item.namaLengkap}
              status={item.status}
              masaAktif={item.masaAktif}
              backgroundColor={'#FF8080'}
            />
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

export default ListVerifikasiMember;

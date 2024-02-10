import React from 'react';
import {FlatList} from 'react-native';
import ContentHeader from './ContentHeader';
import LapanganCard from './LapanganCard';

interface GorData {
  id: string;
  namaGOR: string;
  jumlahLapangan: number;
  imageSource: any;
}

interface DaftarGor {
  data: GorData[];
}

const DaftarGor = ({data}: DaftarGor) => {
  return (
    <>
      {/* Lapangan Start */}
      <ContentHeader title="Daftar Gelanggang Olahraga" />
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <LapanganCard
            imageSource={item.imageSource}
            namaGOR={item.namaGOR}
            jumlahLapangan={item.jumlahLapangan}
          />
        )}
        keyExtractor={item => item.id}
        horizontal={true}
      />
      {/* Lapangan End */}
    </>
  );
};

export default DaftarGor;

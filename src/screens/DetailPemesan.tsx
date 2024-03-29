import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import PemesanField from '../components/detail_pemesan/PemesanField';

interface DetailPemesan {
  route: any;
}

const DetailPemesan = ({route}: DetailPemesan) => {
  const {id} = route.params;
  console.log(id);
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Pemesan" />
        <Header title="Lapangan 5" />
        <PemesanField />
      </RootContainer>
    </>
  );
};

export default DetailPemesan;

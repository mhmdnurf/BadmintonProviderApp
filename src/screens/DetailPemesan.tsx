import React from 'react';
import Header from '../components/Header';
import RootContainer from '../components/RootContainer';
import PemesanField from '../components/detail_pemesan/PemesanField';

const DetailPemesan = () => {
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

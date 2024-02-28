import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import RekapField from '../components/rekapitulasi/RekapField';

const Rekapitulasi = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Rekapitulasi Data" />
        <RekapField />
      </RootContainer>
    </>
  );
};

export default Rekapitulasi;

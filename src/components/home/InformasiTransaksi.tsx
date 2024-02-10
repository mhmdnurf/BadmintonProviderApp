import React from 'react';
import ContentHeader from './ContentHeader';
import ListTransaksi from './ListTransaksi';

const InformasiTransaksi = () => {
  const data = [
    {
      id: '1',
      date: 'Selasa, 12 Februari 2024',
      nomorLapangan: 1,
      gor: 'Chans',
      time: '17.00 - 19.00',
    },
    {
      id: '2',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 2,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
    {
      id: '3',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 5,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
    {
      id: '4',
      date: 'Rabu, 13 Februari 2024',
      nomorLapangan: 1,
      gor: 'Mahakam',
      time: '18.00 - 20.00',
    },
  ];
  return (
    <>
      <ContentHeader title="Informasi Pemesanan" marginTop={20} />
      <ListTransaksi data={data} />
    </>
  );
};

export default InformasiTransaksi;

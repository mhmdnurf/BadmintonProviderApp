import React from 'react';
import {Text} from 'react-native';

interface DetailTagihan {
  route: any;
}

const DetailTagihan = ({route}: DetailTagihan) => {
  const {data} = route.params;
  console.log('Data: ', data);
  return (
    <>
      <Text>Detail Tagihan</Text>
    </>
  );
};

export default DetailTagihan;

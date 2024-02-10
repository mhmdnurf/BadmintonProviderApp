import React from 'react';
import RootContainer from '../components/RootContainer';
import HeaderContainer from '../components/home/HeaderContainer';
import Header from '../components/Header';
import DashboardHeader from '../components/home/DashboardHeader';
import Waktu from '../components/home/Waktu';
import CetakHarian from '../components/home/CetakHarian';

const Home = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <HeaderContainer>
          <Header title="Dashboard" />
          <DashboardHeader fullName="Pedry" />
          <Waktu />
          <CetakHarian onPress={() => console.log('Cetak Harian')} />
        </HeaderContainer>
      </RootContainer>
    </>
  );
};

export default Home;

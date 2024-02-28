import React from 'react';
import RootContainer from '../components/RootContainer';
import HeaderContainer from '../components/home/HeaderContainer';
import Header from '../components/Header';
import DashboardHeader from '../components/home/DashboardHeader';
import Waktu from '../components/home/Waktu';
import CetakHarian from '../components/home/CetakHarian';
import InfoPendapatan from '../components/home/InfoPendapatan';
import Navbar from '../components/nav/Navbar';
import ContentHeader from '../components/home/ContentHeader';
import BottomSpace from '../components/BottomSpace';

const Home = () => {
  return (
    <>
      <RootContainer backgroundColor="white">
        <HeaderContainer>
          <Header title="Dashboard" marginBottom={40} />
          <DashboardHeader fullName="Pedry" />
          <Waktu />
          <ContentHeader title="Overview" />
          <Navbar />
          <InfoPendapatan pendapatan={1000000} />
          {/* <CetakHarian onPress={() => console.log('Cetak Harian')} /> */}
        </HeaderContainer>
        <BottomSpace marginBottom={100} />
      </RootContainer>
    </>
  );
};

export default Home;

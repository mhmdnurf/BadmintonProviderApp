import React from 'react';
import OverviewCard from './OverviewCard';
import {ScrollView, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

interface Navbar {
  navigation: any;
}

const Navbar = ({navigation}: Navbar) => {
  const isFocused = useIsFocused();
  const [jumlahLapangan, setJumlahLapangan] = React.useState('');
  const [hargaLapangan, setHargaLapangan] = React.useState('');
  const [hargaMember, setHargaMember] = React.useState('');
  const user = auth().currentUser;

  const fetchData = React.useCallback(async () => {
    const userDocument = await firestore()
      .collection('gor')
      .doc(user?.uid)
      .get();

    const data = userDocument.data();
    setJumlahLapangan(data?.jumlahLapangan);
    setHargaLapangan(data?.hargaLapangan);
    setHargaMember(data?.hargaMember);
  }, [user]);

  React.useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [fetchData, isFocused]);
  return (
    <>
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <OverviewCard
          title="Jumlah Lapangan"
          informasi={jumlahLapangan}
          btnText="Edit"
          onPress={() => navigation.navigate('TambahLapangan')}
          iconName="soccer-field"
          backgroundColor="#AAC8A7"
        />
        <OverviewCard
          title="Paket Lapangan"
          informasi={hargaLapangan ? hargaLapangan : 'Belum diatur'}
          btnText="Edit"
          onPress={() => navigation.navigate('PaketLapangan')}
          iconName="currency-usd"
          backgroundColor="#80BCBD"
        />
        <OverviewCard
          title="Paket Member"
          informasi={hargaMember ? hargaMember : 'Belum diatur'}
          btnText="Edit"
          onPress={() => navigation.navigate('PaketMember')}
          iconName="card-account-details-star-outline"
          backgroundColor="#FFCF96"
        />
      </ScrollView>
    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
  },
});

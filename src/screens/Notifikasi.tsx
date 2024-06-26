import React from 'react';
import Header from '../components/Header';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FlatContainer from '../components/FlatContainer';
import NotifikasiCard from '../components/notifikasi/NotifikasiCard';
import BottomSpace from '../components/BottomSpace';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type Data = {
  status: string;
  title: string;
  pesan: string;
  booking_uid: string;
};

interface Notifikasi {
  navigation: any;
}

const Notifikasi = ({navigation}: Notifikasi) => {
  const [data, setData] = React.useState<Data[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchNotifikasi = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const user = auth().currentUser;
      const query = await firestore()
        .collection('notifikasi')
        .where('user_uid', '==', user?.uid)
        .orderBy('createdAt', 'desc')
        .get();
      const tempData: Data[] = [];
      query.forEach(doc => {
        tempData.push(doc.data() as Data);
      });
      setData(tempData);
      console.log(tempData);
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchNotifikasi();
  }, [fetchNotifikasi]);

  const handleNavigateDetailPemesanan = (id: string) => {
    navigation.navigate('DetailPemesan', {
      booking_uid: id,
    });
  };

  return (
    <FlatContainer backgroundColor="white">
      <Header title="Notifikasi" />
      <View style={styles.container}>
        <Text style={styles.title}>Informasi Terkini</Text>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchNotifikasi}
            />
          }
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => (
            <Pressable
              onPress={() =>
                item.booking_uid
                  ? handleNavigateDetailPemesanan(item.booking_uid)
                  : null
              }>
              <NotifikasiCard
                key={index}
                status={item.status}
                title={item.title}
                pesan={item.pesan}
              />
            </Pressable>
          )}
          ListFooterComponent={<BottomSpace marginBottom={300} />}
        />
      </View>
    </FlatContainer>
  );
};

export default Notifikasi;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins SemiBold',
  },
});

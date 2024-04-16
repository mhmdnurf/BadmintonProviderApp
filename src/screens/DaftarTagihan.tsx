import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import ListTagihan from '../components/tagihan/ListTagihan';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface DaftarTagihan {
  navigation: any;
}

const DaftarTagihan = ({navigation}: DaftarTagihan) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState<any[]>([]);

  const fetchTagihan = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const userUid = auth().currentUser?.uid;
      console.log('User UID: ', userUid);
      const periodeQuery = await firestore()
        .collection('komisi')
        .doc(userUid)
        .collection('periode')
        .get();

      const dataTagihan = periodeQuery.docs.map(doc => {
        const docData = doc.data();
        // Convert Timestamp to Date
        if (docData.createdAt) {
          const date = docData.createdAt.toDate();
          docData.createdAt = date.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          });
        }
        return docData;
      });
      setData(dataTagihan);
      console.log('Data Tagihan: ', dataTagihan[0].createdAt);
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchTagihan();
  }, [fetchTagihan]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTagihan();
    setRefreshing(false);
  };

  const handleDetailTagihan = () => {
    navigation.navigate('DetailTagihan', {
      data: data,
    });
  };
  return (
    <>
      <View style={styles.container}>
        <Header title="Daftar Tagihan" />
        <ListTagihan
          data={data}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPress={handleDetailTagihan}
        />
      </View>
    </>
  );
};

export default DaftarTagihan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
});

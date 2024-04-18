import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../components/InputField';
import firestore from '@react-native-firebase/firestore';
import BottomSpace from '../components/BottomSpace';

interface DetailTagihan {
  route: any;
}

interface Admin {
  fullName: string;
  noRek: string;
  namaBank: string;
}

const DetailTagihan = ({route}: DetailTagihan) => {
  const {data} = route.params;
  const [dataAdmin, setDataAdmin] = React.useState<Admin[]>([]);
  const fetchAdmin = React.useCallback(async () => {
    const query = await firestore()
      .collection('users')
      .where('role', '==', 'admin')
      .get();
    const admin = query.docs.map(doc => doc.data() as Admin);
    setDataAdmin(admin);
  }, []);

  React.useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Detail Tagihan" />
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Periode</Text>
          <InputField value={data[0].createdAt} editable={false} />
          <Text style={styles.label}>Jumlah Tagihan</Text>
          <InputField
            value={`Rp. ${data[0].jumlahKomisi.toLocaleString()}`}
            editable={false}
          />
          <Text style={styles.label}>Status</Text>
          <InputField value={data[0].status} editable={false} />
          <Text style={styles.label}>Nama Rekening Admin</Text>
          <InputField value={dataAdmin[0]?.fullName} editable={false} />
          <Text style={styles.label}>Nomor Rekening Admin</Text>
          <InputField value={dataAdmin[0]?.noRek} editable={false} />
          <Text style={styles.label}>Nama Bank</Text>
          <InputField value={dataAdmin[0]?.namaBank} editable={false} />
          <Pressable style={styles.btnContainer}>
            <Text style={styles.btnText}>Upload Bukti Pelunasan</Text>
          </Pressable>
        </View>
        <BottomSpace marginBottom={80} />
      </RootContainer>
    </>
  );
};

export default DetailTagihan;

const styles = StyleSheet.create({
  fieldContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins SemiBold',
    marginVertical: 5,
  },
  btnContainer: {
    backgroundColor: '#AAC8A7',
    marginTop: 15,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    padding: 15,
    fontSize: 14,
    fontFamily: 'Poppins SemiBold',
  },
});

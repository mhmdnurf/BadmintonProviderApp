import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../components/InputField';
import firestore from '@react-native-firebase/firestore';
import BottomSpace from '../components/BottomSpace';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Pdf from 'react-native-pdf';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ModalLoader from '../components/ModalLoader';

interface DetailTagihan {
  route: any;
  navigation: any;
}

type buktiPembayaran = {
  data: string;
  type: string | null;
  uri: string;
  name: string | null;
};

interface Admin {
  fullName: string;
  noRek: string;
  namaBank: string;
}

const DetailTagihan = ({route, navigation}: DetailTagihan) => {
  const {data} = route.params;
  console.log('Data: ', data[0].periode);
  const [dataAdmin, setDataAdmin] = React.useState<Admin[]>([]);
  const [buktiPembayaran, setBuktiPembayaran] = React.useState(
    {} as buktiPembayaran,
  );

  const [isLoading, setIsLoading] = React.useState(false);

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

  const uploadFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      const selectedFile = res.uri;
      const selectedFileName = res.name;
      const fileType = res.type;

      const fileData = await RNFS.readFile(selectedFile, 'base64');

      setBuktiPembayaran({
        data: `data:${fileType};base64,${fileData}`,
        type: fileType,
        uri: selectedFile,
        name: selectedFileName,
      });

      console.log('Selected file: ', selectedFile);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Canceled');
      } else {
        throw error;
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let buktiPembayaranURL = '';
      const user = auth().currentUser;
      if (!buktiPembayaran || Object.keys(buktiPembayaran).length === 0) {
        Alert.alert(
          'Upload bukti pembayaran terlebih dahulu',
          'Bukti Pembayaran tidak boleh kosong',
        );
        setIsLoading(false);
        return;
      }

      const buktiPembayaranFileName = `buktiPembayaran/${
        user?.uid
      }/buktiPembayaran${user?.uid}/${new Date().getTime()}`;
      const buktiPembayaranReference = storage().ref(buktiPembayaranFileName);

      const buktiPembayaranFilePath = `${RNFS.DocumentDirectoryPath}/${buktiPembayaran}`;
      await RNFS.copyFile(buktiPembayaran.uri, buktiPembayaranFilePath);
      const buktiPembayaranBlob = await RNFS.readFile(
        buktiPembayaranFilePath,
        'base64',
      );

      await buktiPembayaranReference.putString(buktiPembayaranBlob, 'base64');
      buktiPembayaranURL = await buktiPembayaranReference.getDownloadURL();

      const query = firestore().collection('komisi').doc(user?.uid);
      await query.collection('periode').doc(data[0]?.periode).update({
        buktiPembayaran: buktiPembayaranURL,
        status: 'Menunggu Konfirmasi',
      });
      console.log('query', query);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };
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
          {buktiPembayaran?.type &&
            buktiPembayaran?.type.startsWith('image/') && (
              <View style={styles.fileContainer}>
                <Image
                  source={{uri: buktiPembayaran.data}}
                  style={styles.image}
                />
              </View>
            )}
          {buktiPembayaran?.type &&
            buktiPembayaran?.type === 'application/pdf' && (
              <View style={styles.fileContainer}>
                <Pdf source={{uri: buktiPembayaran.data}} style={styles.pdf} />
              </View>
            )}
          <Pressable style={styles.btnContainer} onPress={uploadFile}>
            <Text style={styles.btnText}>Upload Bukti Pelunasan</Text>
          </Pressable>
          <Pressable style={styles.submitContainer} onPress={handleSubmit}>
            <Text style={styles.btnText}>Submit</Text>
          </Pressable>
        </View>
        <ModalLoader isLoading={isLoading} />
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
    backgroundColor: '#B4B4B8',
    marginTop: 15,
    borderRadius: 10,
  },
  submitContainer: {
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
  fileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {width: 200, height: 200, resizeMode: 'contain'},
  pdf: {width: 200, height: 200},
});

import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import DocumentPicker from 'react-native-document-picker';
import EditField from '../components/profile/EditField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface EditProfile {
  route: any;
  navigation: any;
}

type DocumentPick = {
  uri: string;
  name: string;
};

type DataGOR = {
  fotoGOR: string;
  suratIzin: string;
  status: string;
};

const EditProfile = ({route, navigation}: EditProfile) => {
  const {data} = route.params;
  const [namaLengkap, setNamaLengkap] = React.useState(data?.namaLengkap || '');
  const [nomor, setNomor] = React.useState(data?.nomor || '');
  const [suratIzin, setSuratIzin] = React.useState<DocumentPick>();
  const [fotoGOR, setFotoGOR] = React.useState<DocumentPick>();
  const [dataGOR, setDataGOR] = React.useState({} as DataGOR);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchDataGOR = React.useCallback(async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const gorDoc = await firestore().collection('gor').doc(user.uid).get();
        const gorData = gorDoc.data();
        setDataGOR({
          fotoGOR: gorData?.fotoGOR,
          suratIzin: gorData?.suratIzin,
          status: gorData?.status,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    const user = auth().currentUser;
    try {
      const finalSuratIzin = suratIzin ?? dataGOR.suratIzin;
      const finalFotoGOR = fotoGOR ?? dataGOR.fotoGOR;

      const query = firestore().collection('gor').doc(user?.uid);
      query.update({
        namaLengkap,
        nomor,
        fotoGOR: finalFotoGOR,
        suratIzin: finalSuratIzin,
        status: 'Menunggu Aktivasi',
      });

      console.log('Data berhasil diupdate');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      navigation.goBack();
    }
  };

  const handleUploadSuratIzin = async () => {
    console.log('Upload Surat Izin');
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const selectedFile = res.uri;
      const selectedFileName = res.name;

      if (selectedFileName && selectedFile) {
        setSuratIzin({uri: selectedFile, name: selectedFileName});
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.info(error);
      } else {
        throw error;
      }
    }
  };

  const handleUploadFotoGOR = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const selectedFile = res.uri;
      const selectedFileName = res.name;

      if (selectedFileName && selectedFile) {
        setFotoGOR({uri: selectedFile, name: selectedFileName});
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.info(error);
      } else {
        throw error;
      }
    }
  };

  React.useEffect(() => {
    fetchDataGOR();
  }, [fetchDataGOR]);
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Edit Profile" marginBottom={20} />
        <EditField
          fotoGOR={fotoGOR?.name}
          namaLengkap={data?.namaLengkap}
          nomor={data?.nomor}
          suratIzin={suratIzin?.name}
          onPressSuratIzin={handleUploadSuratIzin}
          onPressFotoGOR={handleUploadFotoGOR}
          onPressSubmit={handleSubmit}
          onChangeNamaLengkap={setNamaLengkap}
          onChangeNomor={setNomor}
          isLoading={isLoading}
        />
      </RootContainer>
    </>
  );
};

export default EditProfile;

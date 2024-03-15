import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import DocumentPicker from 'react-native-document-picker';
import EditField from '../components/profile/EditField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface EditProfile {
  fullName: string;
  jenisKelamin: string;
  email: string;
  nomor: string;
  route: any;
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

const EditProfile = ({route}: EditProfile) => {
  const {userData} = route.params;
  const [namaLengkap, setNamaLengkap] = React.useState(
    userData?.namaLengkap || '',
  );
  const [nomor, setNomor] = React.useState(userData?.nomor || '');
  const [suratIzin, setSuratIzin] = React.useState<DocumentPick>();
  const [fotoGOR, setFotoGOR] = React.useState<DocumentPick>();
  const [dataGOR, setDataGOR] = React.useState({} as DataGOR);

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
    const a = 1;

    let selected = a ?? 'default';
    console.log(selected);
    try {
      const finalSuratIzin = suratIzin ?? dataGOR.suratIzin;
      const finalFotoGOR = fotoGOR ?? dataGOR.fotoGOR;

      console.log('Data', {
        namaLengkap,
        nomor,
        suratIzin: finalSuratIzin,
        fotoGOR: finalFotoGOR,
        status: 'Menunggu Aktivasi',
      });
    } catch (error) {
      console.log(error);
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
          namaLengkap={userData?.namaLengkap}
          nomor={userData?.nomor}
          suratIzin={suratIzin?.name}
          onPressSuratIzin={handleUploadSuratIzin}
          onPressFotoGOR={handleUploadFotoGOR}
          onPressSubmit={handleSubmit}
          onChangeNamaLengkap={setNamaLengkap}
          onChangeNomor={setNomor}
        />
      </RootContainer>
    </>
  );
};

export default EditProfile;

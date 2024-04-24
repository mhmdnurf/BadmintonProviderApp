import React from 'react';
import RootContainer from '../components/RootContainer';
import Header from '../components/Header';
import DocumentPicker from 'react-native-document-picker';
import EditField from '../components/profile/EditField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import BottomSpace from '../components/BottomSpace';
import {Alert} from 'react-native';

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
  const [noRek, setNoRek] = React.useState(data?.noRek || '');
  const [namaBank, setNamaBank] = React.useState(data?.namaBank || '');
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

  const handleSubmit = async () => {
    setIsLoading(true);
    const user = auth().currentUser;
    try {
      const finalSuratIzin = suratIzin ?? dataGOR.suratIzin;
      const finalFotoGOR = fotoGOR ?? dataGOR.fotoGOR;

      const docRef = firestore().collection('gor').doc(user?.uid);

      // Check if the 'nomor' already exists in the database
      const nomorSnapshot = await firestore()
        .collection('users')
        .where('nomor', '==', nomor)
        .get();
      if (!nomorSnapshot.empty) {
        // Check if the document with the same 'nomor' is the current user's document
        const isCurrentUserDoc = nomorSnapshot.docs.some(
          doc => doc.id === user?.uid,
        );
        if (!isCurrentUserDoc) {
          Alert.alert('Error', 'Nomor telah terdaftar');
          setIsLoading(false);
          return;
        }
      }

      const rekening = await firestore()
        .collection('users')
        .where('noRek', '==', noRek)
        .get();

      if (!rekening.empty) {
        const isCurrentUserDoc = rekening.docs.some(
          doc => doc.id === user?.uid,
        );
        if (!isCurrentUserDoc) {
          Alert.alert('Error', 'Nomor rekening telah terdaftar');
          setIsLoading(false);
          return;
        }
      }

      const docSnapshot = await docRef.get();
      if (docSnapshot.exists) {
        const dataStatus = docSnapshot.data();
        if (dataStatus?.status === 'Ditolak') {
          await docRef.update({
            fotoGOR: finalFotoGOR,
            suratIzin: finalSuratIzin,
            status: 'Menunggu Aktivasi',
          });

          await firestore().collection('users').doc(user?.uid).update({
            namaLengkap,
            nomor,
            noRek,
            namaBank,
          });
        } else {
          await docRef.update({
            fotoGOR: finalFotoGOR,
            suratIzin: finalSuratIzin,
          });

          await firestore().collection('users').doc(user?.uid).update({
            namaLengkap,
            nomor,
            noRek,
            namaBank,
          });
          console.log('Data berhasil diupdate', {
            namaLengkap,
            nomor,
            noRek,
            namaBank,
            fotoGOR: finalFotoGOR,
            suratIzin: finalSuratIzin,
          });
        }
      }
      setIsLoading(false);
      navigation.goBack();
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
          namaLengkap={namaLengkap}
          nomor={nomor}
          noRek={noRek}
          selectedBankValue={namaBank}
          onBankValueChange={setNamaBank}
          suratIzin={suratIzin?.name}
          onChangeNoRek={setNoRek}
          onPressSuratIzin={handleUploadSuratIzin}
          onPressFotoGOR={handleUploadFotoGOR}
          onPressSubmit={handleSubmit}
          onChangeNamaLengkap={setNamaLengkap}
          onChangeNomor={setNomor}
          isLoading={isLoading}
        />
        <BottomSpace marginBottom={60} />
      </RootContainer>
    </>
  );
};

export default EditProfile;

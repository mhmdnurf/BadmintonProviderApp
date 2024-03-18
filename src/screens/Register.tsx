import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import RegisterField from '../components/register/RegisterField';
import RegisterButton from '../components/register/RegisterButton';
import Footer from '../components/Footer';
import BottomSpace from '../components/BottomSpace';
import RootContainer from '../components/RootContainer';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
interface Register {
  navigation: any;
}

type DocumentPick = {
  uri: string;
  name: string;
};
const Register = ({navigation}: Register) => {
  const [fullName, setFullName] = React.useState('');
  const [nik, setNik] = React.useState('');
  const [suratIzin, setSuratIzin] = React.useState<DocumentPick | undefined>(
    undefined,
  );
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [namaGor, setNamaGor] = React.useState('');
  const [selectedJenisKelamin, setSelectedJenisKelamin] = React.useState('');
  const [selectedWaktuBuka, setSelectedWaktuBuka] = React.useState('');
  const [selectedWaktuTutup, setSelectedWaktuTutup] = React.useState('');
  const [jumlahLapangan, setJumlahLapangan] = React.useState('');
  const [fotoGor, setFotoGor] = React.useState<DocumentPick | undefined>(
    undefined,
  );
  const [fotoUser, setFotoUser] = React.useState<DocumentPick | undefined>(
    undefined,
  );
  const [nomor, setNomor] = React.useState('');
  const [alamatGOR, setAlamatGOR] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNavigateLogin = () => {
    navigation.navigate('Login');
  };

  const handleUploadFotoSuratIzin = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      const selectedFile = res.uri;
      const selectedFileName = res.name;

      if (selectedFileName && selectedFile) {
        setSuratIzin({uri: selectedFile, name: selectedFileName});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.info(err);
      } else {
        throw err;
      }
    }
  };

  const handleUploadFotoGor = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const selectedFile = res.uri;
      const selectedFileName = res.name;

      if (selectedFileName && selectedFile) {
        setFotoGor({uri: selectedFile, name: selectedFileName});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.info(err);
      } else {
        throw err;
      }
    }
  };

  const handleUploadFotoUser = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });

      const selectedFile = res.uri;
      const selectedFileName = res.name;

      if (selectedFile && selectedFileName) {
        setFotoUser({uri: selectedFile, name: selectedFileName});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.info(err);
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;
    const fotoGORFileName = `fotoGOR/${user?.uid}/fotoGOR_${user?.uid}`;
    const fotoGORReference = storage().ref(fotoGORFileName);
    try {
      // Foto GOR
      const fotoGORFilePath = `${RNFS.DocumentDirectoryPath}/${fotoGor}`;
      if (fotoGor) {
        await RNFS.copyFile(fotoGor.uri, fotoGORFilePath);
      }
      const fotoGORBlob = await RNFS.readFile(fotoGORFilePath, 'base64');

      await fotoGORReference.putString(fotoGORBlob, 'base64');
      const fotoGORUrl = await fotoGORReference.getDownloadURL();

      // Foto User
      const fotoUserFileName = `fotoUser/${user?.uid}/fotoUser_${user?.uid}`;
      const fotoUserReference = storage().ref(fotoUserFileName);
      const fotoUserFilePath = `${RNFS.DocumentDirectoryPath}/${fotoUser}`;
      if (fotoUser) {
        await RNFS.copyFile(fotoUser.uri, fotoUserFilePath);
      }
      const fotoUserBlob = await RNFS.readFile(fotoUserFilePath, 'base64');

      await fotoUserReference.putString(fotoUserBlob, 'base64');
      const fotoUserUrl = await fotoUserReference.getDownloadURL();

      // Foto Surat Izin
      const suratIzinFileName = `suratIzin/${user?.uid}/suratIzin_${user?.uid}`;
      const suratIzinReference = storage().ref(suratIzinFileName);
      const suratIzinFilePath = `${RNFS.DocumentDirectoryPath}/${suratIzin}`;
      if (suratIzin) {
        await RNFS.copyFile(suratIzin.uri, suratIzinFilePath);
      }
      const suratIzinBlob = await RNFS.readFile(suratIzinFilePath, 'base64');

      await suratIzinReference.putString(suratIzinBlob, 'base64');
      const suratIzinUrl = await suratIzinReference.getDownloadURL();

      let userDoc = firestore().collection('users').doc(user?.uid).set({
        namaLengkap: fullName,
        nik: nik,
        email: email,
        nomor: nomor,
        alamatGOR: alamatGOR,
        fotoUser: fotoUserUrl,
        user_uid: user?.uid,
        role: 'provider',
      });

      let gorDoc = firestore().collection('gor').doc(user?.uid).set({
        namaGOR: namaGor,
        alamat: alamatGOR,
        waktuBuka: selectedWaktuBuka,
        waktuTutup: selectedWaktuTutup,
        jumlahLapangan: jumlahLapangan,
        fotoGOR: fotoGORUrl,
        user_uid: user?.uid,
        status: 'Menunggu Aktivasi',
        suratIzin: suratIzinUrl,
        role: 'provider',
        jenisKelamin: selectedJenisKelamin,
      });

      await Promise.all([userDoc, gorDoc]);
    } catch (error) {
      console.log('Error', error);
    } finally {
      setIsLoading(false);
      navigation.replace('Login');
    }
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Register" />
        <Text style={styles.title}>Create your account</Text>
        <View style={styles.inputContainer}>
          <RegisterField
            selectedJenisKelaminValue={selectedJenisKelamin}
            onJenisKelaminValueChange={itemValue =>
              setSelectedJenisKelamin(itemValue)
            }
            alamatValue={alamatGOR}
            onChangeTextAlamatGOR={setAlamatGOR}
            nameValue={fullName}
            onChangeTextName={setFullName}
            nikValue={nik}
            onChangeTextNIK={setNik}
            emailValue={email}
            onChangeTextEmail={setEmail}
            passwordValue={password}
            onChangeTextPassword={setPassword}
            selectedWaktuBukaValue={selectedWaktuBuka}
            onWaktuBukaValueChange={itemValue =>
              setSelectedWaktuBuka(itemValue)
            }
            selectedWaktuTutupValue={selectedWaktuTutup}
            onWaktuTutupValueChange={itemValue =>
              setSelectedWaktuTutup(itemValue)
            }
            namaGorValue={namaGor}
            onChangeTextNamaGor={setNamaGor}
            jumlahLapanganValue={jumlahLapangan}
            onChangeTextJumlahLapangan={setJumlahLapangan}
            nomorValue={nomor}
            onChangeTextNomor={setNomor}
            onPressUploadFotoGor={handleUploadFotoGor}
            onPressUploadFotoUser={handleUploadFotoUser}
            onPressUploadSuratIzin={handleUploadFotoSuratIzin}
            fotoGorValue={fotoGor?.name}
            suratIzinValue={suratIzin?.name}
            fotoUserGor={fotoUser?.name}
          />
          <RegisterButton onPress={handleSubmit} isLoading={isLoading} />
          <Footer
            title="Sudah punya akun?"
            subTitle="Login"
            onPress={handleNavigateLogin}
          />
          <BottomSpace marginBottom={40} />
        </View>
      </RootContainer>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginLeft: 20,
    marginTop: 50,
    marginBottom: 10,
    fontFamily: 'Poppins SemiBold',
    color: '#AAC8A7',
  },
  inputContainer: {
    marginHorizontal: 20,
  },
});

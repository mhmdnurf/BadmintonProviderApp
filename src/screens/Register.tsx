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

type UploadedFiles = {
  data: string;
};

interface Register {
  navigation: any;
}
const Register = ({navigation}: Register) => {
  const [fullName, setFullName] = React.useState('');
  const [nik, setNik] = React.useState('');
  const [suratIzin, setSuratIzin] = React.useState<string | undefined>('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [namaGor, setNamaGor] = React.useState('');
  const [selectedWaktuBuka, setSelectedWaktuBuka] = React.useState('');
  const [selectedWaktuTutup, setSelectedWaktuTutup] = React.useState('');
  const [jumlahLapangan, setJumlahLapangan] = React.useState('');
  const [fotoGor, setFotoGor] = React.useState<string | undefined>('');
  const [fotoUser, setFotoUser] = React.useState<string | undefined>('');
  const [nomor, setNomor] = React.useState('');
  const [uploadSuratIzin, setUploadSuratIzin] = React.useState<UploadedFiles>();
  const [uploadFotoGor, setUploadFotoGor] = React.useState<UploadedFiles>();
  const [uploadFotoUser, setUploadFotoUser] = React.useState<UploadedFiles>();

  const handleNavigateLogin = () => {
    navigation.navigate('Login');
  };

  const handleUploadFotoSuratIzin = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      const uploadedFileUrl = res.uri;
      const fileType = res.type;
      const fileName = res.name;

      console.log({
        uploadedFileUrl,
        fileType,
      });

      if (fileName) {
        setSuratIzin(fileName);
      }

      // Read the file data
      const fileData = await RNFS.readFile(uploadedFileUrl, 'base64');

      setUploadSuratIzin({
        data: `data:${fileType};base64,${fileData}`,
      });

      //   console.log(uploadSuratIzin);
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

      const uploadedFileUrl = res.uri;
      const fileType = res.type;
      const fileName = res.name;

      console.log({
        uploadedFileUrl,
        fileType,
      });

      if (fileName) {
        setFotoGor(fileName);
      }

      // Read the file data
      const fileData = await RNFS.readFile(uploadedFileUrl, 'base64');

      setUploadFotoGor({
        data: `data:${fileType};base64,${fileData}`,
      });

      //   console.log(uploadSuratIzin);
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

      const uploadedFileUrl = res.uri;
      const fileType = res.type;
      const fileName = res?.name;

      console.log({
        uploadedFileUrl,
        fileType,
      });

      if (fileName) {
        setFotoUser(fileName);
      }

      // Read the file data
      const fileData = await RNFS.readFile(uploadedFileUrl, 'base64');

      setUploadFotoUser({
        data: `data:${fileType};base64,${fileData}`,
      });

      //   console.log(uploadSuratIzin);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.info(err);
      } else {
        throw err;
      }
    }
  };

  const handleSubmit = () => {
    try {
      console.log('Submitted Data', {
        fullName,
        nik,
        email,
        password,
        nomor,
        suratIzin,
        fotoGor,
        fotoUser,
        namaGor,
        selectedWaktuBuka,
        selectedWaktuTutup,
        jumlahLapangan,
        uploadFotoGor,
        uploadFotoUser,
        uploadSuratIzin,
      });
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <>
      <RootContainer backgroundColor="white">
        <Header title="Register" />
        <Text style={styles.title}>Create your account</Text>
        <View style={styles.inputContainer}>
          <RegisterField
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
            fotoGorValue={fotoGor}
            suratIzinValue={suratIzin}
            fotoUserGor={fotoUser}
          />
          <RegisterButton onPress={handleSubmit} />
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
  },
  inputContainer: {
    marginHorizontal: 20,
  },
});

import React from 'react';
import InputField from '../InputField';
import {Picker} from '@react-native-picker/picker';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface RegisterField {
  nameValue: string;
  onChangeTextName: (text: string) => void;
  nikValue: string;
  onChangeTextNIK: (text: string) => void;
  emailValue: string;
  onChangeTextEmail: (text: string) => void;
  passwordValue: string;
  onChangeTextPassword: (text: string) => void;
  selectedJenisKelaminValue: string;
  onJenisKelaminValueChange: (itemValue: string, itemIndex: number) => void;
  selectedWaktuBukaValue: string;
  onWaktuBukaValueChange: (itemValue: string, itemIndex: number) => void;
  selectedWaktuTutupValue: string;
  onWaktuTutupValueChange: (itemValue: string, itemIndex: number) => void;
  nomorValue: string;
  onChangeTextNomor: (text: string) => void;
  namaGorValue: string;
  onChangeTextNamaGor: (text: string) => void;
  jumlahLapanganValue: string;
  onChangeTextJumlahLapangan: (text: string) => void;
  onPressUploadSuratIzin: () => void;
  onPressUploadFotoGor: () => void;
  onPressUploadFotoUser: () => void;
  fotoGorValue: string | undefined;
  suratIzinValue?: string | undefined;
  fotoUserGor?: string | undefined;
  alamatValue: string;
  onChangeTextAlamatGOR: (text: string) => void;
}

const RegisterField = ({
  nameValue,
  onChangeTextName,
  nikValue,
  onChangeTextNIK,
  emailValue,
  onChangeTextEmail,
  passwordValue,
  onChangeTextPassword,
  selectedJenisKelaminValue,
  onJenisKelaminValueChange,
  selectedWaktuBukaValue,
  onWaktuBukaValueChange,
  selectedWaktuTutupValue,
  onWaktuTutupValueChange,
  nomorValue,
  onChangeTextNomor,
  namaGorValue,
  onChangeTextNamaGor,
  jumlahLapanganValue,
  onChangeTextJumlahLapangan,
  onPressUploadSuratIzin,
  onPressUploadFotoGor,
  onPressUploadFotoUser,
  fotoGorValue,
  suratIzinValue,
  fotoUserGor,
  alamatValue,
  onChangeTextAlamatGOR,
}: RegisterField) => {
  return (
    <>
      <InputField
        placeholder="Nama Lengkap"
        secureTextEntry={false}
        value={nameValue}
        onChangeText={onChangeTextName}
      />
      <InputField
        placeholder="NIK"
        secureTextEntry={false}
        value={nikValue}
        onChangeText={onChangeTextNIK}
        keyboardType="number-pad"
        maxLength={16}
      />
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedJenisKelaminValue}
          onValueChange={onJenisKelaminValueChange}
          style={styles.pickerText}>
          <Picker.Item label="Jenis Kelamin" value="" />
          <Picker.Item label="Laki-Laki" value="Laki-Laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
      </View>
      <InputField
        placeholder="Email"
        secureTextEntry={false}
        value={emailValue}
        onChangeText={onChangeTextEmail}
      />
      <InputField
        placeholder="Password"
        secureTextEntry={true}
        value={passwordValue}
        onChangeText={onChangeTextPassword}
      />
      <InputField
        placeholder="Nama GOR"
        secureTextEntry={false}
        value={namaGorValue}
        onChangeText={onChangeTextNamaGor}
      />
      <InputField
        placeholder="Alamat GOR"
        secureTextEntry={false}
        value={alamatValue}
        onChangeText={onChangeTextAlamatGOR}
      />
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedWaktuBukaValue}
          onValueChange={onWaktuBukaValueChange}
          style={styles.pickerText}>
          <Picker.Item label="Waktu Buka" value="" />
          <Picker.Item label="06.00" value="06.00" />
          <Picker.Item label="07.00" value="07.00" />
          <Picker.Item label="08.00" value="08.00" />
          <Picker.Item label="09.00" value="09.00" />
          <Picker.Item label="10.00" value="10.00" />
          <Picker.Item label="11.00" value="11.00" />
          <Picker.Item label="12.00" value="12.00" />
          <Picker.Item label="13.00" value="13.00" />
          <Picker.Item label="14.00" value="14.00" />
          <Picker.Item label="15.00" value="15.00" />
          <Picker.Item label="16.00" value="16.00" />
          <Picker.Item label="17.00" value="17.00" />
          <Picker.Item label="18.00" value="18.00" />
          <Picker.Item label="19.00" value="19.00" />
          <Picker.Item label="20.00" value="20.00" />
        </Picker>
      </View>
      <View style={styles.picker}>
        <Picker
          style={styles.pickerText}
          selectedValue={selectedWaktuTutupValue}
          onValueChange={onWaktuTutupValueChange}>
          <Picker.Item label="Waktu Tutup" value="" />
          <Picker.Item label="06.00" value="06.00" />
          <Picker.Item label="15.00" value="15.00" />
          <Picker.Item label="16.00" value="16.00" />
          <Picker.Item label="17.00" value="17.00" />
          <Picker.Item label="18.00" value="18.00" />
          <Picker.Item label="19.00" value="19.00" />
          <Picker.Item label="20.00" value="20.00" />
          <Picker.Item label="21.00" value="21.00" />
          <Picker.Item label="22.00" value="22.00" />
          <Picker.Item label="23.00" value="23.00" />
          <Picker.Item label="00.00" value="00.00" />
          <Picker.Item label="01.00" value="01.00" />
          <Picker.Item label="02.00" value="02.00" />
        </Picker>
      </View>
      <InputField
        placeholder="Jumlah Lapangan"
        secureTextEntry={false}
        key={'numeric'}
        value={jumlahLapanganValue}
        onChangeText={onChangeTextJumlahLapangan}
        keyboardType="numeric"
      />
      <InputField
        placeholder="Nomor HP"
        secureTextEntry={false}
        value={nomorValue}
        onChangeText={onChangeTextNomor}
        keyboardType="numeric"
      />
      <View style={styles.uploadContainer}>
        <InputField
          placeholder="Surat Izin Usaha (JPG/PDF)"
          secureTextEntry={false}
          value={suratIzinValue}
          editable={false}
        />
        <Pressable style={styles.btnUpload} onPress={onPressUploadSuratIzin}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
      <View style={styles.uploadContainer}>
        <InputField
          placeholder="Foto GOR"
          secureTextEntry={false}
          value={fotoGorValue}
          editable={false}
        />
        <Pressable style={styles.btnUpload} onPress={onPressUploadFotoGor}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
      <View style={styles.uploadContainer}>
        <InputField
          placeholder="Foto Pemilik GOR"
          secureTextEntry={false}
          value={fotoUserGor}
          editable={false}
        />
        <Pressable style={styles.btnUpload} onPress={onPressUploadFotoUser}>
          <Text style={styles.btnText}>+</Text>
        </Pressable>
      </View>
    </>
  );
};

export default RegisterField;

const styles = StyleSheet.create({
  picker: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
    marginVertical: 5,
  },
  uploadContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnUpload: {
    backgroundColor: '#AAC8A7',
    borderWidth: 3,
    borderColor: '#EEEDEB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 10,
    elevation: 2,
  },
  pickerText: {
    color: 'grey',
  },
  btnText: {color: 'white', fontSize: 24},
});

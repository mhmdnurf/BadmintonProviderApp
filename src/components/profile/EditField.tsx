import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import InputField from '../InputField';
import SubmitButton from './SubmitButton';
import {Picker} from '@react-native-picker/picker';

interface EditField {
  namaLengkap: string;
  onChangeNamaLengkap: (text: string) => void;
  nomor: string;
  onChangeNomor: (text: string) => void;
  fotoGOR: string | undefined;
  suratIzin: string | undefined;
  onPressFotoGOR: () => void;
  onPressSuratIzin: () => void;
  onPressSubmit: () => void;
  isLoading: boolean;
  noRek: string;
  onChangeNoRek: (text: string) => void;
  selectedBankValue: string;
  onBankValueChange: (itemValue: string, itemIndex: number) => void;
}

const EditField = ({
  namaLengkap,
  onChangeNamaLengkap,
  noRek,
  onChangeNoRek,
  selectedBankValue,
  onBankValueChange,
  nomor,
  onChangeNomor,
  fotoGOR,
  suratIzin,
  onPressFotoGOR,
  onPressSuratIzin,
  onPressSubmit,
  isLoading,
}: EditField) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <InputField value={namaLengkap} onChangeText={onChangeNamaLengkap} />
        <Text style={styles.label}>Nomor HP</Text>
        <InputField value={nomor} onChangeText={onChangeNomor} />
        <Text style={styles.label}>Nomor Rekening</Text>
        <InputField value={noRek} onChangeText={onChangeNoRek} />
        <Text style={styles.label}>Nama Bank</Text>
        <View style={styles.picker}>
          <Picker
            style={styles.pickerText}
            selectedValue={selectedBankValue}
            onValueChange={onBankValueChange}>
            <Picker.Item label="Nama Bank" value="" />
            <Picker.Item label="BCA" value="BCA" />
            <Picker.Item label="BRI" value="BRI" />
            <Picker.Item label="BNI" value="BNI" />
            <Picker.Item label="Mandiri" value="Mandiri" />
            <Picker.Item label="BSI" value="BSI" />
            <Picker.Item label="BTN" value="BTN" />
            <Picker.Item label="CIMB Niaga" value="CIMB Niaga" />
          </Picker>
        </View>
        <Text style={styles.label}>Foto GOR</Text>
        <View style={styles.uploadContainer}>
          <InputField
            placeholder="Foto GOR (JPG/PDF)"
            secureTextEntry={false}
            value={fotoGOR}
            editable={false}
          />
          <Pressable style={styles.btnUpload} onPress={onPressFotoGOR}>
            <Text style={styles.btnText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.label}>Surat Izin</Text>
        <View style={styles.uploadContainer}>
          <InputField
            placeholder="Surat Izin Usaha (JPG/PDF)"
            secureTextEntry={false}
            value={suratIzin}
            editable={false}
          />
          <Pressable style={styles.btnUpload} onPress={onPressSuratIzin}>
            <Text style={styles.btnText}>+</Text>
          </Pressable>
        </View>
        <SubmitButton onPress={onPressSubmit} isLoading={isLoading} />
      </View>
    </>
  );
};

export default EditField;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins Regular',
    color: '#000000',
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
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  picker: {
    borderWidth: 3,
    borderColor: '#EEEDEB',
    borderRadius: 5,
    marginVertical: 5,
  },
  pickerText: {
    fontFamily: 'Poppins Regular',
    fontSize: 16,
    color: '#000000',
  },
});

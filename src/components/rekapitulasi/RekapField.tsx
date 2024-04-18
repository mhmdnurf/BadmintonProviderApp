import React from 'react';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RekapField = () => {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [endDate, setEndDate] = React.useState(new Date());
  const [showEnd, setShowEnd] = React.useState(false);

  const fetchDataPemesanan = React.useCallback(async () => {
    try {
      const user = auth().currentUser;
      const query = await firestore()
        .collection('booking')
        .where('gor_uid', '==', user?.uid)
        .get();

      query.forEach(doc => {
        console.log('Data', '=>', doc.data());
      });
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, []);

  const fetchDataPembayaran = React.useCallback(async () => {
    try {
      const user = auth().currentUser;
      const query = await firestore()
        .collection('payment')
        .where('gor_uid', '==', user?.uid)
        .get();

      query.forEach(doc => {
        console.log('Data', '=>', doc.data());
      });
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  }, []);

  React.useEffect(() => {
    fetchDataPemesanan();
  }, [fetchDataPemesanan]);

  React.useEffect(() => {
    fetchDataPembayaran();
  }, [fetchDataPembayaran]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const onChangeEnd = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(false);
    setEndDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const showEndDatepicker = () => {
    setShowEnd(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Tanggal Awal</Text>
        <Pressable style={styles.btnPicker} onPress={showDatepicker}>
          <View style={styles.btnLabelContainer}>
            <Icon
              name="calendar"
              size={30}
              color="#6F7789"
              style={styles.icon}
            />
            <Text style={styles.label}>
              {date.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </Pressable>
        {show ? (
          <DateTimePickerAndroid
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        ) : null}

        <Text style={styles.label}>Tanggal Akhir</Text>
        <Pressable style={styles.btnPicker} onPress={showEndDatepicker}>
          <View style={styles.btnLabelContainer}>
            <Icon
              name="calendar"
              size={30}
              color="#6F7789"
              style={styles.icon}
            />
            <Text style={styles.label}>
              {endDate.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
        </Pressable>
        {showEnd ? (
          <DateTimePickerAndroid
            testID="dateTimePickerEnd"
            value={endDate}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChangeEnd}
          />
        ) : null}
        {/* Submit Button */}
        <Pressable style={styles.btnSubmit}>
          <Text style={styles.submitText}>Cetak</Text>
        </Pressable>
      </View>
    </>
  );
};

export default RekapField;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  dateContainer: {marginHorizontal: 20, marginTop: 40},
  dateTitle: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
    color: '#41444B',
  },
  icon: {alignSelf: 'center'},
  btnPicker: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    borderColor: '#E5E5E5',
    borderWidth: 3,
  },
  btnLabelContainer: {display: 'flex', flexDirection: 'row'},
  btnSubmit: {
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#AAC8A7',
    width: '100%',
    marginTop: 20,
  },
  submitText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

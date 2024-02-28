import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RekapField = () => {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [endDate, setEndDate] = React.useState(new Date());
  const [showEnd, setShowEnd] = React.useState(false);

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
            maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            minimumDate={new Date(Date.now())}
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
            maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
            minimumDate={date}
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

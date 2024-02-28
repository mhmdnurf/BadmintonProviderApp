import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FlatContainer from '../components/FlatContainer';
import Header from '../components/Header';
import JadwalItem from '../components/jadwal/JadwalItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSpace from '../components/BottomSpace';

interface Jadwal {
  navigation: any;
  route: any;
}

interface Lapangan {
  title: string;
  data: string[];
  bookedTimes: string[];
}

const Jadwal = ({route, navigation}: Jadwal) => {
  const [lapangan, setLapangan] = useState<Lapangan[]>([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  useEffect(() => {
    const data = {
      jumlahLapangan: 5,
      waktuBuka: '08.00 - 22.00',
      booked: [
        {
          lapangan: 1,
          waktu: ['08.00', '09.00', '10.00'],
        },
        {
          lapangan: 3,
          waktu: ['10.00', '11.00', '12.00'],
        },
      ],
    };

    const [startHour, endHour] = data.waktuBuka
      .split(' - ')
      .map(time => parseInt(time.split('.')[0], 10));
    const waktu = Array.from({length: endHour - startHour + 1}, (_, i) => {
      const hour = startHour + i;
      return `${hour < 10 ? '0' + hour : hour}.00`;
    });

    setLapangan(
      Array.from({length: data.jumlahLapangan}, (_, i) => {
        const booking = data.booked.find(b => b.lapangan === i + 1);
        return {
          title: `Lapangan ${i + 1}`,
          data: waktu,
          bookedTimes: booking ? booking.waktu : [],
        };
      }),
    );
  }, []);

  const handleNavigateToPemesanan = (time: string) => () => {
    navigation.navigate('DetailPemesan', {
      waktuBooking: time,
      tanggalPemesanan: date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    });
  };

  return (
    <>
      <FlatContainer backgroundColor="white">
        <Header title="Jadwal Lapangan" />
        <View style={styles.dateContainer}>
          <Text style={styles.dateTitle}>Pilih Tanggal</Text>
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
            <DateTimePicker
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
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {lapangan.map((lap: Lapangan, index: number) => (
            <View key={index}>
              <Text style={styles.titleContainer}>{lap.title}</Text>
              <View style={styles.itemContainer}>
                {lap.data.map((item: string, innerIndex: number) => (
                  <JadwalItem
                    key={innerIndex}
                    title={item}
                    isBooked={lap.bookedTimes.includes(item)}
                    onPress={
                      lap.bookedTimes.includes(item)
                        ? handleNavigateToPemesanan(item)
                        : () => {
                            ToastAndroid.showWithGravity(
                              'Lapangan belum dipesan',
                              ToastAndroid.SHORT,
                              ToastAndroid.CENTER,
                            );
                          }
                    }
                  />
                ))}
              </View>
            </View>
          ))}
          <BottomSpace marginBottom={150} />
        </ScrollView>
      </FlatContainer>
    </>
  );
};

export default Jadwal;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  titleContainer: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
    color: '#41444B',
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateContainer: {marginHorizontal: 20, marginTop: 40},
  dateTitle: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 10,
    color: '#41444B',
  },
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
  icon: {alignSelf: 'center'},
  label: {
    color: '#41444B',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
    marginLeft: 10,
  },
});

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FlatContainer from '../components/FlatContainer';
import Header from '../components/Header';
import JadwalItem from '../components/jadwal/JadwalItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSpace from '../components/BottomSpace';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface Jadwal {
  navigation: any;
  route: any;
}

interface Lapangan {
  title: string;
  data: string[];
  bookedTimes: string[];
}

const Jadwal = ({navigation}: Jadwal) => {
  const [lapangan, setLapangan] = React.useState<Lapangan[]>([]);
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataLapangan, setDataLapangan] = React.useState({} as any);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const fetchJadwal = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const user = auth().currentUser;
      const query = await firestore().collection('gor').doc(user?.uid).get();
      const lapanganData = query.data();
      setDataLapangan({
        jumlahLapangan: lapanganData?.jumlahLapangan,
        waktuBuka: `${lapanganData?.waktuBuka} - ${lapanganData?.waktuTutup}`,
        booked: [{}],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    fetchJadwal();
  }, [fetchJadwal]);

  React.useEffect(() => {
    if (dataLapangan?.waktuBuka) {
      setRefreshing(false);
      const [startHour, endHour] = dataLapangan?.waktuBuka
        .split(' - ')
        .map((time: string) => parseInt(time.split('.')[0], 10));
      const waktu = Array.from({length: endHour - startHour + 1}, (_, i) => {
        const hour = startHour + i;
        return `${hour < 10 ? '0' + hour : hour}.00`;
      });
      setLapangan(
        Array.from({length: dataLapangan.jumlahLapangan}, (_, i) => {
          const booking = dataLapangan.booked.find(
            (b: {lapangan: number}) => b.lapangan === i + 1,
          );
          return {
            title: `Lapangan ${i + 1}`,
            data: waktu,
            bookedTimes: booking ? booking.waktu : [],
          };
        }),
      );
    } else {
      setRefreshing(true);
    }
  }, [dataLapangan]);

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
          <Text style={styles.dateTitle}>Tanggal</Text>
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
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchJadwal} />
          }>
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
    marginTop: 30,
    marginHorizontal: 20,
  },
  titleContainer: {
    fontFamily: 'Poppins SemiBold',
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
    fontFamily: 'Poppins SemiBold',
    fontSize: 20,
    color: '#41444B',
  },
  btnPicker: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
    borderColor: '#E5E5E5',
    borderWidth: 3,
  },
  btnLabelContainer: {display: 'flex', flexDirection: 'row'},
  icon: {alignSelf: 'center'},
  label: {
    color: '#41444B',
    fontSize: 18,
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    marginLeft: 10,
  },
});

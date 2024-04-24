import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FlatContainer from '../components/FlatContainer';
import Header from '../components/Header';
import JadwalItem from '../components/jadwal/JadwalItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSpace from '../components/BottomSpace';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

interface Jadwal {
  navigation: any;
  route: any;
}

interface Lapangan {
  title: string;
  data: string[];
  bookedTimes: {booking_uid: string; waktu: string}[];
}

type DocData = {
  id: string;
  tanggalPemesanan: string;
};

const Jadwal = ({navigation}: Jadwal) => {
  const isFocused = useIsFocused();
  const [lapangan, setLapangan] = React.useState<Lapangan[]>([]);
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [dataLapangan, setDataLapangan] = React.useState({} as any);
  const [booked, setBooked] = React.useState([] as any);

  const fetchBooked = React.useCallback(async () => {
    setRefreshing(true);
    const user = auth().currentUser;
    try {
      const selectedDate = date.toISOString().split('T')[0];
      const query = await firestore()
        .collection('booking')
        .where('gor_uid', '==', user?.uid)
        .where('status', '!=', 'expired')
        .get();
      const bookedData = query.docs
        .map(
          (doc): DocData => ({
            ...(doc.data() as DocData),
            id: doc.id,
          }),
        )
        .filter(data => data.tanggalPemesanan.split('T')[0] === selectedDate);
      setBooked(bookedData);
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, [date]);

  const fetchJadwal = React.useCallback(async () => {
    const user = auth().currentUser;
    try {
      setRefreshing(true);
      const query = await firestore().collection('gor').doc(user?.uid).get();
      const lapanganData = query.data();
      setDataLapangan({
        id: user?.uid,
        jumlahLapangan: lapanganData?.jumlahLapangan,
        namaGOR: lapanganData?.namaGOR,
        waktuBuka: `${lapanganData?.waktuBuka} - ${lapanganData?.waktuTutup}`,
        hargaLapangan: lapanganData?.hargaLapangan,
        booked: booked.map(
          (item: {lapangan: string; waktu: Array<string>; id: string}) => ({
            lapangan: parseInt(item.lapangan, 10),
            waktu: JSON.stringify(item.waktu),
            id: item.id,
          }),
        ),
      });
    } catch (error) {
      console.log('Error fetching data: ', error);
    } finally {
      setRefreshing(false);
    }
  }, [booked]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetchBooked();
    }
  }, [fetchBooked, isFocused]);

  React.useEffect(() => {
    if (isFocused) {
      fetchJadwal();
    }
  }, [fetchJadwal, isFocused]);

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
          const bookings = dataLapangan.booked.filter(
            (b: {lapangan: number}) => b.lapangan === i + 1,
          );
          const bookedTimes = bookings.map((b: {id: any; waktu: any}) => ({
            booking_uid: b.id,
            waktu: JSON.parse(b.waktu),
          }));
          return {
            title: `Lapangan ${i + 1}`,
            data: waktu,
            bookedTimes,
          };
        }),
      );
    } else {
      setRefreshing(true);
    }
  }, [dataLapangan]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchJadwal();
    fetchBooked();
  };

  const handleNavigateToDetailPemesanById = (booking_uid: string) => {
    navigation.navigate('DetailPemesan', {
      booking_uid,
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
            />
          ) : null}
        </View>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          {lapangan.map((lap: Lapangan, index: number) => (
            <View key={index}>
              <Text style={styles.titleContainer}>{lap.title}</Text>
              <View style={styles.itemContainer}>
                {lap.data.map((item: string, innerIndex: number) => {
                  const isBooked = lap.bookedTimes.some(bookedTime =>
                    bookedTime.waktu.includes(item),
                  );
                  const {booking_uid} = lap.bookedTimes.find(bookedTime =>
                    bookedTime.waktu.includes(item),
                  ) || {booking_uid: ''};
                  return (
                    <JadwalItem
                      key={innerIndex}
                      title={item}
                      isBooked={isBooked}
                      onPress={
                        isBooked
                          ? () => handleNavigateToDetailPemesanById(booking_uid)
                          : () => {
                              ToastAndroid.showWithGravityAndOffset(
                                'Lapangan ini belum dipesan',
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                                25,
                                50,
                              );
                            }
                      }
                    />
                  );
                })}
              </View>
            </View>
          ))}
          <BottomSpace marginBottom={40} />
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
    fontFamily: 'Poppins SemiBold',
    fontSize: 20,
    marginBottom: 10,
    color: '#6F7789',
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
    marginBottom: 10,
    color: '#6F7789',
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
    color: '#6F7789',
    fontSize: 18,
    fontFamily: 'Poppins Regular',
    alignSelf: 'center',
    marginLeft: 10,
  },
});

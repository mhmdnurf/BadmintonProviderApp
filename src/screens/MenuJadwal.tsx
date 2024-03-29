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

type BookedItem = {
  lapangan: string;
  waktu: string[];
  booking_uid: string;
};

interface Lapangan {
  title: string;
  data: string[];
  bookedTimes: string[];
  booked?: BookedItem[];
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
      console.log('Booked data: ', bookedData);
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
            (b: {lapangan: number; booking_uid?: string; waktu: string[]}) =>
              b.lapangan === i + 1,
          );
          const bookedTimes = bookings.map(
            (b: {waktu: string[]; booking_uid?: string}) => ({
              booking_uid: b.booking_uid,
              waktu: b.waktu,
            }),
          );
          return {
            title: `Lapangan ${i + 1}`,
            data: waktu,
            bookedTimes: bookedTimes,
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

  const handleNavigateToDetailPemesan = (booking_uid: string) => () => {
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
              maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              minimumDate={new Date(Date.now())}
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
                  console.log('lap.booked:', lap.booked); // Add this line
                  const booking_uid =
                    lap.booked?.find((b: BookedItem) => {
                      console.log('b:', b); // Add this line
                      return b.waktu.includes(item);
                    })?.booking_uid || '';
                  return (
                    <JadwalItem
                      key={innerIndex}
                      title={item}
                      isBooked={isBooked}
                      onPress={
                        isBooked
                          ? () => {
                              handleNavigateToDetailPemesan(booking_uid);
                            }
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
                      booking_uid={booking_uid}
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
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateContainer: {marginHorizontal: 20, marginTop: 40},
  dateTitle: {fontFamily: 'Poppins SemiBold', fontSize: 20, marginBottom: 10},
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

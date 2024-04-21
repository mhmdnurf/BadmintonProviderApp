import React from 'react';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import RNFS from 'react-native-fs';
import notifee, {AndroidImportance} from '@notifee/react-native';
// import FileViewer from 'react-native-file-viewer';

const RekapField = () => {
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [endDate, setEndDate] = React.useState(new Date());
  const [showEnd, setShowEnd] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // const openFile = async (filePath: string) => {
  //   try {
  //     await FileViewer.open(filePath, {showOpenWithDialog: true});
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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

  const handleSubmit = async () => {
    setIsLoading(true);
    const user = auth().currentUser;
    try {
      const tanggalAwal = new Date(date).toISOString().split('T')[0]; // format date to 'yyyy-mm-dd'
      const tanggalAkhir = new Date(endDate).toISOString().split('T')[0]; // format endDate to 'yyyy-mm-dd'

      console.log(tanggalAwal, tanggalAkhir);

      const url = `https://report-badminton-server.vercel.app/getBookings?uid=${user?.uid}&tanggalAwal=${tanggalAwal}&tanggalAkhir=${tanggalAkhir}`;
      const localPath = `${RNFS.DownloadDirectoryPath}/Rekapitulasi Data Pemesanan Lapangan - ${tanggalAwal}-${tanggalAkhir}.xlsx`;

      const options = {
        fromUrl: url,
        toFile: localPath,
        begin: (res: {contentLength: number}) => {
          console.log('begin', res);
          console.log(
            'contentLength:',
            res.contentLength / (1024 * 1024),
            'MB',
          );
        },
        progress: (res: {bytesWritten: number; contentLength: number}) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          console.log(`progress: ${Math.floor(progress)}%`);
        },
      };

      await RNFS.downloadFile(options).promise;

      console.log('File downloaded to', localPath);

      // openFile(localPath);

      // Show a notification
      await notifee.displayNotification({
        title: 'Download Complete',
        body: 'Rekapitulasi Data has been downloaded.',
        android: {
          channelId: 'download',
          smallIcon: 'ic_launcher',
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    (async () => {
      const channelId = await notifee.createChannel({
        id: 'download',
        name: 'Download Notifications',
        importance: AndroidImportance.HIGH,
        vibration: true,
      });

      console.log('Notification channel created', channelId);
    })();
  }, []);
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
        <Pressable style={styles.btnSubmit} onPress={handleSubmit}>
          {isLoading ? (
            <Text style={styles.submitText}>Loading...</Text>
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
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
    fontFamily: 'Poppins SemiBold',
  },
});

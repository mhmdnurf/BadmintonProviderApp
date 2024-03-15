import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// screens
import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import ForgotPassword from './src/screens/ForgotPassword';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import MenuJadwal from './src/screens/MenuJadwal';
import TambahLapangan from './src/screens/TambahLapangan';
import PaketLapangan from './src/screens/PaketLapangan';
import PaketMember from './src/screens/PaketMember';
import DetailPemesan from './src/screens/DetailPemesan';
import Rekapitulasi from './src/screens/Rekapitulasi';
import EditProfile from './src/screens/EditProfile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          tabBarActiveTintColor: '#AAC8A7',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
            borderRadius: 15,
            position: 'absolute',
            backgroundColor: 'white',
            marginHorizontal: 15,
            marginVertical: 12,
            height: 60,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="HomeTab"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="MenuJadwal"
          component={MenuJadwal}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="calendar-clock-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="account-box" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: '',
            headerShown: true,
            headerTintColor: '#AAC8A7',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: '',
            headerShown: true,
            headerTintColor: '#AAC8A7',
          }}
        />
        <Stack.Screen
          name="Home"
          component={MainTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TambahLapangan"
          component={TambahLapangan}
          options={{
            title: '',
            headerShown: true,
            headerTintColor: '#AAC8A7',
          }}
        />
        <Stack.Screen
          name="PaketLapangan"
          component={PaketLapangan}
          options={{
            title: '',
            headerShown: true,
            headerTintColor: '#AAC8A7',
          }}
        />
        <Stack.Screen
          name="PaketMember"
          component={PaketMember}
          options={{title: '', headerShown: true, headerTintColor: '#AAC8A7'}}
        />
        <Stack.Screen
          name="DetailPemesan"
          component={DetailPemesan}
          options={{
            title: '',
            headerShown: true,
            headerTintColor: '#AAC8A7',
          }}
        />
        <Stack.Screen
          name="Rekapitulasi"
          component={Rekapitulasi}
          options={{title: '', headerShown: true, headerTintColor: '#AAC8A7'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{title: '', headerShown: true, headerTintColor: '#AAC8A7'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

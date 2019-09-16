/* eslint-disable prettier/prettier */

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import FirstMainScreen from './src/screens/FirstMainScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import homeScreen from './src/screens/HomeScreen';
import PhoneNumberVerification from './src/screens/PhoneNumberVerification';
import pickUpLocation from './src/screens/pickUpLocation';
import selectMachinery from './src/screens/selectMachinery';
import ChooseServiceTime from './src/screens/ChooseServiceTime';
import ScheduleNow from './src/screens/ScheduleNow';
import FindingCaptain from './src/screens/FindingCaptain';
import ScheduleLater from './src/screens/ScheduleLater';
import ScheduledServices from './src/screens/ScheduledServices';
import ServicesRecieved from './src/screens/ServicesRecieved';
import modalTest from './src/screens/modalTest';


console.disableYellowBox = true;
const AppNavigator = createStackNavigator(
  {
    FirstScreen: FirstMainScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
    HomeScreen: homeScreen,
    PhoneNumberVerification: PhoneNumberVerification,
    pickUpLocation: pickUpLocation,
    selectMachinery: selectMachinery,
    ChooseServiceTime: ChooseServiceTime,
    ScheduleNow: ScheduleNow,
    FindingCaptain: FindingCaptain,
    ScheduleLater: ScheduleLater,
    ScheduledServices: ScheduledServices,
    ServicesRecieved: ServicesRecieved,
    modalTest: modalTest,
  },
  {

    initialRouteName: 'ServicesRecieved',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(AppNavigator);

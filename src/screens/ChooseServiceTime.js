import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { Header, Input, } from 'react-native-elements';
const ChooseServiceTime = ({ navigation }) => {
    var cnic = navigation.getParam('cnic');
    var pickupCoordinates = navigation.getParam('pickupCoordinates');
    var machineryUri = navigation.getParam('machineryUri');
    var machinery = navigation.getParam('machinery');

   ///////////////////////////////methods////////////////////
    var bookNow = () => {
        console.log('now');
        navigation.navigate('ScheduleNow',{cnic, pickupCoordinates, machinery, machineryUri});
    }
    //////////////////////////render////////////////////////////
    return (
        <View style={styles.sectionContainer}>
            <Header
                placement="center"
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: () => navigation.goBack() }}
                centerComponent={{ text: 'Booking Ride', style: { color: '#fff' } }}
            />
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{ uri: machineryUri }}
            />
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Choose Time For Service</Text>
            </View>
            
            
            <TouchableOpacity
                style={styles.btnContainer}
                onPress={bookNow}
            >
                <Text style={styles.btnText}>Now</Text>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btnContainer}
            >
                <Text style={styles.btnText}>Schedule Some Other Time</Text>

            </TouchableOpacity>

        </View>
    );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    sectionContainer: {
        flex:1,
    },
    headingContainer: {
        height: screenHeight * 0.1,
        padding: 10,
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#4ba1ec',
        alignItems: 'center',
        marginBottom: 15,
    },
    heading: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
    },
    image: {
        marginTop: 15,
        width: screenWidth , 
        height:  screenHeight * 0.2,
    },
    btnContainer: {
        marginTop: 45,
        height: screenHeight * 0.08,
        width: screenWidth * 0.8,
        padding: 20,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#4184d0',
    },
    btnText: {
        height: 50,
        padding: 10,
        margin: 15,
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInput: {
        height: 50,
        width: Dimensions.get('window').width - 100,
        padding: 10,
        margin: 15,
        borderRadius: 6,
        borderColor: '#c0ccda',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        color: '#757d86',
        fontWeight: 'normal',
        letterSpacing: 5
      },

});


export default ChooseServiceTime;
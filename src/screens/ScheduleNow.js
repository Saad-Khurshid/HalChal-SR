import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import { Header, Input, } from 'react-native-elements';
import moment from 'moment';
//import DatePicker from 'react-native-date-picker';

const ScheduleNow = ({ navigation }) => {
    var cnic = navigation.getParam('cnic');
    var pickupCoordinates = navigation.getParam('pickupCoordinates');
    var machineryUri = navigation.getParam('machineryUri');
    var machinery = navigation.getParam('machinery');

    ///////////////////////hooks///////////////////////////////
    const [area, setArea] = useState('');
    const [dateTime, setDateTime] = useState(moment(new Date()).format(
        'YYYY/MM/DD HH:mm'
      ));
    const [endDateTime, setEndDateTime] = useState('');
    useEffect(() => {
        let startTime = dateTime;
        let areaa = parseFloat(area);
        let duration = 0;
        switch(machinery){
            case 'Leveler':
                duration = areaa * 150;
            case 'Cultivator':
                duration = areaa * 30;
            case 'Rotavator':
                    duration = areaa * 40;
            case 'Disc Harrow':
                    duration = areaa * 40;
            case 'Rice Harvester':
                    duration = areaa * 140 ;
        } 
        let endTime = moment(startTime ).add(duration, 'minutes').format('YYYY-MM-DD HH:mm');
        console.log('machinery', machinery);
        console.log('area', area);
        console.log('starttttimeeee', startTime);
        console.log('duration', duration);
        console.log('end timeeeee', endTime);
        setEndDateTime(endTime);
    }, [area]); 
    ///////////////////////methods////////////////////////////////

    var proceed = () => {
        console.log('proceed on schedule now');
        if (isValidArea()){
            console.log('area is valid');
            navigation.navigate('FindingCaptain',{cnic, pickupCoordinates, machinery, machineryUri,area,dateTime, endDateTime});
        }
        else{
            alertUser('Error', 'Please enter a valid Area')
            console.log('area is invalid');
        }
    };
    var isValidArea = () => {
        if (area ) {
            return true;
        } 
        else {
            return false;
        }
    };
    var alertUser = (type, content) => {
        Alert.alert(type, content, [
          {
            text: 'OK',
            onPress: () => console.log('OK Button pressed')
          }
        ]);
      };
    //////////////////////////////render///////////////////////////////
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
                <Text style={styles.heading}>Book Now</Text>
            </View>
            
            <View style = {{marginTop: 30}}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input style={styles.textInput}
                        placeholder='Enter Area in Acres'
                        value={area}
                        onChangeText={value => setArea(value.replace(/\D+.\D/g, ''))}
                    />
                    <Input style={styles.textInput}
                        placeholder='DateTime'
                        value={moment(dateTime).format('MMMM Do YYYY, h:mm a').toString() }
                        editable = {false}  
                    />
                </KeyboardAvoidingView>
            </View>
            
            <TouchableOpacity
                style={styles.btnContainer}
                onPress= {proceed}
            >
                <Text style={styles.btnText}>Proceed</Text>

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
        alignItems: 'center'
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
        height: screenHeight * 0.07,
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


export default ScheduleNow;
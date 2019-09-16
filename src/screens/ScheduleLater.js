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
import { Header, Input, Icon } from 'react-native-elements';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const ScheduleLater = ({ navigation }) => {
    var cnic = navigation.getParam('cnic');
    var pickupCoordinates = navigation.getParam('pickupCoordinates');
    var machineryUri = navigation.getParam('machineryUri');
    var machinery = navigation.getParam('machinery');

    ///////////////////////hooks///////////////////////////////
    const [area, setArea] = useState('');
    const [startDateAndTimeForMachineryUse, setDateTime] = useState(moment(new Date()).format(
        'YYYY/MM/DD HH:mm'
    ));
    const [endDateTime, setEndDateTime] = useState('');
    const [datePressed, setDatePressed] = useState(false);
    useEffect(() => {
        let startTime = startDateAndTimeForMachineryUse;
        let areaa = parseFloat(area);
        let duration = 0;
        switch (machinery) {
            case 'Leveler':
                duration = areaa * 150;
            case 'Cultivator':
                duration = areaa * 30;
            case 'Rotavator':
                duration = areaa * 40;
            case 'Disc Harrow':
                duration = areaa * 40;
            case 'Rice Harvester':
                duration = areaa * 140;
        }
        let endTime = moment(startTime).add(duration, 'minutes').format('YYYY-MM-DD HH:mm');
        console.log('machinery', machinery);
        console.log('area', area);
        console.log('starttttimeeee', startTime);
        console.log('duration', duration);
        console.log('end timeeeee', endTime);
        setEndDateTime(endTime);
    }, [startDateAndTimeForMachineryUse, area]);
    ///////////////////////methods////////////////////////////////
    handleStartDateChange = date => {
        setDateTime(moment(date).format(
            'YYYY/MM/DD HH:mm'
        ));
    };
    var proceed = () => {
        console.log('proceed on schedule now');
        if (isValidArea()) {
            console.log('area is valid');
            console.log(cnic, pickupCoordinates, machinery, machineryUri, area, startDateAndTimeForMachineryUse, endDateTime);
           // navigation.navigate('FindingCaptain', { cnic, pickupCoordinates, machinery, machineryUri, area, startDateAndTimeForMachineryUse, endDateTime });
        }
        else {
            alertUser('Error', 'Please enter a valid Area')
            console.log('area is invalid');
        }
    };
    var isValidArea = () => {
        if (area) {
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

    const dateFunction = () => {
        if (datePressed === false) {
            return (
                <TouchableOpacity
                    style={styles.dateTimeContainer}
                    onPress={() => {
                        console.log('pressed');
                        setDatePressed(true);
                    }}
                >
                    <View style={styles.dateTimeTag} >
                        <Text style={styles.dateText}>Date: </Text>
                    </View>
                    <View style={styles.dateTimeValue}>
                        <Text style={styles.dateText}>  {moment(startDateAndTimeForMachineryUse).format('MMMM Do , h:mm a').toString()} </Text>
                        <Icon
                            name='edit'
                            type='AntDesign'
                            color='#517fa4'
                            iconStyle={{ marginTop: 15, padding: 10 }}
                        />
                    </View>
                </TouchableOpacity>
            );

        }
        else {
            return (
                <View>
                    <DatePicker
                        date={startDateAndTimeForMachineryUse}
                        onDateChange={date => handleStartDateChange(date)}
                        minimumDate={moment(new Date()).format(
                            'YYYY/MM/DD HH:mm'
                        )}
                        minuteInterval={5}
                        mode="datetime"
                        textColor="#4184d0"
                        style={styles.dateTimePicker}
                    />
                    <TouchableOpacity
                        style={styles.btnContainer}
                        onPress={() => {
                            console.log('pressed');
                            setDatePressed(false);
                        }}
                    >
                        <Text style={styles.btnText}>Ok</Text>

                    </TouchableOpacity>
                </View>

            );
        }
    }
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
                <Text style={styles.heading}>Schedule Booking</Text>
            </View>

            <View style={{ marginTop: 30 }}>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input style={styles.textInput}
                        placeholder='Enter Area in Acres'
                        value={area}
                        onChangeText={value => setArea(value.replace(/\D+.\D/g, ''))}
                    />
                    {/* ============START DATE AND TIME=================== */}
                    {
                        dateFunction()
                    }


                </KeyboardAvoidingView>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={proceed}
                >
                    <Text style={styles.btnText}>Proceed</Text>

                </TouchableOpacity>
            </View>


        </View>
    );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
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
        width: screenWidth,
        height: screenHeight * 0.2,
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
        width: Dimensions.get('window').width * 0.95,
        padding: 10,
        margin: 15,
        borderColor: '#c0ccda',
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
        color: '#757d86',
        fontWeight: 'normal',
        letterSpacing: 5
    },
    dateText: {
        marginTop: 15,
        padding: 10,
        textAlign: 'center',
        color: '#4184d0',
        fontSize: 18,
        fontWeight: 'normal',
    },
    dateTimePicker: {
        alignSelf: 'center',
        borderColor: '#3CB371',
        borderWidth: 0.2,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 10
    },
    dateTimeTag: {
        width: screenWidth * 0.2, height: screenHeight * 0.1,
        alignContent: 'center',
    },
    dateTimeValue: {
        width: screenWidth * 0.75, height: screenHeight * 0.1,
        alignContent: 'center',
        flexDirection: 'row',
    }

});


export default ScheduleLater;
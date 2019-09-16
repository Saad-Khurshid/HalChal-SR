import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Alert,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Image,
    Button,
} from 'react-native';
import { Header, } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-community/async-storage';
import { apiEndpoints } from './../api/apiEndpoints';
import moment from 'moment';
import Modal from "react-native-modal";

const ScheduledServices = ({ navigation }) => {
    ///////////////////////////////////hooks///////////////////////////////////////////////
    const [cnic, setCnic] = useState(navigation.getParam('cnic', ''));
    const [success, setSuccess] = useState('');
    const [reservations, setReservations] = useState('');
    const [selectedReservation, setSelectedReservation] = useState('');
    const [visibility, setVisibility] = useState(false);
    useEffect(() => {
        getUserCnicFromStorage();
    }, []);

    ///////////////////////methods////////////////////////////////
    const fetchScheduledServices = async (cnic) => {
        if(cnic != ''){
            const baseUrl = apiEndpoints.fetchScheduledServices.url;
            const constructedUrl = `${baseUrl}?cnic=${cnic}`;
            console.log(constructedUrl);
            return NetInfo.fetch().then(NetInfoState => {
                if (NetInfoState.isConnected === false) {
                    alertUser('Error', 'Please check your internet connectivity.');
                }
                else {
                    return fetch(constructedUrl)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if(data.success === 0){
                                setSuccess(0);
                            }
                            else{
                                setReservations(data.reservations);
                            }
                        });
                }
            });
        }
    };
    const deleteFarmerReservationRequestByRID = async (rid) => {
        if(cnic != ''){
            const baseUrl = apiEndpoints.deleteFarmerReservationRequestByRID.url;
            const constructedUrl = `${baseUrl}?rid=${rid}`;
            console.log(constructedUrl);
            return NetInfo.fetch().then(NetInfoState => {
                if (NetInfoState.isConnected === false) {
                    alertUser('Error', 'Please check your internet connectivity.');
                }
                else {
                    return fetch(constructedUrl)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if(data.success === 0){
                                alertUser('Error', data.message);
                            }
                            else{
                                Alert.alert('Success', data.message, [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            fetchScheduledServices(cnic);
                                        }
                                    }
                                ]);
                            }
                        });
                }
            });
        }
    };

    const listServices = () => {
        if(reservations !== ''){
            if (success === 0) {
                return (
                    <View>
                        <Text>
                            No bookings are scheduled yet.
                        </Text>
                    </View>
                );
            }
            else {
                console.log('lenngtthhhhhh', reservations.length)
                return reservations.map(
                    (reservation) => {
                        return (
                            <TouchableOpacity style={styles.mainContainer} key={reservation.rid}
                            onPress={
                                () => {
                                    { showModal(reservation.rid) }
                                }
                            }
                            >
                                <View style={styles.leftItem}>
                                    <Text style={styles.text}>
                                        {moment(reservation.start_date).format('MMMM Do , h:mm a' ).toString()}
                                    </Text>
                                </View>

                                <View style={styles.rightItem}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="contain"    
                                        source={{ uri: reservation.machineType.toString() }}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                )
            }
        }
    }
    const showModal = (rid) => {
        let index = reservations.findIndex(reservation => reservation.rid === rid)
        console.log('Pressed', index);
        setVisibility(true);
        setSelectedReservation(reservations[index]);
    }
    const cancelResevation = (rid) => {
        console.log('canceling Reservation');
        setVisibility(false);
        deleteFarmerReservationRequestByRID(rid);
    }
    ///////////////////////async storage methods /////////////////////////////////////
    var getUserCnicFromStorage = async () => {
        try {
            console.log('checking user cnic');
            const userCnic = await AsyncStorage.getItem('@cnic');
            if (userCnic) {
                setCnic(userCnic);
                console.log(userCnic);
                fetchScheduledServices(userCnic);
            }
        } catch (e) {
            //alertUser('Error', 'Can not get data from storage');
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


    ////////////////////////////////////////render////////////////////////////////////////////////

    return (
        <View style={{flex:1}}>
            <Header
                placement="left"
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Scheduled Services', style: { color: '#fff' } }}
            //rightComponent={{ icon: 'log-out', type: 'entypo', color: '#fff', onPress: logOut }}
            />
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>SCHEDULED SERVICES</Text>
            </View>
            <ScrollView >
   
        {/* ===================fetching scheduledReservations ====================== */}
               
                    {listServices()}
                    
            </ScrollView>
            <View style={{ flex: 1 }}>
                <Modal isVisible={visibility}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Reservation id = {selectedReservation.rid}</Text>
                        <Text style={styles.modalText}>Area Requested = {selectedReservation.area_requested} Acre(s)</Text>
                        <Text style={styles.modalText}>Machinery = {selectedReservation.machineName}</Text>
                        <Text style={styles.modalText}>Start Date: {moment(selectedReservation.start_date).format('MMMM Do , h:mm a' ).toString()} </Text>
                        <View style={{marginTop: 20}}></View>
                        <Button title="Ok" onPress={() => {
                            setVisibility(false);
                        }
                        } />
                        <View style={{marginTop: 10}}></View>
                        <Button title="Cancel Booking" onPress={() => {
                            cancelResevation(selectedReservation.rid);
                        }
                        } />
                    </View>
                </Modal>
            </View>
        </View>
    );
};
////////////////////////////styles//////////////////////////////////
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({

    headingContainer: {
        marginTop: 25,
        marginBottom: 30,
        height: screenHeight * 0.1,
        padding: 10,
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#4ba1ec',
    },
    heading: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 3,
    },
    mainContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 10,
        margin: 10,
    },
    leftItem: {
        width: screenWidth * 0.5, height: screenHeight * 0.08,
        backgroundColor: '#4ba1ec',
        textAlign: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    rightItem: {
        width: screenWidth * 0.4, height: screenHeight * 0.08,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    image: {
        height: screenHeight * 0.08,
        width: screenWidth * 0.2,
    },
    text: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    modalContainer: {
        marginTop: 25,
        marginBottom: 30,
        height: screenHeight * 0.3,
        padding: 10,
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    modalText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ScheduledServices;
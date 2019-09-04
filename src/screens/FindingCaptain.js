import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert,
    Linking,
    ProgressBarAndroid,
} from 'react-native';
import { Header, Input, Button, Image } from 'react-native-elements';
import moment from 'moment';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo';
import { apiEndpoints } from './../api/apiEndpoints';

const FindingCaptain = ({ navigation }) => {
    var cnic = navigation.getParam('cnic');
    var pickupCoordinates = navigation.getParam('pickupCoordinates');
    var machineryUri = navigation.getParam('machineryUri');
    var machinery = navigation.getParam('machinery');
    var area = navigation.getParam('area');
    var dateTime = navigation.getParam('dateTime');
    var endDateTime = navigation.getParam('endDateTime');
    console.log('finding captain    =>    ', cnic);
    console.log(pickupCoordinates);
    console.log(machineryUri);
    console.log(machinery);
    console.log(area);
    console.log(dateTime);
    ///////////////////////hooks///////////////////////////////
    const [text, setText] = useState('Finding you a nearby captain...');
    const [dist, setDist] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [ownerLocation, setOwnerLocation] = useState(pickupCoordinates);
    const [rid, setRid] = useState('');

    useEffect(() => {
        findCaptain();
    }, []);


    ///////////////////////methods////////////////////////////////
    var findCaptain = async () => {

        const baseUrl = apiEndpoints.findCaptain.url;
        const constructedUrl = `${baseUrl}?cnic=${cnic}&lat=${pickupCoordinates.latitude}&lng=${pickupCoordinates.longitude}&startDate=${dateTime}&endDate=${endDateTime}&machineType=${machinery}&area=${area}`;
        console.log(constructedUrl);
        return NetInfo.fetch().then(NetInfoState => {
            console.log('Connection type', NetInfoState);
            console.log('Is connected?', NetInfoState.isConnected);
            if (NetInfoState.isConnected === false) {
                alertUser('Error', 'Please check your internet connectivity.');
            }
            else {
                console.log('Connected to internet');
                return fetch(constructedUrl)
                    .then(response => response.json())
                    .then(data => {
                        console.log({ data });
                        if (data.success === 0) {
                            alertUser('Error', data.message);
                        }
                        else {
                            setText('Captain Found')
                            const phoneNumber = data.owner.phone;
                            const name = data.owner.name;
                            const lat = data.owner.lat;
                            const lng = data.owner.lng;
                            const dist = data.owner.dist;
                            const rid = data.rid;
                            setName(name);
                            setDist(dist);
                            setOwnerLocation({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
                            console.log('ownerr locccc', ownerLocation);
                            setRid(rid);
                            setPhone("Call Captain: " + phoneNumber);
                            let msg = 'Your captain ' + name + ' is on his way.\n';
                            Alert.alert('Captain Found', msg, [
                                {
                                    text: 'OK',
                                    // onPress: () => {
                                    //     // navigation.navigate('PhoneNumberVerification',{phoneNumber:phoneNumber, cnic:cnic});
                                    // }
                                }
                            ])
                        }
                    });
            }
        });

    };
    var proceed = () => {
        console.log('proceed on schedule now');
        if (isValidArea()) {
            console.log('area is valid');
        }
        else {
            alertUser('Error', 'Please enter a valid Area')
            console.log('area is invalid');
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
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: pickupCoordinates.latitude,
                        longitude: pickupCoordinates.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                    region={{
                        latitude: pickupCoordinates.latitude,
                        longitude: pickupCoordinates.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}
                >
                    <Marker
                        key={90}
                        coordinate={{ latitude: +ownerLocation.latitude, longitude: +ownerLocation.longitude }}
                        coordinate={ownerLocation}
                        title={`Owner`}
                        description={`Active location`}
                    >
                        <Image source={{ uri: 'https://aicontents.s3.amazonaws.com/ServiceProviderAppData/machinesImages/ownerLocationPin.png' }} style={styles.marker} />
                    </Marker>
                </MapView>
            </View>
            <View>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{text}</Text>
                </View>
                {name !== '' ?
                    <View>
                        <Text style={styles.text}>
                            Captain: {name}
                        </Text>
                        <Button
                            title={phone}
                            icon={{
                                name: "call",
                                type: "materialicons",
                                size: 25,
                                color: "white"
                            }}
                            iconRight
                            onPress={() => Linking.openURL(`tel:${phone.replace(/\D/g, '')}`)}
                        />
                    </View> : <Text>'No RTC available'</Text>

                }

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
    mapContainer: {
        height: screenHeight * 0.6,
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
    map: {
        ...StyleSheet.absoluteFillObject,
        height: screenHeight * 0.7,
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
    text: {
        margin: 15,
        alignSelf: 'center',
        fontSize: 16,
    },
    marker: {
        width: Dimensions.get('window').width * 0.05,
        height: Dimensions.get('window').height * 0.03
    },
});


export default FindingCaptain;
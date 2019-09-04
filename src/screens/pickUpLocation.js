
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    Alert,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import blackIcon from './../images/blackIcon.png';
import blueRing from './../images/blueRing.png';
import { Button } from 'react-native-elements';

const pickUpLocation = ({ navigation }) => {
    var cnic = navigation.getParam('cnic');
    ///////////////////////////hooks/////////////////////////////////
    const [myLat, setLat] = useState(0);
    const [myLng, setLng] = useState(0);
    const [latitudeDelta, setLatitudeDelta] = useState(0.1);
    const [longitudeDelta, setLongitudeDelta] = useState(0.1);
    const [pickUpLat, setPickupLat] = useState(0.1);
    const [pickUpLng, setPickupLng] = useState(0.1);
    useEffect(() => {
        findCoordinates();
    }, []);

    ///////////////////////////////////////getting coordinates///////////////////////////////////////////////////
    var findCoordinates = () => {
        console.log(cnic, 'cccc');
        console.log('called');
        Geolocation.getCurrentPosition(
            position => {
                const latitude = parseFloat(JSON.stringify(position.coords.latitude));
                const longitude = parseFloat(JSON.stringify(position.coords.longitude));
                console.log(position);
                setLat(latitude);
                setLng(longitude);
                setPickupLat(latitude);
                setPickupLng(longitude);
            },
            error => Alert.alert(error.message),
            { timeout: 20000, maximumAge: 10000 }
        );
    };

    ///////////////////////////////onRegionChangerComplete event ///////////////////////////////////////  
    var ftnSelectedCoordinates = region => {
        setPickupLat(region.latitude);
        setPickupLng(region.longitude);
        setLatitudeDelta(region.latitudeDelta);
        setLongitudeDelta(region.longitudeDelta);
        console.log( region.latitude, region.longitude)
    };
    ///////////////////////////////////////////render///////////////////////////////////////////
    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                onRegionChangeComplete={region => {
                    console.log('region: ', region)
                    ftnSelectedCoordinates(region);
                }}
                initialRegion={{
                    latitude: myLat,
                    longitude: myLng,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                region={{
                    latitude: pickUpLat,
                    longitude: pickUpLng,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta,
                }}
            />
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Select PickUp Location</Text>
            </View>
            <View style={styles.bottomBtn}>
                <Button
                    title="SELECT MACINERY"
                    onPress={() => {
                        const coordinates = { 
                            latitude: pickUpLat,
                            longitude: pickUpLng
                        }
                        console.log(cnic);    
                        console.log(coordinates);    
                        navigation.navigate('selectMachinery', {cnic, pickupCoordinates:coordinates});
                    }}
                    buttonStyle = {styles.btnContainer}
                    icon={{
                        name: "navigate-next",
                        type: "materialicons",
                        size: 25,
                        color: "white",
                    }}
                    iconRight
                />
            </View>
            <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                <Image pointerEvents="none" source={blackIcon} />
            </View>
            <View pointerEvents="none" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                <Image style={{ opacity: 0.7}} pointerEvents="none" source={blueRing} />
            </View>
        </View>
    );
};

const imageWidth = Dimensions.get("window").width;
const imageHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    sectionContainer: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    container: {
        height: imageHeight * 0.97,
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    },
    marker: {
        width: 50,
        height: 50,
    },
    headingContainer: {
        height: 80,
        padding: 10,
        opacity: 0.7,
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#4ba1ec',
    },
    heading: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
        textAlign: 'left',
    },
    bottomBtn:{
      width: '100%', 
      height: 50, 
      justifyContent: 'center', 
      alignItems: 'center',
      position: 'absolute',
      bottom: 30,
      opacity: 0.8,
    },
    btnContainer: { 
        width: 250,
        padding: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#4184d0',
        },
});


export default pickUpLocation;


import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
} from 'react-native';
import { Button, Header, Avatar, ListItem, Icon, } from 'react-native-elements';

const leveler = 'https://aicontents.s3.amazonaws.com/ServiceProviderAppData/machinesImages/leveler.jpg';
const cultivator ='https://aicontents.s3.amazonaws.com/ServiceProviderAppData/machinesImages/cultivator.jpeg';
const rotavator = 'https://aicontents.s3.amazonaws.com/ServiceProviderAppData/machinesImages/rotavator.jpg';
const discHarrow = 'https://aicontents.s3.amazonaws.com/ServiceProviderAppData/machinesImages/discharrow.jpeg';
const riceHarvester = 'https://aicontents.s3.amazonaws.com/ServiceProviderAppData/machinesImages/transplanter.jpg';

const selectMachinery = ({ navigation }) => {
    var cnic = navigation.getParam('cnic');
    var pickupCoordinates = navigation.getParam('pickupCoordinates');
    ///////////////////////////hooks/////////////////////////////////
    const [myLat, setLat] = useState(0);
    const Machineries = [
        {
          name: 'Leveler',
          uri: leveler,
        },
        {
          name: 'Rotavator',
          uri: rotavator,
        },
        {
          name: 'Cultivator',
          uri: cultivator,
        },
        {
          name: 'Disc Harrow',
          uri: discHarrow,
        },
        {
          name: 'Rice Harvester',
          uri: riceHarvester,
        },
      ];
    const listItems = Machineries.map( machine => {
        return (
            <ListItem style = {styles.machineryContainer}
                    key = {machine.name}
                    leftAvatar={{ 
                        source: { uri: machine.uri},
                        size: 'large'    
                    }}
                    title= {machine.name}
                    value = {machine.name}
                    chevron = {{
                        color: '#106fc2',
                        size: 40,
                    }}
                    onPress = { () => {
                        console.log('pressed', machine.name );
                        console.log('pressed', machine.uri );
                        console.log('pressed', cnic );
                        console.log('pressed', pickupCoordinates );
                        navigation.navigate('ChooseServiceTime',{cnic, pickupCoordinates, machinery: machine.name, machineryUri: machine.uri})

                    }}
                />
        )
    })


    ///////////////////////////////////////////render///////////////////////////////////////////
    return (
        <View style={{flex: 1}}>
            <Header
                placement="center"
                leftComponent={{ icon: 'chevron-left', color: '#fff',onPress: ( )=>navigation.goBack() }}
                centerComponent={{ text: 'Booking Ride', style: { color: '#fff' } }}
            />
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Select Machinery</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style= {styles.machineriesContainer}>
                    {listItems}
                </View>
            </ScrollView>
        </View>
    );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    sectionContainer: {
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    headingContainer: {
        height: 80,
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
        textAlign: 'left',
    },
    machineriesContainer:{
        backgroundColor: '#fff',
        flex: 1,
    },
    machineryContainer: {
        height: 100,
        padding: 10,
        margin: screenWidth * 0.05,
        opacity: 0.7,
        alignSelf: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#4ba1ec',
        borderRadius: 10,
    },
});


export default selectMachinery;

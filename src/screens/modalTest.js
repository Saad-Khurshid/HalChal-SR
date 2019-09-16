import React, { Component, useState } from "react";
import { Button, Text, View, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";

const modalTest = () => {
    const [visibility, setVisibility] = useState(false);
    const toggleModal = () => {
        if(visibility === false)
            setVisibility(true);
        else
            setVisibility(false);
      };
      return (
        <View style={{ flex: 1 }}>
          <Button title="Show modal" onPress={ () => {
              toggleModal();
              }
              } />
          <Modal isVisible={visibility}>
            <View style={styles.modalContainer}>
              <Text>Hello!</Text>
              <Button title="Hide modal" onPress={ () => {
              toggleModal();
              }
              } />
            </View>
          </Modal>
        </View>
      );
};

////////////////////////////styles//////////////////////////////////
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    modalContainer: {
        marginTop: 25,
        marginBottom: 30,
        height: screenHeight * 0.1,
        padding: 10,
        alignSelf: 'stretch',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        letterSpacing: 3,
    },
});


export default modalTest;

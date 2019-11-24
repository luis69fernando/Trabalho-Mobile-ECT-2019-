import React, {Component} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import { NavigationEvents } from 'react-navigation';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';


export default class Home extends Component {
    sair() {
        auth().signOut().then(function() {
            
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
      };

    render(){
        return(
            <View style={styles.perfilPage}>
                <View style={styles.informaçoes}>
                    <Text style={{color: 'white'}}>
                        Nome
                    </Text>
                </View>
                <View>    
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={this.sair}>SignOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    perfilPage: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    informaçoes: {
        alignItems: 'center',
        width: 300,
        backgroundColor: 'grey',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
       
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        marginBottom: 30,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
})

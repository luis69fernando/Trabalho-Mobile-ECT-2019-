import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import firestore from '@react-native-firebase/firestore';

const extractKey = ({ id }) => id

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            livros: []
        }

        this.getLivros = this.getLivros.bind(this)
    }

    componentDidMount() {
        this.getLivros()
    }

    getLivros() {
        firestore().collection("livros").get()
            .then((querySnapshot) => {
                let livros = []
                querySnapshot.forEach((doc) => {
                    livros.push({id: doc.id,...doc.data()})
                });
                this.setState({ livros: livros })
            })
    }

    renderItem = ({ item }) => {
        return (
           <View style={styles.box}>
                <Text style={styles.livrotitulo}>
                    {item.titulo}
                </Text>
                <Text style={styles.livroautor}>
                Escrito por: {item.autor}
                </Text>
                <Text style={styles.livropreço}>
                Preço: {item.preço}
                </Text>
            </View>
            
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={() => this.getLivros()} />
                <FlatList
                    data={this.state.livros}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    livrotitulo: {
        padding: 15,
        fontSize: 20
    },
    livroautor: {
        padding: 15,
        fontSize: 15
    },
    livropreço: {
        padding: 15,
        fontSize: 15,
        color: 'green'
    },
    box: {
        marginBottom: 5,
        alignItems: 'center',
        backgroundColor: 'white',
    }
})
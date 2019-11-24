import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            titulo:'',
            autor: '',
            preço: 0
        }
        this.cadastrar = this.cadastrar.bind(this)
    }

    componentDidMount() {
    }

    cadastrar() {
        firestore().collection("livros").add({
            titulo: this.state.titulo,
            autor: this.state.autor,
            preço: this.state.preço
        })
        .then(()=>alert('Livro cadastrado com sucesso'))
        .catch(()=>alert('Erro ao cadastrar livro'))
            
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    onChangeText={(titulo) => this.setState({ titulo })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Título"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    onSubmitEditing={() => this.autor.focus()} />

                <TextInput style={styles.inputBox}
                    onChangeText={(autor) => this.setState({ autor })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Autor"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    ref={(input) => this.autor = input}
                />
                <TextInput style={styles.inputBox}
                onChangeText={(preço) => this.setState({ preço })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Preço"
                placeholderTextColor="#002f6c"
                selectionColor="#fff"
                onSubmitEditing={() => this.autor.focus()} />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.cadastrar}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});
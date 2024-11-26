import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';

const CadastroScreen = ({ navigation }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const criarUsuario = () => {
    axios.post('http://100.28.74.101:8080/api/Usuarios', {
      nomeUsuario: nomeUsuario,
      senha: senha
    })
    .then(response => {
      Alert.alert('Usuário criado com sucesso!');
      navigation.navigate('Login');
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Erro ao criar usuário', 'Tente novamente.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        mode="outlined"
        label="Nome"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
        outlineColor='#583FFF'
        outlineStyle={{
          borderWidth: 3,
          borderRadius: 25,
        }}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        outlineColor='#583FFF'
        outlineStyle={{
          borderWidth: 3,
          borderRadius: 25,
        }}
        style={styles.input}
      />

      <Button
        mode="contained"
        style={styles.button}
        onPress={criarUsuario}
        contentStyle={{ padding: 8 }}
      >
        CRIAR
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Comfortaa',
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 40.14,
    letterSpacing: -0.015,
    textAlign: 'left',
    color: '#583FFF',
    marginBottom: 16,
    alignSelf: 'flex-start',
    marginLeft: '10%'
  },
  input: {
    width: '80%',
    marginBottom: 16,
    alignSelf: 'center'
  },
  button: {
    width: '80%',
    backgroundColor: '#583FFF',
    marginVertical: 16,
    alignSelf: 'center'
  },
});

export default CadastroScreen;

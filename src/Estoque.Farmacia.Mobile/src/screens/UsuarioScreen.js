import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';

const UsuarioScreen = ({ navigation }) => {
  const [usuarioLogin, setUsuarioLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const autenticarUsuario = () => {
    axios.post('http://100.28.74.101:8080/api/Usuarios/Autenticar', {
      nomeUsuario: usuarioLogin,
      senha: senhaLogin
    })
    .then(response => {
      Alert.alert('Autenticação bem-sucedida!', 'Token recebido.');
      navigation.navigate('Home');
    })
    .catch(error => {
      console.error(error);
      Alert.alert('Erro na autenticação', 'Verifique suas credenciais.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        mode="outlined"
        label="Nome do usuário"
        value={usuarioLogin}
        onChangeText={setUsuarioLogin}
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
        value={senhaLogin}
        onChangeText={setSenhaLogin}
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
        onPress={autenticarUsuario}
        contentStyle={{ padding: 8 }}
      >
        ENTRAR
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.createAccount}>Criar Conta</Text>
      </TouchableOpacity>
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
  createAccount: {
    color: '#6A5ACD',
    marginTop: 16,
    alignSelf: 'center'
  },
});

export default UsuarioScreen;

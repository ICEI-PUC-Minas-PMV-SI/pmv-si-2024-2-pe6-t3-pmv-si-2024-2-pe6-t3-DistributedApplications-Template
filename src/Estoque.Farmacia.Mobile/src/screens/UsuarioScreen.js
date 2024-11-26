import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const UsuarioScreen = ({ navigation }) => {
  const [usuarioLogin, setUsuarioLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const autenticarUsuario = () => {
    // Lógica de autenticação aqui
    // Após autenticar com sucesso, redirecionar para a página Home
    navigation.navigate('Home');
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
    alignSelf: 'flex-start',  // Alinha o texto à esquerda
    marginLeft: '10%'  // Ajusta o alinhamento com os labels
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

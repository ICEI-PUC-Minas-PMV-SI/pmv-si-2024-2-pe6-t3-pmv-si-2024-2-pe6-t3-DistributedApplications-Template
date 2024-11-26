import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const CadastroScreen = ({ navigation }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const criarUsuario = () => {
    // Lógica de criação de usuário aqui
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
});

export default CadastroScreen;

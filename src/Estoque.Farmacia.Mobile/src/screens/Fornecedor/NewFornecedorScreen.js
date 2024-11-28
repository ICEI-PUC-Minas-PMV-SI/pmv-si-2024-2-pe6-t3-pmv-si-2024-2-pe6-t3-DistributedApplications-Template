import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

const NewFornecedorScreen = ({ navigation }) => {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  // Função para verificar se todos os campos estão preenchidos
  const isFormValid = () => {
    return nomeFantasia && cnpj && telefone && email;
  };

  const handleCadastro = () => {
    if (!isFormValid()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Certifique-se de que a URL da API está correta
    axios
      .post('https://localhost:7208/api/Fornecedores', {
        nomeFantasia,
        cnpj,
        telefone,
        email,
      })
      .then(() => {
        alert('Fornecedor cadastrado com sucesso!');
        navigation.goBack(); // Volta para a tela anterior
      })
      .catch((error) => alert('Erro ao cadastrar fornecedor. Verifique a conexão.'));
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nome Fantasia"
        value={nomeFantasia}
        onChangeText={setNomeFantasia}
        style={styles.input}
      />
      <TextInput
        label="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        style={styles.input}
      />
      <TextInput
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
      />
      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleCadastro}
        style={styles.button}
        disabled={!isFormValid()} // Desabilita o botão se algum campo estiver vazio
      >
        Cadastrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FFF' },
  input: { marginBottom: 12 },
  button: { marginTop: 16 },
});

export default NewFornecedorScreen;

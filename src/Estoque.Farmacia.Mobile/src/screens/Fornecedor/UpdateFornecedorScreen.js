import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import axios from 'axios';
import { TextInput, Button } from "react-native-paper";
import { NativeEventEmitter } from "react-native";

const UpdateFornecedorScreen = ({ route, navigation }) => {
  const { fornecedorId } = route.params;
  const [fornecedor, setFornecedor] = useState({});
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  
  const eventEmmiter = new NativeEventEmitter();

  useEffect(() => {
    fetchFornecedorPorId();
  }, [fornecedorId]);

  const fetchFornecedorPorId = () => {
    const apiUrl = 'http://100.28.74.101:8080/api/Fornecedores';
    axios.get(`${apiUrl}/${fornecedorId}`)
      .then(response => {
        const fornecedorData = response.data;
        setFornecedor(fornecedorData);
        setNomeFantasia(fornecedorData.nomeFantasia);
        setCnpj(fornecedorData.cnpj);
        setEmail(fornecedorData.email);
        setTelefone(fornecedorData.telefone);
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Erro", "Falha ao buscar fornecedor.");
      });
  };

  const atualizarFornecedor = () => {
    const apiUrl = 'http://100.28.74.101:8080/api/Fornecedores';
    axios.put(`${apiUrl}/${fornecedorId}`, {  
      id: fornecedorId,
      nomeFantasia,
      cnpj,
      email,
      telefone
    })
      .then(() => {
        eventEmmiter.emit('updateFornecedorList');
        Alert.alert('Fornecedor atualizado com sucesso!');
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Erro", "Falha ao atualizar fornecedor.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Fornecedor {fornecedorId}</Text>

      <TextInput
        mode="outlined"
        style={styles.input}
        label="Nome Fantasia"
        value={nomeFantasia}
        onChangeText={setNomeFantasia}
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        label="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
        keyboardType="numeric"
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        label="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <Button
        style={!nomeFantasia || !cnpj || !email || !telefone ? styles.submitButtonDisabled : styles.submitButton}
        disabled={!nomeFantasia || !cnpj || !email || !telefone}
        onPress={atualizarFornecedor}
      >
        Atualizar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#583FFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
});

export default UpdateFornecedorScreen;

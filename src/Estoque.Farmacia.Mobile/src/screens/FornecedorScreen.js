import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const FornecedorScreen = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [fornecedorIdBusca, setFornecedorIdBusca] = useState('');
  const [fornecedorIdDelete, setFornecedorIdDelete] = useState('');
  const [fornecedorIdUpdate, setFornecedorIdUpdate] = useState('');

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const fetchFornecedores = () => {
    axios.get('http://100.28.74.101:8080/api/Fornecedores')
      .then(response => setFornecedores(response.data))
      .catch(error => console.error(error));
  };

  const fetchFornecedorPorId = () => {
    if (!fornecedorIdBusca) {
      Alert.alert('Por favor, insira um ID.');
      return;
    }
    axios.get(`http://100.28.74.101:8080/api/Fornecedores/${fornecedorIdBusca}`)
      .then(response => {
        Alert.alert('Fornecedor Encontrado', `Nome Fantasia: ${response.data.nomeFantasia}\nCNPJ: ${response.data.cnpj}\nTelefone: ${response.data.telefone}\nEmail: ${response.data.email}`);
        clearForm();
      })
      .catch(error => {
        console.error(error);
        Alert.alert(error.response && error.response.status === 404 ? 'Fornecedor não encontrado.' : 'Erro ao buscar fornecedor.');
        clearForm();
      });
  };

  const createFornecedor = () => {
    axios.post('http://100.28.74.101:8080/api/Fornecedores', { nomeFantasia, cnpj, telefone, email })
      .then(() => {
        Alert.alert('Fornecedor criado com sucesso!');
        fetchFornecedores();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const updateFornecedor = () => {
    if (!fornecedorIdUpdate) {
      Alert.alert('Por favor, insira um ID para atualizar.');
      return;
    }

    axios.put(`http://100.28.74.101:8080/api/Fornecedores/${fornecedorIdUpdate}`, { id: parseInt(fornecedorIdUpdate), nomeFantasia, cnpj, telefone, email })
      .then(() => {
        Alert.alert('Fornecedor atualizado com sucesso!');
        fetchFornecedores();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const deleteFornecedorPorId = () => {
    if (!fornecedorIdDelete) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`http://100.28.74.101:8080/api/Fornecedores/${fornecedorIdDelete}`)
      .then(() => {
        Alert.alert('Fornecedor deletado com sucesso!');
        fetchFornecedores();
        setFornecedorIdDelete('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao deletar fornecedor.');
      });
  };

  const selectFornecedor = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setFornecedorIdUpdate(fornecedor.id.toString());
    setNomeFantasia(fornecedor.nomeFantasia);
    setCnpj(fornecedor.cnpj);
    setTelefone(fornecedor.telefone);
    setEmail(fornecedor.email);
  };

  const clearForm = () => {
    setSelectedFornecedor(null);
    setNomeFantasia('');
    setCnpj('');
    setTelefone('');
    setEmail('');
    setFornecedorIdBusca('');
    setFornecedorIdUpdate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Fornecedores</Text>

      <Text style={styles.subtitle}>Buscar Fornecedor por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Fornecedor"
        value={fornecedorIdBusca}
        onChangeText={setFornecedorIdBusca}
        keyboardType="numeric"
      />
      <Button title="Buscar por ID" onPress={fetchFornecedorPorId} />

      <Text style={styles.subtitle}>Listar Todos os Fornecedores</Text>
      <Button title="Listar Fornecedores" onPress={fetchFornecedores} />

      <Text style={styles.subtitle}>Criar Novo Fornecedor</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Fantasia"
        value={nomeFantasia}
        onChangeText={setNomeFantasia}
      />
      <TextInput
        style={styles.input}
        placeholder="CNPJ"
        value={cnpj}
        onChangeText={setCnpj}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Criar Fornecedor" onPress={createFornecedor} />

      <Text style={styles.subtitle}>Atualizar Fornecedor</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Fornecedor para Atualização"
        value={fornecedorIdUpdate}
        onChangeText={setFornecedorIdUpdate}
        keyboardType="numeric"
      />
        <TextInput
            style={styles.input}
            placeholder="Nome Fantasia"
            value={nomeFantasia}
            onChangeText={setNomeFantasia}
        />
        <TextInput
            style={styles.input}
            placeholder="CNPJ"
            value={cnpj}
            onChangeText={setCnpj}
        />
        <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
        />
      <Button title="Atualizar Fornecedor" onPress={updateFornecedor} />

      <Text style={styles.subtitle}>Excluir Fornecedor</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Fornecedor para Excluir"
        value={fornecedorIdDelete}
        onChangeText={setFornecedorIdDelete}
        keyboardType="numeric"
      />
      <Button title="Excluir Fornecedor" onPress={deleteFornecedorPorId} color="red" />

      <FlatList
        data={fornecedores}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fornecedorItem}>
            <Text>Nome Fantasia: {item.nomeFantasia}</Text>
            <Text>CNPJ: {item.cnpj}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>Email: {item.email}</Text>
            <Button title="Selecionar" onPress={() => selectFornecedor(item)} />
            <Button title="Deletar" onPress={() => deleteFornecedorPorId(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 16, marginBottom: 8 },
  fornecedorItem: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
});

export default FornecedorScreen;
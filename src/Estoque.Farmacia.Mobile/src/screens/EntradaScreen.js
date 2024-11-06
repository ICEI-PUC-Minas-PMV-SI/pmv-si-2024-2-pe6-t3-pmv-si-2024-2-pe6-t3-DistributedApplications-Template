import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const EntradaScreen = () => {
  const [entradas, setEntradas] = useState([]);
  const [dataEntrada, setDataEntrada] = useState('');
  const [quantidadeRecebida, setQuantidadeRecebida] = useState('');
  const [loteId, setLoteId] = useState('');
  const [entradaIdBusca, setEntradaIdBusca] = useState('');
  const [entradaIdDelete, setEntradaIdDelete] = useState('');
  const [entradaIdUpdate, setEntradaIdUpdate] = useState('');

  useEffect(() => {
    fetchEntradas();
  }, []);

  const fetchEntradas = () => {
    axios.get('http://100.28.74.101:8080/api/Entradas')
      .then(response => setEntradas(response.data))
      .catch(error => console.error(error));
  };

  const fetchEntradaPorId = () => {
    if (!entradaIdBusca) {
      Alert.alert('Por favor, insira um ID.');
      return;
    }

    axios.get(`http://100.28.74.101:8080/api/Entradas/${entradaIdBusca}`)
      .then(response => {
        const entrada = response.data;
        Alert.alert('Entrada Encontrada',
          `ID da Entrada: ${entrada.entrada.id}\n` +
          `Data da Entrada: ${entrada.entrada.dataEntrada}\n` +
          `Quantidade Recebida: ${entrada.entrada.quantidadeRecebida}\n` +
          `Lote ID: ${entrada.lote.id}`
        );
        clearForm();
      })
      .catch(error => {
        console.error(error);
        Alert.alert(error.response && error.response.status === 404 ? 'Entrada não encontrada.' : 'Erro ao buscar entrada.');
        clearForm();
      });
  };

  const criarEntrada = () => {
    axios.post('http://100.28.74.101:8080/api/Entradas', { dataEntrada, quantidadeRecebida, loteId })
      .then(() => {
        Alert.alert('Entrada criada com sucesso!');
        fetchEntradas();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const atualizarEntrada = () => {
    if (!entradaIdUpdate) {
      Alert.alert('Por favor, insira um ID para atualizar.');
      return;
    }

    axios.put(`http://100.28.74.101:8080/api/Entradas/${entradaIdUpdate}`, { id: parseInt(entradaIdUpdate), dataEntrada, quantidadeRecebida, loteId })
      .then(() => {
        Alert.alert('Entrada atualizada com sucesso!');
        fetchEntradas();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const deletarEntradaPorId = () => {
    if (!entradaIdDelete) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`http://100.28.74.101:8080/api/Entradas/${entradaIdDelete}`)
      .then(() => {
        Alert.alert('Entrada deletada com sucesso!');
        fetchEntradas();
        setEntradaIdDelete('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao deletar entrada.');
      });
  };

  const clearForm = () => {
    setDataEntrada('');
    setQuantidadeRecebida('');
    setLoteId('');
    setEntradaIdBusca('');
    setEntradaIdDelete('');
    setEntradaIdUpdate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Entradas</Text>

      <Text style={styles.subtitle}>Buscar Entrada por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Entrada"
        value={entradaIdBusca}
        onChangeText={setEntradaIdBusca}
        keyboardType="numeric"
      />
      <Button title="Buscar por ID" onPress={fetchEntradaPorId} />

      <Text style={styles.subtitle}>Listar Todas as Entradas</Text>
      <Button title="Listar Entradas" onPress={fetchEntradas} />

      <Text style={styles.subtitle}>Criar Nova Entrada</Text>
      <TextInput
        style={styles.input}
        placeholder="Data da Entrada (YYYY-MM-DD)"
        value={dataEntrada}
        onChangeText={setDataEntrada}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade Recebida"
        value={quantidadeRecebida}
        onChangeText={setQuantidadeRecebida}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Lote ID"
        value={loteId}
        onChangeText={setLoteId}
        keyboardType="numeric"
      />
      <Button title="Criar Entrada" onPress={criarEntrada} />

      <Text style={styles.subtitle}>Atualizar Entrada</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Entrada para Atualizar"
        value={entradaIdUpdate}
        onChangeText={setEntradaIdUpdate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data da Entrada (YYYY-MM-DD)"
        value={dataEntrada}
        onChangeText={setDataEntrada}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade Recebida"
        value={quantidadeRecebida}
        onChangeText={setQuantidadeRecebida}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Lote ID"
        value={loteId}
        onChangeText={setLoteId}
        keyboardType="numeric"
      />
      <Button title="Atualizar Entrada" onPress={atualizarEntrada} />

      <Text style={styles.subtitle}>Deletar Entrada</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Entrada para Excluir"
        value={entradaIdDelete}
        onChangeText={setEntradaIdDelete}
        keyboardType="numeric"
      />
      <Button title="Deletar Entrada" onPress={deletarEntradaPorId} color="red" />

      <FlatList
        data={entradas}
        keyExtractor={item => item.entrada.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entradaItem}>
            <Text>{`Entrada ID: ${item.entrada.id}, Lote ID: ${item.lote.id}, Data Entrada: ${item.entrada.dataEntrada}, Quantidade Recebida: ${item.entrada.quantidadeRecebida}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
  entradaItem: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 },
});

export default EntradaScreen;
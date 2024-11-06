import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const SaidaScreen = () => {
  const [saidas, setSaidas] = useState([]);
  const [dataSaida, setDataSaida] = useState('');
  const [quantidadeSaida, setQuantidadeSaida] = useState('');
  const [loteId, setLoteId] = useState('');
  const [saidaIdBusca, setSaidaIdBusca] = useState('');
  const [saidaIdDelete, setSaidaIdDelete] = useState('');
  const [saidaIdUpdate, setSaidaIdUpdate] = useState('');

  useEffect(() => {
    fetchSaidas();
  }, []);

  const fetchSaidas = () => {
    axios.get('http://100.28.74.101:8080/api/Saidas')
      .then(response => setSaidas(response.data))
      .catch(error => console.error(error));
  };

  const fetchSaidaPorId = () => {
    if (!saidaIdBusca) {
      Alert.alert('Por favor, insira um ID.');
      return;
    }

    axios.get(`http://100.28.74.101:8080/api/Saidas/${saidaIdBusca}`)
      .then(response => {
        const saida = response.data;
        Alert.alert('Saída Encontrada',
          `ID da Saída: ${saida.saida.id}\n` +
          `Data da Saída: ${saida.saida.dataSaida}\n` +
          `Quantidade de Saída: ${saida.saida.quantidadeSaida}\n` +
          `Lote ID: ${saida.lote.id}`
        );
        clearForm();
      })
      .catch(error => {
        console.error(error);
        Alert.alert(error.response && error.response.status === 404 ? 'Saída não encontrada.' : 'Erro ao buscar saída.');
        clearForm();
      });
  };

  const criarSaida = () => {
    axios.post('http://100.28.74.101:8080/api/Saidas', { dataSaida, quantidadeSaida, loteId })
      .then(() => {
        Alert.alert('Saída criada com sucesso!');
        fetchSaidas();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const atualizarSaida = () => {
    if (!saidaIdUpdate) {
      Alert.alert('Por favor, insira um ID para atualizar.');
      return;
    }

    axios.put(`http://100.28.74.101:8080/api/Saidas/${saidaIdUpdate}`, { id: parseInt(saidaIdUpdate), dataSaida, quantidadeSaida, loteId })
      .then(() => {
        Alert.alert('Saída atualizada com sucesso!');
        fetchSaidas();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const deletarSaidaPorId = () => {
    if (!saidaIdDelete) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`http://100.28.74.101:8080/api/Saidas/${saidaIdDelete}`)
      .then(() => {
        Alert.alert('Saída deletada com sucesso!');
        fetchSaidas();
        setSaidaIdDelete('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao deletar saída.');
      });
  };

  const clearForm = () => {
    setDataSaida('');
    setQuantidadeSaida('');
    setLoteId('');
    setSaidaIdBusca('');
    setSaidaIdDelete('');
    setSaidaIdUpdate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Saídas</Text>

      <Text style={styles.subtitle}>Buscar Saída por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Saída"
        value={saidaIdBusca}
        onChangeText={setSaidaIdBusca}
        keyboardType="numeric"
      />
      <Button title="Buscar por ID" onPress={fetchSaidaPorId} />

      <Text style={styles.subtitle}>Listar Todas as Saídas</Text>
      <Button title="Listar Saídas" onPress={fetchSaidas} />

      <Text style={styles.subtitle}>Criar Nova Saída</Text>
      <TextInput
        style={styles.input}
        placeholder="Data da Saída (YYYY-MM-DD)"
        value={dataSaida}
        onChangeText={setDataSaida}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade de Saída"
        value={quantidadeSaida}
        onChangeText={setQuantidadeSaida}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Lote ID"
        value={loteId}
        onChangeText={setLoteId}
        keyboardType="numeric"
      />
      <Button title="Criar Saída" onPress={criarSaida} />

      <Text style={styles.subtitle}>Atualizar Saída</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Saída para Atualizar"
        value={saidaIdUpdate}
        onChangeText={setSaidaIdUpdate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data da Saída (YYYY-MM-DD)"
        value={dataSaida}
        onChangeText={setDataSaida}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade de Saída"
        value={quantidadeSaida}
        onChangeText={setQuantidadeSaida}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Lote ID"
        value={loteId}
        onChangeText={setLoteId}
        keyboardType="numeric"
      />
      <Button title="Atualizar Saída" onPress={atualizarSaida} />

      <Text style={styles.subtitle}>Deletar Saída</Text>
      <TextInput
        style={styles.input}
        placeholder="ID da Saída para Excluir"
        value={saidaIdDelete}
        onChangeText={setSaidaIdDelete}
        keyboardType="numeric"
      />
      <Button title="Deletar Saída" onPress={deletarSaidaPorId} color="red" />

      <FlatList
        data={saidas}
        keyExtractor={item => item.saida.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.saidaItem}>
            <Text>{`Saída ID: ${item.saida.id}, Lote ID: ${item.lote.id}, Data Saída: ${item.saida.dataSaida}, Quantidade Saída: ${item.saida.quantidadeSaida}`}</Text>
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
  saidaItem: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 },
});

export default SaidaScreen;
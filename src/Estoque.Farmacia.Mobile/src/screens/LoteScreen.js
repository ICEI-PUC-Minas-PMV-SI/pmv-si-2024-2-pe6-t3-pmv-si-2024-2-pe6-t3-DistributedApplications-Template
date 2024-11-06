import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const LoteScreen = () => {
  const [lotes, setLotes] = useState([]);
  const [quantidade, setQuantidade] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [medicamentoId, setMedicamentoId] = useState('');
  const [loteIdBusca, setLoteIdBusca] = useState('');
  const [loteIdDelete, setLoteIdDelete] = useState('');
  const [loteIdUpdate, setLoteIdUpdate] = useState('');

  useEffect(() => {
    fetchLotes();
  }, []);

  const fetchLotes = () => {
    axios.get('http://100.28.74.101:8080/api/Lotes')
      .then(response => setLotes(response.data))
      .catch(error => console.error(error));
  };

  const fetchLotePorId = () => {
    if (!loteIdBusca) {
      Alert.alert('Por favor, insira um ID.');
      return;
    }

    axios.get(`http://100.28.74.101:8080/api/Lotes/${loteIdBusca}`)
      .then(response => {
        const lote = response.data;
        Alert.alert('Lote Encontrado',
          `ID do Lote: ${lote.id}\n` +
          `Quantidade: ${lote.quantidade}\n` +
          `Data de Fabricação: ${lote.dataFabricacao}\n` +
          `Data de Validade: ${lote.dataValidade}\n` +
          `Medicamento ID: ${lote.medicamentoId}`
        );
        clearForm();
      })
      .catch(error => {
        console.error(error);
        Alert.alert(error.response && error.response.status === 404 ? 'Lote não encontrado.' : 'Erro ao buscar lote.');
        clearForm();
      });
  };

  const criarLote = () => {
    axios.post('http://100.28.74.101:8080/api/Lotes', { quantidade, dataFabricacao, dataValidade, medicamentoId })
      .then(() => {
        Alert.alert('Lote criado com sucesso!');
        fetchLotes();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const atualizarLote = () => {
    if (!loteIdUpdate) {
      Alert.alert('Por favor, insira um ID para atualizar.');
      return;
    }

    axios.put(`http://100.28.74.101:8080/api/Lotes/${loteIdUpdate}`, { id: parseInt(loteIdUpdate), quantidade, dataFabricacao, dataValidade, medicamentoId })
      .then(() => {
        Alert.alert('Lote atualizado com sucesso!');
        fetchLotes();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const deletarLotePorId = () => {
    if (!loteIdDelete) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`http://100.28.74.101:8080/api/Lotes/${loteIdDelete}`)
      .then(() => {
        Alert.alert('Lote deletado com sucesso!');
        fetchLotes();
        setLoteIdDelete('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao deletar lote.');
      });
  };

  const clearForm = () => {
    setQuantidade('');
    setDataFabricacao('');
    setDataValidade('');
    setMedicamentoId('');
    setLoteIdBusca('');
    setLoteIdDelete('');
    setLoteIdUpdate('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Lotes</Text>

      <Text style={styles.subtitle}>Buscar Lote por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Lote"
        value={loteIdBusca}
        onChangeText={setLoteIdBusca}
        keyboardType="numeric"
      />
      <Button title="Buscar por ID" onPress={fetchLotePorId} />

      <Text style={styles.subtitle}>Listar Todos os Lotes</Text>
      <Button title="Listar Lotes" onPress={fetchLotes} />

      <Text style={styles.subtitle}>Criar Novo Lote</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Fabricação (YYYY-MM-DD)"
        value={dataFabricacao}
        onChangeText={setDataFabricacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Validade (YYYY-MM-DD)"
        value={dataValidade}
        onChangeText={setDataValidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Medicamento ID"
        value={medicamentoId}
        onChangeText={setMedicamentoId}
        keyboardType="numeric"
      />
      <Button title="Criar Lote" onPress={criarLote} />

      <Text style={styles.subtitle}>Atualizar Lote</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Lote para Atualizar"
        value={loteIdUpdate}
        onChangeText={setLoteIdUpdate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Fabricação (YYYY-MM-DD)"
        value={dataFabricacao}
        onChangeText={setDataFabricacao}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Validade (YYYY-MM-DD)"
        value={dataValidade}
        onChangeText={setDataValidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Medicamento ID"
        value={medicamentoId}
        onChangeText={setMedicamentoId}
        keyboardType="numeric"
      />
      <Button title="Atualizar Lote" onPress={atualizarLote} />

      <Text style={styles.subtitle}>Deletar Lote</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Lote para Excluir"
        value={loteIdDelete}
        onChangeText={setLoteIdDelete}
        keyboardType="numeric"
      />
      <Button title="Deletar Lote" onPress={deletarLotePorId} color="red" />

      <FlatList
        data={lotes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.loteItem}>
            <Text>{`Lote ID: ${item.id}, Medicamento ID: ${item.medicamentoId}, Quantidade: ${item.quantidade}, Data de Fabricação: ${item.dataFabricacao}, Data de Validade: ${item.dataValidade}`}</Text>
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
    loteItem: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 },
});

export default LoteScreen;
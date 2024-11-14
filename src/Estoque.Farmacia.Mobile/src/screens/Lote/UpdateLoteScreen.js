import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import axios from 'axios';

const UpdateLoteScreen = () => {
  const [loteIdUpdate, setLoteIdUpdate] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [medicamentoId, setMedicamentoId] = useState('');

  const fetchLotePorId = () => {
    if (!loteIdBusca) {
      Alert.alert('Por favor, insira um ID.');
      return;
    }

    axios.get(`http://localhost:5000/api/Lotes/${loteIdBusca}`)
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

  const atualizarLote = () => {
    if (!loteIdUpdate) {
      Alert.alert('Por favor, insira um ID para atualizar.');
      return;
    }

    axios.put(`http://localhost:5000/api/Lotes/${loteIdUpdate}`, { id: parseInt(loteIdUpdate), quantidade, dataFabricacao, dataValidade, medicamentoId })
      .then(() => {
        Alert.alert('Lote atualizado com sucesso!');
        fetchLotes();
        clearForm();
      })
      .catch(error => console.error(error));
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
    <View>
      <Text style={styles.subtitle}>Atualizar Lote</Text>
      <Text style={styles.subtitle}>Buscar Lote por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Lote"
        value={loteIdBusca}
        onChangeText={setLoteIdBusca}
        keyboardType="numeric"
      />
      <Button title="Buscar por ID" onPress={fetchLotePorId} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 12, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
  loteItem: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 },
});

export default UpdateLoteScreen;

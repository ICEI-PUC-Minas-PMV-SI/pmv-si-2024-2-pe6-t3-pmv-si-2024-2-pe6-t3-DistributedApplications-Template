import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const MedicamentoScreen = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [nomeComercial, setNomeComercial] = useState('');
  const [precoCusto, setPrecoCusto] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [imagem, setImagem] = useState(null);
  const [medicamentoIdBusca, setMedicamentoIdBusca] = useState('');
  const [medicamentoIdDelete, setMedicamentoIdDelete] = useState('');
  const [medicamentoIdUpdate, setMedicamentoIdUpdate] = useState('');
  const [estoqueMedicamentoId, setEstoqueMedicamentoId] = useState('');

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = () => {
    axios.get('http://100.28.74.101:8080/api/Medicamentos')
      .then(response => setMedicamentos(response.data))
      .catch(error => console.error(error));
  };

  const fetchMedicamentoPorId = () => {
    if (!medicamentoIdBusca) {
      Alert.alert('Por favor, insira um ID.');
      return;
    }

    axios.get(`http://100.28.74.101:8080/api/Medicamentos/${medicamentoIdBusca}`)
      .then(response => {
        const medicamento = response.data;
        Alert.alert('Medicamento Encontrado',
          `Nome Comercial: ${medicamento.medicamento.nomeComercial}\n` +
          `Preço de Custo: ${medicamento.medicamento.precoCusto}\n` +
          `Preço de Venda: ${medicamento.medicamento.precoVenda}\n` +
          `Fornecedor ID: ${medicamento.fornecedor.id}\n`
        );
        clearForm();
      })
      .catch(error => {
        console.error(error);
        Alert.alert(error.response && error.response.status === 404 ? 'Medicamento não encontrado.' : 'Erro ao buscar medicamento.');
        clearForm();
      });
  };

  const obterEstoqueMedicamento = () => {
    if (!estoqueMedicamentoId) {
      Alert.alert('Por favor, insira o ID do medicamento.');
      return;
    }

    axios.get(`http://100.28.74.101:8080/api/Medicamentos/${estoqueMedicamentoId}/estoque`)
      .then(response => {
        Alert.alert('Estoque', `O estoque atual do medicamento é: ${response.data}`);
      })
      .catch(error => {
        console.error("Erro ao obter estoque:", error);
        Alert.alert('Erro ao obter estoque', 'Verifique o ID do medicamento.');
      });
  };

  const criarMedicamento = async () => {
    const formData = new FormData();
    formData.append('nomeComercial', nomeComercial);
    formData.append('precoCusto', precoCusto);
    formData.append('precoVenda', precoVenda);
    formData.append('fornecedorId', fornecedorId);

    if (imagem) {
      formData.append('imagem', {
        uri: imagem.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      await axios.post('http://100.28.74.101:8080/api/Medicamentos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Medicamento criado com sucesso!');
      fetchMedicamentos();
      clearForm();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao criar medicamento.');
    }
  };

  const atualizarMedicamento = async () => {
    if (!medicamentoIdUpdate) {
      Alert.alert('Por favor, insira um ID para atualizar.');
      return;
    }

    const formData = new FormData();
    formData.append('id', medicamentoIdUpdate);
    formData.append('nomeComercial', nomeComercial);
    formData.append('precoCusto', precoCusto);
    formData.append('precoVenda', precoVenda);
    formData.append('fornecedorId', fornecedorId);

    if (imagem) {
      formData.append('imagem', {
        uri: imagem.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      await axios.put(`http://100.28.74.101:8080/api/Medicamentos/${medicamentoIdUpdate}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Medicamento atualizado com sucesso!');
      fetchMedicamentos();
      clearForm();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      Alert.alert('Erro ao atualizar medicamento.');
    }
  };

  const deletarMedicamentoPorId = () => {
    if (!medicamentoIdDelete) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`http://100.28.74.101:8080/api/Medicamentos/${medicamentoIdDelete}`)
      .then(() => {
        Alert.alert('Medicamento deletado com sucesso!');
        fetchMedicamentos();
        setMedicamentoIdDelete('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao deletar medicamento.');
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0]);
    }
  };

  const clearForm = () => {
    setNomeComercial('');
    setPrecoCusto('');
    setPrecoVenda('');
    setFornecedorId('');
    setImagem(null);
    setMedicamentoIdBusca('');
    setMedicamentoIdDelete('');
    setMedicamentoIdUpdate('');
    setEstoqueMedicamentoId('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Medicamentos</Text>

      {/* Buscar Medicamento por ID */}
      <Text style={styles.subtitle}>Buscar Medicamento por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Medicamento"
        value={medicamentoIdBusca}
        onChangeText={setMedicamentoIdBusca}
        keyboardType="numeric"
      />
      <Button title="Buscar por ID" onPress={fetchMedicamentoPorId} />

      {/* Listar Todos os Medicamentos */}
      <Text style={styles.subtitle}>Listar Todos os Medicamentos</Text>
      <Button title="Listar Medicamentos" onPress={fetchMedicamentos} />

      {/* Criar Novo Medicamento */}
      <Text style={styles.subtitle}>Criar Novo Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Comercial"
        value={nomeComercial}
        onChangeText={setNomeComercial}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço de Custo"
        value={precoCusto}
        onChangeText={setPrecoCusto}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Preço de Venda"
        value={precoVenda}
        onChangeText={setPrecoVenda}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fornecedor ID"
        value={fornecedorId}
        onChangeText={setFornecedorId}
        keyboardType="numeric"
      />
      <Button title="Escolher Imagem" onPress={pickImage} />
      {imagem && <Image source={{ uri: imagem.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Criar Medicamento" onPress={criarMedicamento} />

      {/* Atualizar Medicamento */}
      <Text style={styles.subtitle}>Atualizar Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Medicamento para Atualizar"
        value={medicamentoIdUpdate}
        onChangeText={setMedicamentoIdUpdate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome Comercial"
        value={nomeComercial}
        onChangeText={setNomeComercial}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço de Custo"
        value={precoCusto}
        onChangeText={setPrecoCusto}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Preço de Venda"
        value={precoVenda}
        onChangeText={setPrecoVenda}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fornecedor ID"
        value={fornecedorId}
        onChangeText={setFornecedorId}
        keyboardType="numeric"
      />
      <Button title="Escolher Imagem" onPress={pickImage} />
      {imagem && <Image source={{ uri: imagem.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Atualizar Medicamento" onPress={atualizarMedicamento} />

      {/* Deletar Medicamento */}
      <Text style={styles.subtitle}>Deletar Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Medicamento para Excluir"
        value={medicamentoIdDelete}
        onChangeText={setMedicamentoIdDelete}
        keyboardType="numeric"
      />
      <Button title="Deletar Medicamento" onPress={deletarMedicamentoPorId} color="red" />

      {/* Obter Estoque de Medicamento */}
      <Text style={styles.subtitle}>Obter Estoque de Medicamento</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Medicamento"
        value={estoqueMedicamentoId}
        onChangeText={setEstoqueMedicamentoId}
        keyboardType="numeric"
      />
      <Button title="Obter Estoque" onPress={obterEstoqueMedicamento} />

      {/* FlatList de Medicamentos */}
      <FlatList
        data={medicamentos}
        keyExtractor={item => item.medicamento.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.medicamentoItem}>
            <Text>Nome Comercial: {item.medicamento.nomeComercial}</Text>
            <Text>Preço de Custo: {item.medicamento.precoCusto}</Text>
            <Text>Preço de Venda: {item.medicamento.precoVenda}</Text>
            <Text>Fornecedor: {item.fornecedor.nomeFantasia}</Text>
            {item.medicamento.imagem && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.medicamento.imagem}` }}
                style={styles.imagemMedicamento}
              />
            )}
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
  medicamentoItem: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 },
  imagemMedicamento: { width: 100, height: 100, marginTop: 8, resizeMode: 'contain' },
});

export default MedicamentoScreen;
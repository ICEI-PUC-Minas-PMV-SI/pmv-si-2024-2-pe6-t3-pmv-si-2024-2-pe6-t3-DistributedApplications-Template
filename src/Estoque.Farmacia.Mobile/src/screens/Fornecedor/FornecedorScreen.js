import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, NativeEventEmitter } from 'react-native';
import axios from 'axios';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';



const FornecedorScreen = ({ navigation }) => {
  const [fornecedores, setFornecedores] = useState([]);
  const [initialFornecedores, setInitialFornecedores] = useState([]);
  const [searchFornecedores, setSearchFornecedores] = useState('');

  // URL da API - Substitua pelo IP ou domínio correto
  const apiUrl = 'https://localhost:7208/api/Fornecedores'; // URL da sua API

  // Carrega os fornecedores toda vez que a tela for exibida
  useFocusEffect(
    React.useCallback(() => {
      fetchFornecedores();
    }, []) // A função de busca será chamada sempre que a tela estiver em foco
  );

  // Busca os fornecedores na API
  const fetchFornecedores = () => {
    axios
      .get(apiUrl, {
        headers: {
          'accept': 'application/json', // Defina o tipo de aceitação correto
        }
      })
      .then((response) => {
        setFornecedores(response.data);
        setInitialFornecedores(response.data);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Erro ao buscar fornecedores. Verifique a conexão com o servidor.');
      });
  };

  // Função para buscar fornecedores pelo texto digitado
  const search = (newValue) => {
    setSearchFornecedores(newValue);
    const lowerText = newValue.toLowerCase();
    const filteredFornecedores = initialFornecedores.filter(
      (item) =>
        item.nomeFantasia?.toLowerCase().includes(lowerText) ||
        item.cnpj?.toLowerCase().includes(lowerText) ||
        item.telefone.includes(lowerText)
    );
    setFornecedores(filteredFornecedores);
  };

 
   const deleteFornecedorPorId = (id) => {
    if (!id) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`https://localhost:7208/api/Fornecedores/${id}`)
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


  return (
    <View style={styles.container}>
      {/* Cabeçalho com título e botão de cadastrar */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fornecedores</Text>
        <Button
          mode="contained"
          contentStyle={styles.titleButtonContent}
          style={styles.titleButton}
          onPress={() => navigation.navigate('Cadastrar Fornecedor')}
        >
          Cadastrar
        </Button>
      </View>

      {/* Campo de busca */}
      <TextInput
        mode="outlined"
        label="Buscar..."
        value={searchFornecedores}
        onChangeText={search}
        outlineColor="#583FFF"
        style={styles.search}
      />

      {/* Lista de fornecedores */}
      <FlatList
        data={fornecedores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.fornecedorItem}>
            {/* Informações do fornecedor */}
            <View style={styles.fornecedorInfo}>
              <Text style={styles.fornecedorInfoTitle}>{`Fornecedor ID: ${item.id}`}</Text>
              <Text style={styles.fornecedorInfoText}>
                Nome Fantasia: {item.nomeFantasia || 'Não informado'}
              </Text>
              <Text style={styles.fornecedorInfoText}>
                CNPJ: {item.cnpj || 'Não informado'}
              </Text>
              <Text style={styles.fornecedorInfoText}>
                Telefone: {item.telefone}
              </Text>
              <Text style={styles.fornecedorInfoText}>
                E-mail: {item.email || 'Não informado'}
              </Text>
            </View>

            {/* Botões de ação */}
            <View style={styles.fornecedorActionsContainer}>
              <IconButton
                icon="pencil"
                size={20}
                color="#FFF"
                style={styles.fornecedorActionButton}
                onPress={() => navigation.navigate('Editar Fornecedor', { fornecedorId: item.id })}
              />
              <IconButton
                icon="delete"
                size={20}
                color="#FFF"
                style={styles.fornecedorActionButton}
                onPress={() => deleteFornecedorPorId(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    flexGrow: 1,
    fontSize: 32,
    color: '#583FFF',
  },
  titleButton: {
    backgroundColor: '#E2E7FF',
  },
  titleButtonContent: {
    flexDirection: 'row-reverse',
  },
  search: {
    marginBottom: 12,
    borderRadius: 25,
  },
  fornecedorItem: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  fornecedorInfo: {
    flex: 1,
  },
  fornecedorInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 4,
  },
  fornecedorInfoText: {
    fontSize: 14,
    color: '#252525',
    marginBottom: 4,
  },
  fornecedorActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fornecedorActionButton: {
    backgroundColor: '#583FFF',
    borderRadius: 25,
    marginLeft: 8,
  },
});

export default FornecedorScreen;

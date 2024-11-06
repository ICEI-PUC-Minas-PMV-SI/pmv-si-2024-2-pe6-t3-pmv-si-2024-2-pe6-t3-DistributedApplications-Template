import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const UsuarioScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarioIdBusca, setUsuarioIdBusca] = useState('');
  const [usuarioIdDelete, setUsuarioIdDelete] = useState('');
  const [usuarioIdUpdate, setUsuarioIdUpdate] = useState('');
  const [usuarioLogin, setUsuarioLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    axios.get('http://100.28.74.101:8080/api/Usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error(error));
  };

  const fetchUsuarioPorId = () => {
    if (!usuarioIdBusca) {
      Alert.alert('Por favor, insira um ID.');
      return;
    }
    axios.get(`http://100.28.74.101:8080/api/Usuarios/${usuarioIdBusca}`)
      .then(response => {
        Alert.alert('Usuário Encontrado', `Nome de Usuário: ${response.data.nomeUsuario}`);
        clearForm();
      })
      .catch(error => {
        console.error(error);
        Alert.alert(error.response && error.response.status === 404 ? 'Usuário não encontrado.' : 'Erro ao buscar usuário.');
        clearForm();
      });
  };

  const criarUsuario = () => {
    axios.post('http://100.28.74.101:8080/api/Usuarios', { nomeUsuario, senha })
      .then(() => {
        Alert.alert('Usuário criado com sucesso!');
        fetchUsuarios();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const atualizarUsuario = () => {
    if (!usuarioIdUpdate) {
      Alert.alert('Por favor, insira um ID para atualizar.');
      return;
    }

    axios.put(`http://100.28.74.101:8080/api/Usuarios/${usuarioIdUpdate}`, { id: parseInt(usuarioIdUpdate), nomeUsuario })
      .then(() => {
        Alert.alert('Usuário atualizado com sucesso!');
        fetchUsuarios();
        clearForm();
      })
      .catch(error => console.error(error));
  };

  const deletarUsuarioPorId = () => {
    if (!usuarioIdDelete) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`http://100.28.74.101:8080/api/Usuarios/${usuarioIdDelete}`)
      .then(() => {
        Alert.alert('Usuário deletado com sucesso!');
        fetchUsuarios();
        setUsuarioIdDelete('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao deletar usuário.');
      });
  };

  const autenticarUsuario = () => {
    axios.post('http://100.28.74.101:8080/api/Usuarios/Autenticar', { nomeUsuario: usuarioLogin, senha: senhaLogin })
      .then(response => {
        setAuthToken(response.data);
        Alert.alert('Autenticação bem-sucedida!', 'Token recebido.');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro na autenticação', 'Verifique suas credenciais.');
        setAuthToken('');
      });
  };

  const clearForm = () => {
    setNomeUsuario('');
    setSenha('');
    setUsuarioIdBusca('');
    setUsuarioIdUpdate('');
    setUsuarioIdDelete('');
    setUsuarioLogin('');
    setSenhaLogin('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Usuários</Text>

      <Text style={styles.subtitle}>Buscar Usuário por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Usuário"
        value={usuarioIdBusca}
        onChangeText={setUsuarioIdBusca}
        keyboardType="numeric"
      />
      <Button title="Buscar por ID" onPress={fetchUsuarioPorId} />

      <Text style={styles.subtitle}>Listar Todos os Usuários</Text>
      <Button title="Listar Usuários" onPress={fetchUsuarios} />

      <Text style={styles.subtitle}>Criar Novo Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Criar Usuário" onPress={criarUsuario} />

      <Text style={styles.subtitle}>Atualizar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Usuário para Atualizar"
        value={usuarioIdUpdate}
        onChangeText={setUsuarioIdUpdate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Novo Nome de Usuário"
        value={nomeUsuario}
        onChangeText={setNomeUsuario}
      />
      <Button title="Atualizar Usuário" onPress={atualizarUsuario} />

      <Text style={styles.subtitle}>Excluir Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do Usuário para Excluir"
        value={usuarioIdDelete}
        onChangeText={setUsuarioIdDelete}
        keyboardType="numeric"
      />
      <Button title="Excluir Usuário" onPress={deletarUsuarioPorId} color="red" />

      <Text style={styles.subtitle}>Autenticar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={usuarioLogin}
        onChangeText={setUsuarioLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senhaLogin}
        onChangeText={setSenhaLogin}
        secureTextEntry
      />
      <Button title="Autenticar" onPress={autenticarUsuario} />

      {authToken ? (
        <View>
          <Text style={styles.tokenText}>Token: {authToken}</Text>
        </View>
      ) : null}

      <FlatList
        data={usuarios}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.usuarioItem}>
            <Text>Nome de Usuário: {item.nomeUsuario}</Text>
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
  usuarioItem: { marginBottom: 12, borderWidth: 1, borderColor: '#ccc', padding: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
  tokenText: { marginTop: 8, fontWeight: 'bold' },
});

export default UsuarioScreen;
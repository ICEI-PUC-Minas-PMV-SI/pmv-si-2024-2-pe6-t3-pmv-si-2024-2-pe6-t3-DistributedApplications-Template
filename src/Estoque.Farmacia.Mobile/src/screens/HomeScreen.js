import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Acesse as sessões através dos botões abaixo</Text>
      <Button style={styles.button} onPress={() => navigation.navigate('Fornecedor')}>
        <Text style={styles.buttonText}>Fornecedores</Text>
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate('Lote')}>
        <Text style={styles.buttonText}>Lotes</Text>
      </Button>
      <Button style={styles.button} onPress={() => navigation.navigate('Usuario')}>
        <Text style={styles.buttonText}>Usuário</Text>
      </Button>      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#583FFF',
    paddingBottom: 8
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#583FFF',
    paddingBottom: 16
  },
  button: {
    backgroundColor: '#583FFF',
    borderRadius: 10,    
    marginBottom: 12
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF'
  }
});

export default HomeScreen;

import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Bem-vindo ao Estoque Farmácia</Text>
      <Button title="Fornecedor" onPress={() => navigation.navigate('Fornecedor')} />
      <Button title="Usuário" onPress={() => navigation.navigate('Usuario')} />
      <Button title="Lote" onPress={() => navigation.navigate('Lote')} />
    </View>
  );
};

export default HomeScreen;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import FornecedorScreen from './src/screens/FornecedorScreen';
import MedicamentoScreen from './src/screens/MedicamentoScreen';
import UsuarioScreen from './src/screens/UsuarioScreen';
import EntradaScreen from './src/screens/EntradaScreen';
import SaidaScreen from './src/screens/SaidaScreen';
import LoteScreen from './src/screens/LoteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Fornecedor" component={FornecedorScreen} />
        <Stack.Screen name="Medicamento" component={MedicamentoScreen} />
        <Stack.Screen name="Usuario" component={UsuarioScreen} />
        <Stack.Screen name="Entrada" component={EntradaScreen} />
        <Stack.Screen name="Saida" component={SaidaScreen} />
        <Stack.Screen name="Lote" component={LoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

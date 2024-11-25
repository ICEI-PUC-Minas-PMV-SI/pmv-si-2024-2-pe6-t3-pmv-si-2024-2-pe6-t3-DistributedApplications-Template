import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, Image, NativeEventEmitter } from 'react-native';
import axios from 'axios';
import { Button, Icon, TextInput } from 'react-native-paper';
import dayjs from 'dayjs';
import { TouchableOpacity } from 'react-native';

const LoteScreen = ({ navigation }) => {
  const [lotes, setLotes] = useState([]);
  const [initialLotes, setInitialLotes] = useState([]);
  const [searchLotes, setSearchLotes] = useState('');
  const eventEmmiter = new NativeEventEmitter();

  useEffect(() => {
    fetchLotes();
    eventEmmiter.addListener('updateLoteList', () => {
      fetchLotes();
    })
  }, []);

  const fetchLotes = () => {
    axios.get('http://localhost:5000/api/Lotes')
      .then(response => {
        setLotes(response.data);
        setInitialLotes(response.data);
      })
      .catch(error => console.error(error));
  };

  const search = (newValue) => {
    setSearchLotes(newValue);

    const lowerText = newValue.toLowerCase();
    const newList = initialLotes.filter((item) => {
      return item.medicamento && (item.medicamento.nomeComercial.toLowerCase().indexOf(lowerText) > -1 || item.id.toString().indexOf(lowerText) > -1);
    });

    setLotes(newList);
  }

  const deletarLotePorId = (id) => {
    if (!id) {
      Alert.alert('Por favor, insira um ID para exclusão.');
      return;
    }

    axios.delete(`http://localhost:5000/api/Lotes/${id}`)
      .then(() => {
        Alert.alert('Lote deletado com sucesso!');
        fetchLotes();
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro ao deletar lote.');
      });
  };  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lotes</Text>
        <Button 
          mode="contained" 
          contentStyle={{flexDirection: 'row-reverse'}}
          style={styles.titleButton}
          onPress={() => navigation.navigate('Cadastrar Lote')}
        >
          <Text style={styles.titleButtonText}>Cadastrar</Text>
          <Icon
            source="pencil"
            color={'#583FFF'}
            size={18}
          />
        </Button>
      </View>
      <TextInput
        mode="outlined"
        label="Buscar..."
        value={searchLotes}
        onChangeText={search}
        outlineColor='#583FFF'
        outlineStyle={{
          borderWidth: 3,
          borderRadius: 25
        }}
        style={styles.search}
      />
      <FlatList
        data={lotes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.loteItem}>
            {
              item.medicamento?.imagem ? (
                <Image
                  style={styles.image}
                  source={{ uri: `data:image/png;base64,${item.medicamento?.imagem}` }}
                />
              ) : (
                <TouchableOpacity 
                  style={styles.no_image}
                  onPress={() => console.log('Pressed')}
                >
                  <Icon
                    source="image-off"
                    color={'#252525'}
                    size={28}
                  />
                  <Text style={styles.no_image_text}>Sem imagem</Text>
                </TouchableOpacity>
              )
            }
            <View style={styles.loteInfo}>
              <Text style={styles.loteInfoTitle}>{`Lote: ${item.id}`}</Text>
              <Text style={styles.loteInfoText}>{`Medicamento: ${item.medicamento?.nomeComercial}`}</Text>
              <Text style={styles.loteInfoText}>{`Validade: ${dayjs(item.dataValidade).format('DD/MM/YYYY')}`}</Text>
            </View>
            <View style={styles.loteActionsContainer}>
              <TouchableOpacity 
                style={styles.loteActionButton}
                onPress={() => navigation.navigate('Editar Lote', {
                  loteId: item.id
                })}
              >
                <Icon
                  source="pencil"
                  color={'#FFF'}
                  size={18}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.loteActionButton}
                onPress={() => deletarLotePorId(item.id)}
              >
                <Icon
                  source="delete"
                  color={'#FFF'}
                  size={18}
                />
              </TouchableOpacity>
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
      backgroundColor: '#FFF'
    },
    titleContainer: { 
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16
    },
    title: { 
      flexGrow: 1,    
      fontSize: 32,
      color: '#583FFF'
    },
    titleButton: {
      backgroundColor: '#E2E7FF'
    },
    titleButtonText: {
      color: '#583FFF',
      paddingRight: 6
    },
    search: {
      marginBottom: 12,
    },
    loteItem: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#EEE',
      borderRadius: 15,
      padding: 8,
      marginBottom: 12,
    },
    image: {
      height: '100%',
      width: '30%',
      objectFit: 'cover',
      borderRadius: 10,
      marginRight: 8
    },
    no_image: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12
    },
    no_image_text: {
      fontSize: 16,
      textAlign: 'center'
    },
    loteInfo: {
      width: '30%',
      flexDirection: 'column',
      flexGrow: 1
    },
    loteInfoTitle: {   
      fontSize: 18,
      fontWeight: 'bold',
      color: '#252525',
      paddingBottom: 6
    },
    loteInfoText: {   
      fontSize: 12,
      color: '#252525'
    },
    loteActionsContainer: {
      width: '30%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      rowGap: 6
    },
    loteActionButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#583FFF',
      alignItems: 'center',
      justifyContent: 'center',     
    }
});

export default LoteScreen;
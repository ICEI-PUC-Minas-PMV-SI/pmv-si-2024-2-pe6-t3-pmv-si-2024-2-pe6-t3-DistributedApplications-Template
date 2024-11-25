import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, NativeEventEmitter } from "react-native";
import axios from 'axios';
import { TextInput, Modal, Button, Portal, PaperProvider } from "react-native-paper";
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from "dayjs";

const UpdateLoteScreen = ({ route }) => {
  const { loteId } = route.params;
  const [lote, setLote] = useState({});
  const [quantidade, setQuantidade] = useState('');
  const [medicamento, setMedicamento] = useState('');
  const [medicamentoId, setMedicamentoId] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState(dayjs());
  const [dataFabricacaoPicked, setDataFabricacaoPicked] = useState(false);
  const [dataValidade, setDataValidade] = useState(dayjs());
  const [dataValidadePicked, setDataValidadePicked] = useState(false);
  const [showDataFabricacaoModal, setShowDataFabricacaoModal] = useState(false);
  const [showDataValidadeModal, setShowDataValidadeModal] = useState(false);
  const eventEmmiter = new NativeEventEmitter();

  useEffect(() => {
    fetchLotePorId();
  }, []);

  const fetchLotePorId = () => {
    axios.get(`http://localhost:5000/api/Lotes/${loteId}`)
      .then(response => {
        const lote = response.data;
        setLote(lote);
        setQuantidade(lote.quantidade);
        setMedicamento(lote.medicamento.nomeComercial);
        setMedicamentoId(lote.medicamento.id);
        setDataFabricacao(dayjs(lote.dataFabricacao));
        setDataFabricacaoPicked(true);
        setDataValidade(dayjs(lote.dataValidade));
        setDataValidadePicked(true);
      })
      .catch(error => console.error(error));
  };

  const atualizarLote = () => {
    axios.put(`http://localhost:5000/api/Lotes/${loteId}`, { id: parseInt(loteId), quantidade, dataFabricacao, dataValidade, medicamentoId })
      .then(() => {
        eventEmmiter.emit('updateLoteList');
        Alert.alert('Lote atualizado com sucesso!');
      })
      .catch(error => console.error(error));
  };

  return (
    <PaperProvider>
    <View style={styles.container}>      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Editar Lote {loteId}</Text>        
      </View>
      <TextInput
        mode="outlined"
        style={styles.inputDisabled}
        outlineColor='#583FFF'
        outlineStyle={{
          borderWidth: 3,
          borderRadius: 25
        }}
        textColor="#000"
        label="Medicamento"
        value={medicamento}
        editable={false}
        onChangeText={setMedicamento}
        keyboardType="numeric"
      />
      <TextInput
        mode="outlined"
        style={styles.input}
        outlineColor='#583FFF'
        outlineStyle={{
          borderWidth: 3,
          borderRadius: 25
        }}
        textColor="#000"
        label="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <Button 
        style={styles.modalButton}
        textColor="#000"
        onPress={() => setShowDataFabricacaoModal(true)}
      >
        <Text style={styles.modalButtonText}>
          {dataFabricacaoPicked ? dataFabricacao?.format('DD/MM/YYYY') : 'Data de Fabricação'}
        </Text>
      </Button>
      <Portal>
        <Modal visible={showDataFabricacaoModal} onDismiss={() => setShowDataFabricacaoModal(false)} contentContainerStyle={styles.modal}>
          <DateTimePicker            
            mode="single"
            date={dataFabricacao}
            onChange={(params) => {
              setDataFabricacao(params.date);
              setDataFabricacaoPicked(true);
              setShowDataFabricacaoModal(false);
            }}
          />
        </Modal>
      </Portal>
      <Button 
        style={styles.modalButton}
        textColor="#000"
        onPress={() => setShowDataValidadeModal(true)}
      >
        <Text style={styles.modalButtonText}>
          {dataValidadePicked ? dataValidade?.format('DD/MM/YYYY') : 'Data de Validade'}
        </Text>
      </Button>
      <Portal>
        <Modal visible={showDataValidadeModal} onDismiss={() => setShowDataValidadeModal(false)} contentContainerStyle={styles.modal}>
          <DateTimePicker            
            mode="single"
            date={dataValidade}
            onChange={(params) => {
              setDataValidade(params.date);
              setDataValidadePicked(true);
              setShowDataValidadeModal(false);
            }}
          />
        </Modal>
      </Portal>
      <Button 
        style={ !dataFabricacao || !dataFabricacaoPicked || !dataValidade || !dataValidadePicked || !quantidade ? styles.submitButtonDisabled : styles.submitButton }
        disabled={!dataFabricacao || !dataFabricacaoPicked || !dataValidade || !dataValidadePicked || !quantidade}
        onPress={atualizarLote}
      >
        <Text style={styles.submitButtonText}>Cadastrar</Text>
      </Button>
    </View>
    </PaperProvider>
  );
}

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
  input: {
    backgroundColor: '#FFF',
    marginBottom: 8
  },
  inputDisabled: {
    backgroundColor: '#EEE',
    marginBottom: 8,
    opacity: '.5'
  },
  modal: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 6,
    margin: 12,
  },
  modalButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderColor: '#583FFF',
    borderWidth: 3,
    borderRadius: 25,
    marginBottom: 8,
    textAlign: 'left',
    padding: 0,
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: '#583FFF',
    marginTop: 16,
  },
  submitButtonDisabled: {
    borderRadius: 10,
    backgroundColor: '#583FFF',
    opacity: '.5',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#FFF'
  }
});

export default UpdateLoteScreen;

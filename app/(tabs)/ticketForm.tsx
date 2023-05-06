import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Alert } from 'react-native';
import { db } from '../../config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { Picker } from '@react-native-picker/picker';


interface TicketFormData {
  email: string;
  ticketType: string;
  quantity: number;
}

const TicketForm: React.FC = () => {
  const [formData, setFormData] = useState<TicketFormData>({
    email: '',
    ticketType: '1 Hour Ticket',
    quantity: 1,
  });

  const handleInputChange = (key: keyof TicketFormData, value: string | number) => {
    if (key === 'quantity') {
      value = value === '' ? 0 : Number(value);
      if (isNaN(value)) {
        value = 0;
      }
    }
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    const docref = doc(db, 'tickets/' + formData.email);
    await setDoc(docref, formData, { merge: true })

    await updateDoc(docref, {
      capital: true
    });

    let r = await getDoc(docref)

    // pop-up for the user after buying ticket
    Alert.alert(
      'Transaction Successful',
      'You have made a purchase!',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ticket Prices</Text>
      <Text style={styles.ticketType}>1 Hour Ticket: 15€</Text>
      <Text style={styles.ticketType}>2 Hour Ticket: 20€</Text>
      <Text style={styles.ticketType}>Day Ticket: 30€</Text>
      <Text style={styles.ticketType}>Evening Ticket: 13€</Text>
      <View style={styles.separator} />
      <Text style={styles.title}>Buy Tickets</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.ticketType}
          onValueChange={(value: any) => handleInputChange('ticketType', value)}
          style={styles.picker}
        >
          <Picker.Item label="1 Hour Ticket" value="1 Hour Ticket" />
          <Picker.Item label="2 Hour Ticket" value="2 Hour Ticket" />
          <Picker.Item label="Day Ticket" value="Day Ticket" />
          <Picker.Item label="Evening Ticket" value="Evening Ticket" />
        </Picker>
      </View>
      <View style={{ marginBottom: 10 }} />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={formData.quantity.toString()}
        onChangeText={(value) => handleInputChange('quantity', parseInt(value))}
      />
      <View style={styles.submitButton}>
        <Button title="Buy" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'blue',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    minWidth: 250,
    maxWidth: 400,
  },
  submitButton: {
    width: '100%',
    maxWidth: 250,
  },
  ticketType: {
    fontSize: 16,
    marginBottom: 5,
    maxWidth: 400,
    color: 'black'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    marginVertical: 10,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    height: 25,
    width: 249
  },
});


export default TicketForm;




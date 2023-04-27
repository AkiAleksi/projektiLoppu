import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import { db } from '../../config';
import { getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore/lite';
//import { ref, set } from 'firebase/database';

interface TicketFormData {
  email: string;
  ticketType: string;
  quantity: number;
}

const TicketForm: React.FC = () => {
  const [formData, setFormData] = useState<TicketFormData>({
    email: '',
    ticketType: '',
    quantity: 1,
  });

  const handleInputChange = (key: keyof TicketFormData, value: string | number) => {
    if (key === 'quantity') {
      // convert empty strings to 0, otherwise parse the value
      value = value === '' ? 0 : Number(value);
      if (isNaN(value)) {
        // if the value is not a valid number, set it to 0
        value = 0;
      }
    }
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async() => {
    console.log(formData);
    const docref = doc(db, 'tickets/' + formData.email);
    await setDoc(docref, formData, { merge: true })

    await updateDoc(docref, {
      capital: true
    });

    

    let r = await getDoc(docref)
    console.log(r.data())
  }; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buy Tickets</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Type of Ticket"
        value={formData.ticketType}
        onChangeText={(value) => handleInputChange('ticketType', value)}
      />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // center content vertically
    alignItems: 'center', // center content horizontally
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '100%', // set width to 100%
    maxWidth: 500, // set max width to 500 (or any other value you want)
  },
  submitButton: {
    width: '100%', // set width to 100%
    maxWidth: 500, // set max width to 500 (or any other value you want)
  },
});

export default TicketForm;




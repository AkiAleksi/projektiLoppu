import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import { db } from '../../config';
import { ref, set } from 'firebase/database';

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

  const handleSubmit = () => {
    console.log(formData);

    // Save the form data to Firebase
    const ticketsRef = ref(db, 'tickets');
    set(ticketsRef, formData)
      .then(() => {
        console.log('Ticket purchased successfully!');
      })
      .catch((error) => {
        console.error('Error purchasing ticket: ', error);
      });
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




import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useFoodsPersistentStore } from '../store';
import theme from '../styles/theme';

function DetailsScreen() {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const { foodList, setFoodList } = useFoodsPersistentStore();

  const handleSave = () => {
    const newFoodItem = { foodName, calories, protein, carbs, fat };
    setFoodList([...foodList, newFoodItem]);
    Alert.alert('Food Details Saved');
  };

  return (
    <View style={theme.container}>
      <Text style={theme.label}>Food Name</Text>
      <TextInput
        style={theme.input}
        placeholder="Enter food name"
        value={foodName}
        onChangeText={setFoodName}
      />

      <Text style={theme.label}>Calories</Text>
      <TextInput
        style={theme.input}
        placeholder="Enter number of calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Text style={theme.label}>Protein</Text>
      <TextInput
        style={theme.input}
        placeholder="Enter amount of protein"
        keyboardType="numeric"
        value={protein}
        onChangeText={setProtein}
      />

      <Text style={theme.label}>Carbs</Text>
      <TextInput
        style={theme.input}
        placeholder="Enter amount of carbs"
        keyboardType="numeric"
        value={carbs}
        onChangeText={setCarbs}
      />

      <Text style={theme.label}>Fat</Text>
      <TextInput
        style={theme.input}
        placeholder="Enter amount of fat"
        keyboardType="numeric"
        value={fat}
        onChangeText={setFat}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

export default DetailsScreen;
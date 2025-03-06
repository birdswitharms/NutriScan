import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFoodsPersistentStore } from '../store';
import theme from '../styles/theme';

function HomeScreen({ navigation }) {
  const { foodList } = useFoodsPersistentStore();

  return (
    <View style={theme.container}>
      <Button
        title="Add food"
        onPress={() => navigation.navigate('Details')}
      />
      <View style={theme.foodDetails}>
        {foodList.map((food, index) => (
          <View key={index} style={theme.foodItem}>
            <Text style={theme.label}>Food Name: {food.foodName}</Text>
            <Text style={theme.label}>Calories: {food.calories}</Text>
            <Text style={theme.label}>Protein: {food.protein}</Text>
            <Text style={theme.label}>Carbs: {food.carbs}</Text>
            <Text style={theme.label}>Fat: {food.fat}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default HomeScreen;
import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFoodsPersistentStore } from '../store';
import theme from '../styles/theme';

function HomeScreen({ navigation }) {
  const { foodList } = useFoodsPersistentStore();

  return (
    <View style={theme.container}>
      <ScrollView style={theme.foodDetails}>
        {foodList.map((food, index) => (
          <View key={index}>
            <View style={[theme.foodItem, index % 2 === 1 && theme.foodItemOdd]}>
              <Text style={theme.label}>{food.foodName}</Text>
              <Text style={theme.label}>Calories: {food.calories}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[theme.label, { marginRight: 8 }]}>P: {food.protein}</Text>
                <Text style={[theme.label, { marginRight: 8 }]}>C: {food.carbs}</Text>
                <Text style={theme.label}>F: {food.fat}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[theme.button, theme.buttonTop]}
        onPress={() => navigation.navigate('Details')}>
        <Text style={theme.buttonText}>Manually Add</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[theme.button, theme.buttonBottom]}
        onPress={() => navigation.navigate('Photo')}>
        <Text style={theme.buttonText}>Add by Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;
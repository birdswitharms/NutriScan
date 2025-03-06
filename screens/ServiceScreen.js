import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
import { getOpenAIResponse } from '../services/openai';
import { useFoodsPersistentStore } from '../store';
import theme from '../styles/theme';

const ServiceScreen = ({ route, navigation }) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const { foodList, setFoodList } = useFoodsPersistentStore();

  // Get the photo URI from route params when component mounts
  useEffect(() => {
    if (route.params?.photoUri) {
      setImageUri(route.params.photoUri);
      analyzeImage(route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const analyzeImage = async (uri) => {
    if (!uri) return;

    setLoading(true);
    try {
      const aiResponse = await getOpenAIResponse(uri);
      setResponse(aiResponse);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const saveToFoodList = () => {
    if (!response || typeof response !== 'object') return;

    const newFoodItem = {
      foodName: response.food_name,
      calories: "0", // You might want to fetch nutritional data from another API
      protein: "0",
      carbs: "0",
      fat: "0",
      weight: response.grams.toString()
    };

    setFoodList([...foodList, newFoodItem]);
    alert(`${response.food_name} added to your food list!`);
    navigation.navigate('Dashboard');
  };

  const retakePhoto = () => {
    navigation.navigate('Photo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Analysis</Text>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.foodImage} />
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Analyzing your food...</Text>
        </View>
      ) : response ? (
        <ScrollView style={styles.responseContainer}>
          {typeof response === 'object' ? (
            <View style={styles.resultContainer}>
              <Text style={styles.foodNameText}>{response.food_name}</Text>
              <Text style={styles.weightText}>{response.grams} grams</Text>
              <TouchableOpacity style={styles.saveButton} onPress={saveToFoodList}>
                <Text style={styles.saveButtonText}>Save to Food List</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.responseText}>{response}</Text>
          )}
        </ScrollView>
      ) : (
        <Text style={styles.waitingText}>Waiting for image analysis...</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={retakePhoto}
        >
          <Text style={styles.buttonText}>Retake Photo</Text>
        </TouchableOpacity>

        {imageUri && !loading && !response && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => analyzeImage(imageUri)}
          >
            <Text style={styles.buttonText}>Analyze Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 16,
    fontSize: 16,
  },
  waitingText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  responseContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  resultContainer: {
    alignItems: 'center',
    padding: 10,
  },
  foodNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  weightText: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 24,
  },
  responseText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ServiceScreen;

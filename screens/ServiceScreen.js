import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Image } from 'react-native';
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
    <View style={theme.serviceScreenContainer}>
      <Text style={theme.serviceScreenTitle}>Food Analysis</Text>

      {imageUri && (
        <View style={theme.serviceScreenImageContainer}>
          <Image source={{ uri: imageUri }} style={theme.serviceScreenFoodImage} />
        </View>
      )}

      {loading ? (
        <View style={theme.serviceScreenLoadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={theme.serviceScreenLoadingText}>Analyzing your food...</Text>
        </View>
      ) : response ? (
        <ScrollView style={theme.serviceScreenResponseContainer}>
          {typeof response === 'object' ? (
            <View style={theme.serviceScreenResultContainer}>
              <Text style={theme.serviceScreenFoodNameText}>{response.food_name}</Text>
              <Text style={theme.serviceScreenWeightText}>{response.grams} grams</Text>
              <TouchableOpacity style={theme.serviceScreenSaveButton} onPress={saveToFoodList}>
                <Text style={theme.serviceScreenSaveButtonText}>Save to Food List</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={theme.serviceScreenResponseText}>{response}</Text>
          )}
        </ScrollView>
      ) : (
        <Text style={theme.serviceScreenWaitingText}>Waiting for image analysis...</Text>
      )}

      <View style={theme.serviceScreenButtonContainer}>
        <TouchableOpacity
          style={theme.serviceScreenButton}
          onPress={retakePhoto}
        >
          <Text style={theme.serviceScreenButtonText}>Retake Photo</Text>
        </TouchableOpacity>

        {imageUri && !loading && !response && (
          <TouchableOpacity
            style={theme.serviceScreenButton}
            onPress={() => analyzeImage(imageUri)}
          >
            <Text style={theme.serviceScreenButtonText}>Analyze Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ServiceScreen;

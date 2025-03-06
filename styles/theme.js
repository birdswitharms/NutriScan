import { StyleSheet } from 'react-native';

const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#121212',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: '#424242',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 16,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
  },
  dashboardHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  foodItemOdd: {
    backgroundColor: '#2A2A2A',
  },
  serviceScreenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  serviceScreenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  serviceScreenImageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#1E1E1E',
  },
  serviceScreenFoodImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  serviceScreenLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceScreenLoadingText: {
    color: '#FFFFFF',
    marginTop: 16,
    fontSize: 16,
  },
  serviceScreenWaitingText: {
    color: '#AAAAAA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  serviceScreenResponseContainer: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  serviceScreenResultContainer: {
    alignItems: 'center',
    padding: 10,
  },
  serviceScreenFoodNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  serviceScreenWeightText: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 24,
  },
  serviceScreenResponseText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  serviceScreenButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceScreenButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
  },
  serviceScreenButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  serviceScreenSaveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  serviceScreenSaveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default theme;
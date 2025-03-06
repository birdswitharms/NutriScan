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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 16,
  },
  buttonTop: {
    bottom: 56,
  },
  buttonBottom: {
    bottom: 0,
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
});

export default theme;
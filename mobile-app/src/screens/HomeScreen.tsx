import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const handleUploadPress = () => {
    navigation.navigate('Upload');
  };

  const handleFilesPress = () => {
    navigation.navigate('Files');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const showInfo = () => {
    Alert.alert(
      'Upload App',
      'A cross-platform file upload application for iPhone and Desktop',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Upload App</Text>
        <Text style={styles.subtitle}>
          Upload and manage your files easily
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleUploadPress}>
          <Text style={styles.primaryButtonText}>📁 Upload Files</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleFilesPress}>
          <Text style={styles.secondaryButtonText}>📋 My Files</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSettingsPress}>
          <Text style={styles.secondaryButtonText}>⚙️ Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton} onPress={showInfo}>
          <Text style={styles.infoButtonText}>ℹ️ About</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Features</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>• Upload multiple files at once</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>• Support for images, documents, videos</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>• Real-time upload progress</Text>
        </View>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>• Secure file management</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  infoButtonText: {
    color: '#666',
    fontSize: 16,
  },
  features: {
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});

export default HomeScreen;
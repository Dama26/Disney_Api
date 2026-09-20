import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function DetailScreen({ route }) {
  const { character } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: character.imageUrl || 'https://via.placeholder.com/300',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.name}>{character.name}</Text>
          <TouchableOpacity
            style={[styles.favButton, isFavorite && styles.favActive]}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Text style={styles.favText}>
              {isFavorite ? '👑 Favorito de Auradon' : '⭐ Marcar como Favorito'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎬 Películas y Especiales</Text>
          {character.films && character.films.length > 0 ? (
            character.films.map((film, index) => (
              <Text key={index} style={styles.itemText}>
                • {film}
              </Text>
            ))
          ) : (
            <Text style={styles.emptyText}>Sin apariciones cinematográficas registradas.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📺 Series y Animación</Text>
          {character.tvShows && character.tvShows.length > 0 ? (
            character.tvShows.map((show, index) => (
              <Text key={index} style={styles.itemText}>
                • {show}
              </Text>
            ))
          ) : (
            <Text style={styles.emptyText}>Sin registro en series.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎮 Videojuegos</Text>
          {character.videoGames && character.videoGames.length > 0 ? (
            character.videoGames.map((game, index) => (
              <Text key={index} style={styles.itemText}>
                • {game}
              </Text>
            ))
          ) : (
            <Text style={styles.emptyText}>No registra videojuegos principales.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071322',
  },
  scrollContent: {
    padding: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#D8A012',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D8A012',
    textAlign: 'center',
    marginBottom: 10,
  },
  favButton: {
    backgroundColor: '#0A2540',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D8A012',
  },
  favActive: {
    backgroundColor: '#A2753C',
    borderColor: '#D8A012',
  },
  favText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#0A2540',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#A2753C',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D8A012',
    marginBottom: 8,
  },
  itemText: {
    color: '#9BB4C9',
    fontSize: 15,
    marginVertical: 2,
  },
  emptyText: {
    color: '#607285',
    fontStyle: 'italic',
  },
});
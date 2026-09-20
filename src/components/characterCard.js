import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function CharacterCard({ character, onPress }) {
  // Conteo de apariciones en juegos y películas
  const gameCount = character.videoGames ? character.videoGames.length : 0;
  const filmCount = character.films ? character.films.length : 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{
          uri: character.imageUrl || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>🎮 Juegos: {gameCount}</Text>
          <Text style={styles.badge}>🎬 Pelis: {filmCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1a2b4c',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  image: {
    width: 85,
    height: 85,
    backgroundColor: '#0c192c',
  },
  infoContainer: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    fontSize: 12,
    color: '#FFD700',
    backgroundColor: '#0c192c',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
});
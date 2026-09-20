import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchCharacters, searchCharacters } from '../api/disneyApi';

const EXACT_AURADON_NAMES = [
  'ben', 'king ben', 'prince ben', 'mal', 'evie', 'jay', 'carlos', 'audrey', 
  'chad charming', 'jane', 'lonnie', 'uma', 'doug', 'hades', 'dizzy tremaine', 
  'celia', 'gil', 'harry hook', 'beast', 'belle', 'fairy godmother'
];

export default function CharacterListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    loadInitialData();
  }, []);

  const filterAuradon = (dataList) => {
    return dataList.filter((char) => {
      const charName = char.name ? char.name.toLowerCase().trim() : '';
      const inFilms = char.films?.some((f) => f.toLowerCase().includes('descendants'));
      const inTv = char.tvShows?.some((s) => s.toLowerCase().includes('descendants'));
      const isExactMatch = EXACT_AURADON_NAMES.includes(charName);

      return inFilms || inTv || isExactMatch;
    });
  };

  const loadInitialData = async () => {
    setLoading(true);
    const data = await fetchCharacters(1, 100);
    const filtered = filterAuradon(data);
    setCharacters(filtered);
    setLoading(false);
  };

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.trim().length === 0) {
      loadInitialData();
      return;
    }
    setLoading(true);
    const results = await searchCharacters(text);
    
    const auradonResults = filterAuradon(results);
    
    setCharacters(auradonResults);
    setLoading(false);
  };

  const getOrigenInfo = (item) => {
    if (item.films && item.films.length > 0) {
      return `🎬 Película: ${item.films[0]}`;
    }
    if (item.tvShows && item.tvShows.length > 0) {
      return `📺 Serie: ${item.tvShows[0]}`;
    }
    return '🏰 Reino: Auradon / Isle of the Lost';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { character: item })}
    >
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.image}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.badge}>
          🎬 Películas: {item.films ? item.films.length : 0}
        </Text>
        <Text style={styles.subBadge}>{getOrigenInfo(item)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <Image 
          source={require('../../assets/auradon.png')} 
          style={styles.headerLogo} 
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Estudiantes de Auradon Prep</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Buscar personaje"
        placeholderTextColor="#9BB4C9"
        value={query}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#D8A012" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron personajes de Auradon en la búsqueda.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071322',
    padding: 16,
  },
  headerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#0A2540',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A2753C',
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  headerTitle: {
    color: '#D8A012',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#0A2540',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#9BB4C9',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#0A2540',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A2753C',
  },
  image: {
    width: 90,
    height: 90,
  },
  cardInfo: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  badge: {
    fontSize: 12,
    color: '#D8A012',
    marginTop: 4,
  },
  subBadge: {
    fontSize: 11,
    color: '#9BB4C9',
    marginTop: 2,
  },
  emptyText: {
    color: '#9BB4C9',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});
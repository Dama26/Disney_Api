import { useState, useEffect } from 'react';

// Lista ampliada con el elenco clásico y de 'The Rise of Red'
const DESCENDANTS_CHARACTERS = [
  // Saga Principal
  'Mal',
  'Evie',
  'Carlos',
  'Jay',
  'King Ben',
  'Uma',
  'Audrey',
  'Jane',
  'Chad Charming',
  'Lonnie',
  'Gil',
  'Harry Hook',
  'Celia',
  'Hades',
  'Maleficent',
  
  // Descendants: The Rise of Red
  'Chloe',
  'Bridget',
  'Ella',
  'Uliana',
  'Maddox'
];

export const useDescendantsCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      // Consultas en paralelo a la Disney API para cada personaje
      const requests = DESCENDANTS_CHARACTERS.map(async (name) => {
        const response = await fetch(
          `https://api.disneyapi.dev/character?name=${encodeURIComponent(name)}`
        );
        
        if (!response.ok) return null;
        
        const json = await response.json();
        if (!json.data) return null;

        const results = Array.isArray(json.data) ? json.data : [json.data];

        // Priorizamos la coincidencia que tenga "Descendants" en sus películas o series
        const match = results.find(
          (char) =>
            char.films?.some((f) => f.toLowerCase().includes('descendants')) ||
            char.tvShows?.some((s) => s.toLowerCase().includes('descendants'))
        );

        return match || results[0] || null;
      });

      const results = await Promise.all(requests);
      
      // Filtramos los nulos o no encontrados
      const cleanList = results.filter((char) => char !== null);

      setCharacters(cleanList);
    } catch (err) {
      setError(err.message || 'Error al conectar con la Disney API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return { characters, loading, error, refetch: fetchCharacters };
};
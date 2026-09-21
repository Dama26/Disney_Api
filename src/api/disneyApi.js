const BASE_URL = 'https://api.disneyapi.dev/character';

export const fetchCharacters = async (page = 1, pageSize = 50) => {
  try {
    const response = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

export const searchCharacters = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}?name=${encodeURIComponent(name)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data.data)) {
      return data.data;
    } else if (data.data) {
      return [data.data];
    }
    
    return [];
  } catch (error) {
    console.error('Error searching characters:', error);
    return [];
  }
};
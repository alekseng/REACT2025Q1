const ID = 'h-JB_S_5wn16PF8uv5eRY9eWZlsPEzZk9vddRNpQjYo';

export const fetchData = async (page: number, query: string) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=10&orientation=landscape&client_id=${ID}`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during data retrieval:', error);
    return null;
  }
};

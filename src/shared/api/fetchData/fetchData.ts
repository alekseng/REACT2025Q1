export const fetchData = async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/all`);

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

import { NavigateFunction } from 'react-router-dom';
import { ID } from '../../../../../shared/api/fetchData/fetchData.ts';

export const fetchDetailedCard = async (
  id: string,
  navigate: NavigateFunction
) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${id}?client_id=${ID}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        navigate('/not-found');
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

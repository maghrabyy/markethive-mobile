import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [error, setError] = useState('');
  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Categories'));
      const fetchedCategories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIsCategoriesLoading(false);
      setCategories(fetchedCategories);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isCategoriesLoading, error };
};

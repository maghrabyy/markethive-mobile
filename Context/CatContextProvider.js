import { createContext, useState ,useEffect} from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
export const CatContext = createContext();

export const CatContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [isCategoriesLoading, setCategoriesLoading] = useState(true);

    async function fetchCategories() {
        try {
          const storeSnapshot = await getDocs(collection(db, 'Categories'));
          const storeData = storeSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setCategories(storeData);
          setCategoriesLoading(false);
        } catch (error) {
          console.error(error);
          setCategoriesLoading(false)
        }
      }
    
      useEffect(() => {
        fetchCategories();
      }, []);
  return (
    <CatContext.Provider
      value={{ categories ,isCategoriesLoading }}
    >
      {children}
    </CatContext.Provider>
  );
};

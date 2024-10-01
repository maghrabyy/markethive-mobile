import { auth, db } from '../firebase';
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export const useAddToCart = (product, quantity, productPrice) => {
  const user = auth.currentUser;
  const customerId = user?.uid;
  const prodId = product.id;
  const cartData = {
    prodId,
    customerId,
    quantity,
    subTotal: productPrice * quantity,
  };

  async function addProductToCart() {
    const cartItem = await addDoc(collection(db, 'ShoppingCart'), cartData);
    updateDoc(doc(db, 'Customers', customerId), {
      shoppingCart: arrayUnion(cartItem.id),
    });
  }

  async function isProductInShoppingCart() {
    const q = query(
      collection(db, 'ShoppingCart'),
      where('prodId', '==', prodId),
      where('customerId', '==', customerId),
    );
    const response = await getDocs(q);
    const shoppingCartDoc = response.docs.map((doc) => ({ ...doc.data() }))[0];
    return shoppingCartDoc?.prodId === prodId;
  }

  async function handleAddToCart() {
    if (await isProductInShoppingCart()) {
      Toast.show({ type: 'info', text1: 'product is already in cart' });
    } else {
      Toast.show({ type: 'success', text1: 'product is added to cart' });
      addProductToCart();
    }
  }
  return { handleAddToCart, isProductInShoppingCart, addProductToCart };
};

import { auth, db } from '../firebase';
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { useCustomerSnapshot } from './useFetchCustomer';
import Toast from 'react-native-toast-message';

export const useFetchWishList = (productId = '') => {
  const customerId = auth.currentUser?.uid;
  const { customer, isLoading } = useCustomerSnapshot(customerId);

  const removeFromWishlist = async () => {
    await updateDoc(doc(db, 'Customers', customerId), {
      wishlist: arrayRemove(productId),
    });
    Toast.show({ type: 'info', text1: 'Item removed from the wishlist' });
  };

  const addToWishlist = async () => {
    await updateDoc(doc(db, 'Customers', customerId), {
      wishlist: arrayUnion(productId),
    });
    Toast.show({ type: 'success', text1: 'Item added to wishlist' });
  };

  const wishlistHandler = () => {
    if (isAddedToWishlist()) {
      removeFromWishlist();
    } else {
      addToWishlist();
    }
  };

  const isAddedToWishlist = () => {
    if (customer.wishlist?.includes(productId)) {
      return true;
    } else {
      return false;
    }
  };

  return { isAddedToWishlist, wishlistHandler, removeFromWishlist, isLoading };
};

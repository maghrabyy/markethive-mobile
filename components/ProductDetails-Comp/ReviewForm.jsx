import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { colors } from '../../constants/colors';
import StarRating from 'react-native-star-rating-widget';
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
} from 'firebase/firestore';
import { db, auth } from '../../firebase';

export const ReviewForm = ({ productId }) => {
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewRate, setReviewRate] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const clearForm = () => {
    setReviewTitle('');
    setReviewMessage('');
    setReviewRate(0);
  };
  const reviewSubmitHandler = async () => {
    if (reviewTitle && reviewRate) {
      setSubmitLoading(true);
      try {
        const reviewDoc = await addDoc(collection(db, 'Reviews'), {
          productId,
          cstId: auth.currentUser.uid,
          comment: { reviewTitle, reviewMessage },
          rating: reviewRate,
          reviewDate: new Date(),
        });
        await updateDoc(doc(db, 'Products', productId), {
          reviews: arrayUnion(reviewDoc.id),
        });
        setSubmitLoading(false);
        clearForm();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log('test');
    }
  };
  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reviews</Text>
      <TextInput
        cursorColor={colors.primary}
        mode="outlined"
        placeholder="Review Title"
        value={reviewTitle}
        onChangeText={(title) => setReviewTitle(title)}
        style={{ marginVertical: 10, backgroundColor: 'transparent' }}
        outlineColor={colors.primary}
      />
      <TextInput
        mode="outlined"
        placeholder="Review Message"
        value={reviewMessage}
        onChangeText={(message) => setReviewMessage(message)}
        multiline={true}
        numberOfLines={4}
        style={{ backgroundColor: 'transparent', paddingTop: 8 }}
        outlineColor={colors.primary}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 5,
        }}
      >
        <StarRating
          starStyle={{ width: 20 }}
          onChange={setReviewRate}
          rating={reviewRate}
          enableHalfStar
        />
        <Button
          mode="contained"
          onPress={reviewSubmitHandler}
          loading={submitLoading}
          style={{ borderRadius: 8 }}
          buttonColor={colors.primary}
        >
          Submit Review
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

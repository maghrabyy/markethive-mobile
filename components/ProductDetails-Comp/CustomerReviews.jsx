import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ReviewBox } from './ReviewBox';

export const CustomerReviews = ({ reviews }) => {
  return (
    <View>
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewBox key={review.id} review={review} />)
      ) : (
        <Text>There are no any reviews yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

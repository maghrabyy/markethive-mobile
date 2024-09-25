import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFetchCustomer } from '../../Custom Hooks/useFetchCustomer';
import { CollectionSkeletonCard } from '../CardSkeleton';
import { Rating } from 'react-native-ratings';

export const ReviewBox = ({ review }) => {
  const { customer, isLoading, error } = useFetchCustomer(review.cstId);
  const reviewDate = review.reviewDate.toDate().toLocaleString('en-AU', {
    hour12: true,
    minute: '2-digit',
    hour: '2-digit',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <View>
      {isLoading ? (
        <CollectionSkeletonCard />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 8,
          }}
        >
          <View>
            <Rating
              readonly={true}
              startingValue={review.rating}
              imageSize={20}
            />
            <Text style={{ fontWeight: 'bold', marginVertical: 5 }}>
              {review.comment.reviewTitle}
            </Text>
            <Text style={{ color: 'grey' }}>
              {review.comment.reviewMessage}
            </Text>
          </View>
          {error ? (
            <Text>Error: {error}</Text>
          ) : (
            <View>
              <Text style={{ fontWeight: 'bold' }}>
                {customer.firstName} {customer.lastName}
              </Text>
              <Text>{reviewDate}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

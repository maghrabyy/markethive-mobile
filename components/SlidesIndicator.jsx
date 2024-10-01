import { View } from 'react-native';

export const SlidesIndicator = ({ list, targetIndex }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'center',
        marginTop: 14,
      }}
    >
      {list.slice(0, Math.ceil(list.length / 2)).map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 50,
            backgroundColor: targetIndex === index ? 'black' : 'grey',
          }}
        />
      ))}
    </View>
  );
};
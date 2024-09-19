import { Text } from 'react-native';

export const HomeScreenSection = ({ title, children }) => {
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 12,
        }}
      >
        {title}
      </Text>
      {children}
    </>
  );
};

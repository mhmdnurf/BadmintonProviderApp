import React from 'react';
import {View} from 'react-native';

interface MarginBottom {
  marginBottom?: number;
}

const BottomSpace = ({marginBottom}: MarginBottom): React.JSX.Element => {
  return (
    <>
      <View style={[{marginBottom}]} />
    </>
  );
};

export default BottomSpace;

import React from 'react';
import {Text} from 'react-native';
import {Container} from '../../components';

const FoodDetail = ({navigation, route}: any) => {
  const {food} = route.params;
  console.log(food);

  return (
    <Container back>
      <Text>FoodDetail</Text>
    </Container>
  );
};

export default FoodDetail;

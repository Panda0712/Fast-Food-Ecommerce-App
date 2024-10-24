/* eslint-disable react-native/no-inline-styles */
import {Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Container, TextComponent} from '../../components';

const FoodDetail = ({navigation, route}: any) => {
  const {food} = route.params;
  console.log(food);

  return (
    <Container
      style={{marginTop: 40}}
      back
      right={<TextComponent text="Quay lại" />}>
      <Section>
        <TextComponent text="Chi tiết món ăn" />
      </Section>
    </Container>
  );
};

export default FoodDetail;

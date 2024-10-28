/* eslint-disable react-native/no-inline-styles */
import {Section} from '@bsdaoquang/rncomponent';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container} from '../../components';
import {colors} from '../../constants/colors';
import ShippingForm from './components/ShippingForm';

const ShippingScreen = ({navigation}: any) => {
  return (
    <Container
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }
      title="Thông tin mua hàng">
      <Section styles={{marginTop: 20}}>
        <ShippingForm />
      </Section>
    </Container>
  );
};

export default ShippingScreen;

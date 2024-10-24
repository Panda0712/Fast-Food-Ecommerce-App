/* eslint-disable react-native/no-inline-styles */
import {colors, Row} from '@bsdaoquang/rncomponent';
import React, {ReactNode} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../styles/globalStyles';

type Props = {
  children: ReactNode;
  title?: string;
  back?: boolean;
  right?: ReactNode;
  left?: ReactNode;
  isScroll?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Container = (props: Props) => {
  const {children, title, back, right, left, isScroll, style} = props;

  return (
    <SafeAreaView style={[globalStyles.container]}>
      {back ||
        title ||
        left ||
        (right && (
          <Row
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              paddingTop:
                Platform.OS === 'android' ? StatusBar.currentHeight : 42,
            }}>
            {back && (
              <Ionicons name="chevron-back" size={84} color={colors.black} />
            )}
            {left && !back && <></>}
            <View
              style={{
                paddingHorizontal: 16,
                flex: 1,
              }}>
              {title && <></>}
            </View>
            {right && right}
          </Row>
        ))}

      {!isScroll && isScroll !== false ? (
        <ScrollView style={[globalStyles.container, style]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[globalStyles.container, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Container;

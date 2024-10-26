/* eslint-disable react-native/no-inline-styles */
import {Row, Section, Space} from '@bsdaoquang/rncomponent';
import React from 'react';
import {Linking, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import {
  default as FontAwesome6,
  default as FontAwesome6Brands,
} from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';

const AboutScreen = ({navigation}: any) => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <Container
      title="Thông tin liên lạc"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }>
      <ScrollView>
        <Section
          styles={{
            marginTop: 20,
            borderBottomColor: colors.black3,
            borderBottomWidth: 1,
          }}>
          <TextComponent
            size={24}
            styles={{textAlign: 'center'}}
            text="Liên lạc "
          />
          <TextComponent
            size={16}
            styles={{textAlign: 'center'}}
            text="Các bạn có thể liên hệ với đội ngũ của chúng tôi qua các kênh thông tin sau."
          />
        </Section>

        <Space height={12} />

        <Section
          styles={{
            paddingHorizontal: 24,
            borderBottomColor: colors.black3,
            borderBottomWidth: 1,
          }}>
          <TextComponent size={18} text="Chat với chúng tôi" />
          <Space height={8} />

          <TouchableOpacity
            onPress={() =>
              openLink('https://www.facebook.com/kamiyama.touma.902')
            }>
            <Row justifyContent="flex-start">
              <AntDesign name="facebook-square" color={colors.blue} size={28} />
              <Space width={12} />
              <TextComponent
                styles={{borderBottomColor: colors.grey3, borderBottomWidth: 1}}
                size={16}
                text="Chat qua Facebook"
              />
            </Row>
          </TouchableOpacity>

          <Space height={12} />

          <TouchableOpacity
            onPress={() => openLink('https://www.instagram.com/kyunnxneon.u/')}>
            <Row justifyContent="flex-start">
              <FontAwesome5Brands
                name="instagram-square"
                color={colors.instagram}
                size={28}
              />
              <Space width={12} />
              <TextComponent
                styles={{borderBottomColor: colors.grey3, borderBottomWidth: 1}}
                size={16}
                text="Chat qua Instagram"
              />
            </Row>
          </TouchableOpacity>

          <Space height={12} />

          <TouchableOpacity onPress={() => openLink('https://x.com')}>
            <Row justifyContent="flex-start">
              <AntDesign name="twitter" color={colors.twitter} size={28} />
              <Space width={12} />
              <TextComponent
                styles={{borderBottomColor: colors.grey3, borderBottomWidth: 1}}
                size={16}
                text="Chat qua Twitter"
              />
            </Row>
          </TouchableOpacity>

          <Space height={12} />

          <TouchableOpacity
            onPress={() => openLink('https://www.threads.net/@sadoc_ean')}>
            <Row justifyContent="flex-start">
              <FontAwesome6Brands
                name="square-threads"
                color={colors.black}
                size={28}
              />
              <Space width={12} />
              <TextComponent
                styles={{borderBottomColor: colors.grey3, borderBottomWidth: 1}}
                size={16}
                text="Chat qua Threads"
              />
            </Row>
          </TouchableOpacity>

          <Space height={12} />

          <TouchableOpacity
            onPress={() => openLink('mailto:tuan.pham.super@gmail.com')}>
            <Row justifyContent="flex-start">
              <AntDesign name="mail" color={colors.black} size={28} />
              <Space width={12} />
              <TextComponent
                styles={{borderBottomColor: colors.grey3, borderBottomWidth: 1}}
                size={16}
                text="Gửi mail cho chúng tôi"
              />
            </Row>
          </TouchableOpacity>
        </Section>

        <Space height={16} />

        <Section
          styles={{
            paddingHorizontal: 24,
            borderBottomWidth: 1,
            borderBottomColor: colors.black3,
          }}>
          <TextComponent size={18} text="Gọi cho chúng tôi" />
          <TextComponent
            size={16}
            text="Gọi đội ngũ của chúng tôi từ thứ Hai đến thứ Sáu từ 7am - 17pm"
          />
          <Space height={8} />
          <TouchableOpacity onPress={() => openLink('tel:+84369332842')}>
            <Row justifyContent="flex-start">
              <AntDesign name="phone" color={colors.black} size={28} />
              <Space width={12} />
              <TextComponent
                styles={{borderBottomColor: colors.grey3, borderBottomWidth: 1}}
                size={16}
                text="+84369332842"
              />
            </Row>
          </TouchableOpacity>
        </Section>

        <Space height={16} />

        <Section styles={{paddingHorizontal: 24}}>
          <TextComponent size={18} text="Ghé thăm chúng tôi" />
          <TextComponent
            size={16}
            text="Gặp mặt chúng tôi trực tiếp tại cơ sở chính."
          />
          <Space height={8} />
          <TouchableOpacity onPress={() => openLink('tel:+84369332842')}>
            <Row justifyContent="flex-start">
              <FontAwesome6
                name="map-location-dot"
                color={colors.black}
                size={28}
              />
              <Space width={12} />
              <TextComponent
                size={16}
                text="280 An Dương Vương, phường 4, quận 5, TPHCM"
              />
            </Row>
          </TouchableOpacity>
        </Section>

        <Space height={12} />

        <Section styles={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: 10.761382589386448,
              longitude: 106.67959627508844,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </Section>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AboutScreen;

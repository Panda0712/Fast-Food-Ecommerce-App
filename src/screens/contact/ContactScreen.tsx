/* eslint-disable react-native/no-inline-styles */
import {Button, Input, Section, Space} from '@bsdaoquang/rncomponent';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Container, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {ContactModel} from '../../constants/models';
import {insertContact} from '../../lib/actions';
import {validateEmail, validatePhoneNumber} from '../../utils/helper';

const initialValue: ContactModel = {
  name: '',
  email: '',
  phone: '',
  content: '',
};

const ContactScreen = ({navigation}: any) => {
  const [contactForm, setContactForm] = useState<ContactModel>(initialValue);
  const [errorMessages, setErrorMessages] =
    useState<ContactModel>(initialValue);
  const [resetKey, setResetKey] = useState(0);

  const validateFields = () => {
    const errors = {...initialValue};
    let isValid = true;

    if (contactForm.name.length < 5) {
      errors.name = 'Tên phải có ít nhất 5 ký tự';
      isValid = false;
    }
    if (!validateEmail(contactForm.email)) {
      errors.email = 'Email không hợp lệ';
      isValid = false;
    }
    if (!validatePhoneNumber(contactForm.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
      isValid = false;
    }
    if (contactForm.content.length < 10) {
      errors.content = 'Nội dung phải có ít nhất 10 ký tự';
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleChangeVal = (key: string, value: string) => {
    if (!key || !value) {
      return;
    }

    const items: any = {...contactForm};
    items[`${key}`] = value;
    setContactForm(items);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: errorMessages.email
          ? errorMessages.email
          : errorMessages.name
          ? errorMessages.name
          : errorMessages.content
          ? errorMessages.content
          : errorMessages.phone,
      });
      return;
    }

    try {
      const {error} = await insertContact(contactForm);
      if (error) {
        throw new Error(error);
      }

      setContactForm(initialValue);
      setErrorMessages(initialValue);
      setResetKey(prev => prev + 1);
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Gửi thông tin thành công! Cảm ơn đóng góp ý kiến của bạn!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Thông báo',
        text2: error instanceof Error ? error.message : 'Có lỗi xảy ra',
      });
    }
  };

  return (
    <Container
      title="Liên hệ"
      back={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
      }>
      <Section styles={{marginTop: 20}}>
        <TextComponent
          size={24}
          styles={{textAlign: 'center'}}
          text="Liên hệ với chúng tôi"
        />
        <Space height={4} />
        <TextComponent
          size={16}
          styles={{textAlign: 'center'}}
          text="Nếu bạn có bất kì câu hỏi hay thắc mắc nào hoặc muốn liên hệ với dịch vụ của chúng tôi, đừng ngần ngại cung cấp thông tin để chúng tôi có thể hỗ trợ bạn một cách sớm nhất💕"
        />
      </Section>

      <Section key={resetKey}>
        <Input
          radius={10}
          clear
          required
          helpText={'Hãy nhập tên'}
          inputStyles={{fontFamily: fontFamilies.mergeRegular}}
          placeholderColor={colors.grey4}
          value={contactForm.name}
          placeholder="Nhập họ tên"
          onChange={val => handleChangeVal('name', val)}
        />
        <Input
          radius={10}
          clear
          required
          helpText={errorMessages.email || 'Hãy nhập email'}
          value={contactForm.email}
          inputStyles={{fontFamily: fontFamilies.mergeRegular}}
          placeholderColor={colors.grey4}
          placeholder="Nhập email"
          onChange={val => handleChangeVal('email', val)}
        />
        <Input
          radius={10}
          clear
          required
          keyboardType="phone-pad"
          helpText={errorMessages.phone || 'Hãy nhập số điện thoại'}
          value={contactForm.phone}
          placeholderColor={colors.grey4}
          inputStyles={{fontFamily: fontFamilies.mergeRegular}}
          placeholder="Nhập số điện thoại"
          onChange={val => handleChangeVal('phone', val)}
        />
        <Input
          radius={10}
          clear
          value={contactForm.content}
          required
          helpText={'Hãy nhập nội dung'}
          placeholderColor={colors.grey4}
          inputStyles={{fontFamily: fontFamilies.mergeRegular}}
          placeholder="Nhập nội dung"
          textAreal
          onChange={val => handleChangeVal('content', val)}
        />
        <Button
          textStyleProps={{fontFamily: fontFamilies.mergeBold}}
          color={colors.red}
          title="Gửi"
          onPress={handleSubmit}
        />
      </Section>
    </Container>
  );
};

export default ContactScreen;

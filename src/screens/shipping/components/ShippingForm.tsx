/* eslint-disable react-native/no-inline-styles */
import {Button, Row, Section, Space} from '@bsdaoquang/rncomponent';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TextInput, View} from 'react-native';
import {TextComponent} from '../../../components';
import {GuestModel} from '../../../constants/models';
import {useShippingForm} from '../../../context/ShippingFormContext';
import {getSpecificUser} from '../../../lib/actions';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';

export type RootStackParamList = {
  CheckoutScreen: undefined;
};

const ShippingForm = () => {
  const [guestData, setGuestData] = useState<GuestModel>();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {register, handleSubmit, setValue, reset, formState} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      observations: '',
    },
  });
  const {errors} = formState;
  const user = auth().currentUser;
  const {handleSetFormData}: any = useShippingForm();

  const userEmail = user?.email;

  const handleGetUser = async (email: string) => {
    const {guest} = await getSpecificUser(email);
    return guest;
  };

  const onSubmit = (data: any) => {
    const newData = {
      id: data.email === userEmail ? guestData?.id : 0,
      name: data.firstName + ' ' + data.lastName,
      ...data,
    };
    handleSetFormData(newData);
    navigation.navigate('CheckoutScreen');
    reset();
  };

  useEffect(() => {
    if (userEmail) {
      handleGetUser(userEmail).then(data => {
        setGuestData(data);

        if (data.fullName) {
          const name = data.fullName.split(' ');
          const len = name.length;
          const firstName = len > 1 ? name.slice(0, -1).join(' ') : name[0];
          const lastName = len > 1 ? name.slice(-1).join(' ') : name[0];
          setValue('firstName', firstName);
          setValue('lastName', lastName);
          setValue('phone', data.phone || '');
          setValue('email', data.email || '');
          setValue('address', data.address || '');
        }
      });
    }
  }, [userEmail, setValue]);

  return (
    <Section>
      <TextComponent size={18} text="Giao hàng đến" />
      <Space height={12} />
      <Row styles={{flexDirection: 'column'}}>
        <View style={{width: '100%'}}>
          <TextComponent text="Nhập họ" />
          <Space height={8} />
          <TextInput
            placeholder="Nhập họ"
            style={{
              paddingHorizontal: 12,
              borderRadius: 10,
              height: 50,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => setValue('firstName', text)}
            defaultValue={
              guestData
                ? guestData.fullName?.split(' ').slice(0, -1).join(' ')
                : ''
            }
            {...register('firstName', {
              required: 'Hãy nhập họ của bạn',
            })}
          />
          {errors.firstName && (
            <TextComponent
              color={colors.red}
              size={12}
              text={errors.firstName.message || ''}
            />
          )}
        </View>

        <Space height={12} />

        <View style={{width: '100%'}}>
          <TextComponent text="Nhập tên" />
          <Space height={8} />
          <TextInput
            placeholder="Nhập tên"
            style={{
              paddingHorizontal: 12,
              borderRadius: 10,
              height: 50,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => setValue('lastName', text)}
            defaultValue={
              guestData ? guestData.fullName?.split(' ').slice(-1)[0] : ''
            }
            {...register('lastName', {
              required: 'Hãy nhập tên của bạn',
            })}
          />
          {errors.lastName && (
            <TextComponent
              color={colors.red}
              size={12}
              text={errors.lastName.message || ''}
            />
          )}
        </View>

        <Space height={12} />

        <View style={{width: '100%'}}>
          <TextComponent text="Số điện thoại" />
          <Space height={8} />
          <TextInput
            placeholder="Nhập số điện thoại"
            style={{
              paddingHorizontal: 12,
              borderRadius: 10,
              height: 50,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => setValue('phone', text)}
            defaultValue={guestData ? guestData.phone : ''}
            {...register('phone', {
              required: 'Hãy nhập số điện thoại của bạn',
              minLength: {
                value: 10,
                message: 'Số điện thoại tối thiểu 10 số',
              },
              pattern: {
                value: /^(0|\+84)(\s?)[35789](\d{2})(\s?)\d{3}(\s?)\d{3}$/,
                message: 'Số điện thoại không hợp lệ! Vui lòng nhập lại',
              },
            })}
          />
          {errors.phone && (
            <TextComponent
              color={colors.red}
              size={12}
              text={errors.phone.message || ''}
            />
          )}
        </View>

        <Space height={12} />

        <View style={{width: '100%'}}>
          <TextComponent text="Email" />
          <Space height={8} />
          <TextInput
            placeholder="Nhập email"
            style={{
              paddingHorizontal: 12,
              borderRadius: 10,
              height: 50,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => setValue('email', text)}
            defaultValue={guestData ? guestData.email : ''}
            {...register('email', {
              required: 'Hãy nhập tên của bạn',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Email không hợp lệ! Vui lòng nhập lại!',
              },
            })}
          />
          {errors.email && (
            <TextComponent
              color={colors.red}
              size={12}
              text={errors.email.message || ''}
            />
          )}
        </View>

        <Space height={12} />

        <View style={{width: '100%'}}>
          <TextComponent text="Địa chỉ" />
          <Space height={8} />
          <TextInput
            placeholder="Nhập địa chỉ"
            style={{
              paddingHorizontal: 12,
              borderRadius: 10,
              height: 50,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => setValue('address', text)}
            defaultValue={guestData ? guestData.address : ''}
            {...register('address', {
              required: 'Hãy nhập địa chỉ của bạn',
            })}
          />
          {errors.address && (
            <TextComponent
              color={colors.red}
              size={12}
              text={errors.address.message || ''}
            />
          )}
        </View>

        <Space height={12} />

        <View style={{width: '100%'}}>
          <TextComponent text="Ghi chú đơn hàng" />
          <Space height={8} />
          <TextInput
            placeholder="Nhập ghi chú"
            style={{
              paddingHorizontal: 12,
              borderRadius: 10,
              height: 70,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={text => setValue('observations', text)}
            {...register('observations')}
          />
        </View>

        <Space height={24} />

        <Button
          radius={8}
          textStyleProps={{fontFamily: fontFamilies.mergeBold}}
          color={colors.red}
          title="Tiếp theo"
          onPress={handleSubmit(onSubmit)}
        />
      </Row>
    </Section>
  );
};

export default ShippingForm;

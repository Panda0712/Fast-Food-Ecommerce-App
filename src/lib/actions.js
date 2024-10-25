import supabase from './supabase';
import Toast from 'react-native-toast-message';

export const getCategories = async () => {
  let {data: categories, error} = await supabase.from('category').select('*');

  if (error) {
    throw new Error('Lỗi tải dữ liệu các loại mặt hàng! Vui lòng thử lại sau!');
  }

  return {categories, error};
};

export const getFoods = async () => {
  let {data: foods, error} = await supabase.from('foods').select('*');

  if (error) {
    throw new Error('Lỗi tải dữ liệu món ăn! Vui lòng thử lại sau!');
  }

  return {foods, error};
};

export const insertContact = async newData => {
  const {data: contactData, error} = await supabase
    .from('contact')
    .insert([newData])
    .select();

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error(
      'Lỗi upload dữ liệu ý kiến khách hàng! Vui lòng thử lại sau!',
    );
  }

  return {contactData, error};
};

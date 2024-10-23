import supabase from './supabase';

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

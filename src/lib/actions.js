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

export const getRelatedFoods = async (category, id) => {
  const {data: relatedFoods, error} = await supabase
    .from('foods')
    .select('*')
    .eq('category', category)
    .neq('id', id)
    .limit(8);

  if (error) {
    throw new Error(
      'Lỗi tải dữ liệu các món ăn tương ứng! Vui lòng thử lại sau!',
    );
  }

  return {relatedFoods, error};
};

export const getSpecificFoods = async foodId => {
  let {data: foods, error} = await supabase
    .from('foods')
    .select('*')
    .in('id', foodId);

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error('Lấy dữ liệu món ăn thất bại! Vui lòng thử lại sau!');
  }

  return {foods, error};
};

export const getOrdersCount = async guestId => {
  let {count, error} = await supabase
    .from('orders')
    .select('*', {count: 'exact'})
    .eq('guestId', guestId);

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error('Lấy số lượng đơn hàng thất bại! Vui lòng thử lại sau!');
  }

  return {count, error};
};

export const getPaginationOrders = async (guestId, start, end) => {
  let {data: paginationOrders, error} = await supabase
    .from('orders')
    .select('*')
    .eq('guestId', guestId)
    .order('created_at', {ascending: false})
    .range(start, end);

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error(
      'Lấy dữ liệu phân trang đơn đặt hàng thất bại! Vui lòng thử lại sau!',
    );
  }

  return {paginationOrders, error};
};

export const insertOrder = async newData => {
  const {data: orderInsert, error} = await supabase
    .from('orders')
    .insert([newData])
    .select();

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error('Lỗi tạo đơn hàng! Vui lòng thử lại sau!');
  }

  return {orderInsert, error};
};

export const insertMultipleOrders = async newData => {
  const {data: orderMultipleInsert, error} = await supabase
    .from('orders')
    .insert(newData)
    .select();

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error('Lỗi tạo đơn hàng! Vui lòng thử lại sau!');
  }

  return {orderMultipleInsert, error};
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

export const getSpecificUser = async email => {
  let {data: guest, error} = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .limit(1);

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error('Lấy dữ liệu khách hàng thất bại! Vui lòng thử lại sau!');
  }

  if (!guest || guest.length === 0) {
    guest = [];
    return {guest};
  }

  return {guest: guest[0], error};
};

export const insertUser = async newData => {
  const {data: userData, error} = await supabase
    .from('guests')
    .insert([newData])
    .select();

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Thông báo',
      text2: error.message,
    });
    throw new Error('Thêm dữ liệu khách hàng thất bại! Vui lòng thử lại sau!');
  }

  return {userData, error};
};

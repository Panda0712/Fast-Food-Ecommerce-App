import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {FormData} from '../constants/models';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ShippingFormContextProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSetFormData: (newData: FormData) => void;
  resetFormData: () => void;
}

const initialValue = {
  id: 0,
  name: '',
  email: '',
  phone: '',
  address: '',
  observations: '',
};

const ShippingFormContext = createContext<ShippingFormContextProps | undefined>(
  undefined,
);

const ShippingProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [formData, setFormData] = useState<FormData>(initialValue);

  useEffect(() => {
    const loadFormData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('formData');
        if (storedData) {
          setFormData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Lỗi tải dữ liệu formData từ storage: ', error);
      }
    };
    loadFormData();
  }, []);

  const handleSetFormData = async (newData: FormData) => {
    try {
      setFormData(newData);
      await AsyncStorage.setItem('formData', JSON.stringify(newData));
    } catch (error) {
      console.error('Lỗi lưu dữ liệu formData với storage: ', error);
    }
  };

  const resetFormData = async () => {
    try {
      setFormData(initialValue);
      await AsyncStorage.removeItem('formData');
    } catch (error) {
      console.error('Lỗi reset formData ở storage: ', error);
    }
  };

  return (
    <ShippingFormContext.Provider
      value={{
        formData,
        setFormData,
        handleSetFormData,
        resetFormData,
      }}>
      {children}
    </ShippingFormContext.Provider>
  );
};

export const useShippingForm = () => {
  const context = useContext(ShippingFormContext);
  return context;
};

export default ShippingProvider;

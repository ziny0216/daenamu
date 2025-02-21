import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setUserForm } from '@/lib/features/user/userSlice';
import { FormErrors } from '@/types/components/common';
import { emailRegex } from '@/utils/regEx';

export const useForm = () => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.user.form);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  // input 유효성 체크
  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    // 이메일 유효성 검사
    if (name === 'email' && !emailRegex(value)) {
      errorMsg = '이메일을 확인해주세요';
    }

    setError(prevErrors => {
      const updatedError = { ...prevErrors };
      if (errorMsg && updatedError) {
        updatedError[name] = errorMsg;
      } else {
        delete updatedError[name];
      }

      return updatedError;
    });
  };

  // 유효성 체크 이후 form 담기
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else {
      dispatch(setUserForm({ [e.target.name]: e.target.value }));
    }
  };

  // 빈값 체크
  useEffect(() => {
    const isFormNowValid =
      Object.entries(form).every(([key, value]) => {
        if (key === 'nickname') return true;
        return value !== '';
      }) && Object.keys(error).length === 0;
    setIsValid(isFormNowValid);
  }, [error, form]);

  return {
    onChange,
    setPassword,
    form: { ...form, password },
    isValid,
    setError,
    error,
  };
};

import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { setUserForm } from '@/lib/features/user/userSlice';
import { FormErrors } from '@/types/components/common';
import { emailRegex, validateInput } from '@/utils/regEx';
import { Tables } from '@/types/database.types';

export const useForm = (
  type: 'first' | 'last' | 'request' | 'recovery',
  initialValue?: Partial<Tables<'users'>>,
) => {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) => state.user.form);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (initialValue) dispatch(setUserForm(initialValue));
  }, []);
  // input 유효성 체크
  const validateField = (name: string, value: string) => {
    let errorMsg = '';
    // 이메일 유효성 검사
    if (name === 'email' && !emailRegex(value)) {
      errorMsg = '이메일을 확인해주세요';
    }

    // 비밀번호 유효성 검사
    if (
      (name === 'password' || name === 'newPassword') &&
      !validateInput(value, true)
    ) {
      errorMsg = '특수문자, 숫자, 영문자 조합으로 입력해주세요.';
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
    } else if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value);
    } else {
      dispatch(setUserForm({ [e.target.name]: e.target.value }));
    }
  };

  // 빈값 체크
  useEffect(() => {
    let isFormNowValid: boolean;

    switch (type) {
      case 'first':
        isFormNowValid = !!(form.email && password);
        break;
      case 'last':
        isFormNowValid = !!(form.nickname && form.introduce);
        break;
      case 'request':
        isFormNowValid = !!form.email;
        break;
      case 'recovery':
        isFormNowValid = !!password;
        break;
    }

    if (isFormNowValid) {
      isFormNowValid = Object.keys(error).length === 0;
    }

    setIsValid(isFormNowValid);
  }, [form, error, password, type]);

  return {
    onChange,
    setPassword,
    setNewPassword,
    form: { ...form, password, newPassword },
    isValid,
    setError,
    error,
  };
};

import { useCallback } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { ADD_VOC_API_URL, SEND_EMAIL_API_URL } from '@/constants/apiUrls';

export function usePostVoCForm(setSubmittedData) {
  const postVocForm = useCallback(async (data) => {
    return await axios.post(ADD_VOC_API_URL, data);
  }, []);

  return useMutation({
    mutationFn: postVocForm,
    onSuccess: (data) => {
      if (data.data.code === 200) {
        setSubmittedData((prev) => ({ ...prev, ins_date: data.data.data.ins_date }));
        return true;
      }
    },
    onError: (error) => {
      console.log(error);
      return false;
    },
  });
}

export function usePostEmailForm() {
  const postEmailForm = useCallback(async (data) => {
    return await axios.post(SEND_EMAIL_API_URL, data);
  }, []);

  return useMutation({
    mutationFn: postEmailForm,
    onSuccess: (data) => {
      if (data.data.code === 200) {
        return true;
      }
    },
    onError: (error) => {
      console.log(error);
      return false;
    },
  });
}

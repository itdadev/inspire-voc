import { useMutation } from '@tanstack/react-query';
import { ADD_VOC_API_URL } from '@/constants/apiUrls';
import axios from 'axios';
import { useCallback } from 'react';

export function usePostVoCForm() {
  const postVocForm = useCallback(async (data) => {
    return await axios.post(ADD_VOC_API_URL, data);
  }, []);

  return useMutation({
    mutationFn: postVocForm,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

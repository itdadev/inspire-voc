import { useCallback } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

import { ADD_VOC_API_URL } from '@/constants/apiUrls';

export function usePostVoCForm() {
  const postVocForm = useCallback(async (data) => {
    return await axios.post(ADD_VOC_API_URL, data);
  }, []);

  return useMutation({
    mutationFn: postVocForm,
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

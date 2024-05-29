import { useCallback } from 'react';
import axios from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';

import { CATEGORY_LIST_API_URL, ROUTE_LIST_API_URL, TIME_LIST_API_URL } from '@/constants/apiUrls';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import { CATEGORY_LIST_KEY, ROUTE_LIST_KEY, TIME_LIST_KEY } from '@/constants/queryKeys';

export function useGetCategoryList() {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const getCategoryList = useCallback(async () => {
    return await axios.get(`${CATEGORY_LIST_API_URL}/1?lang=${language}`);
  }, [language]);

  return useSuspenseQuery({
    queryKey: [CATEGORY_LIST_KEY, language, localStorage],
    queryFn: getCategoryList,
    select: (data) => data.data.data,
  });
}

export function useGetRouteList() {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const getRouteCategoryList = useCallback(async () => {
    return await axios.get(`${ROUTE_LIST_API_URL}/1?lang=${language}`);
  }, [language]);

  return useSuspenseQuery({
    queryKey: [ROUTE_LIST_KEY, language, localStorage],
    queryFn: getRouteCategoryList,
    select: (data) => data.data.data,
  });
}

export function useGetTimeList() {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const getTimeCategoryList = useCallback(async () => {
    return await axios.get(`${TIME_LIST_API_URL}/1?lang=${language}`);
  }, [language]);

  return useSuspenseQuery({
    queryKey: [TIME_LIST_KEY, language, localStorage],
    queryFn: getTimeCategoryList,
    select: (data) => data.data.data,
  });
}

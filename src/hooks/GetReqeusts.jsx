import { useCallback } from 'react';
import axios from 'axios';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { CODE_API_URL } from '@/constants/apiUrls';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import { CATEGORY_LIST_KEY, ROUTE_LIST_KEY, TIME_LIST_KEY } from '@/constants/queryKeys';

export function useGetCategoryList() {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const getCategoryList = useCallback(async () => {
    return await axios.get(`${CODE_API_URL}/4?lang=${language}`);
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
    return await axios.get(`${CODE_API_URL}/5?lang=${language}`);
  }, [language]);

  return useQuery({
    queryKey: [ROUTE_LIST_KEY, language, localStorage],
    queryFn: getRouteCategoryList,
    select: (data) => data.data.data,
  });
}

export function useGetTimeList(routeKey) {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const getTimeCategoryList = useCallback(async () => {
    return await axios.get(
      `${CODE_API_URL}/${Number(routeKey.replaceAll('"', ''))}?lang=${language}`
    );
  }, [language, routeKey]);

  return useQuery({
    queryKey: [TIME_LIST_KEY, language, localStorage, routeKey],
    queryFn: getTimeCategoryList,
    select: (data) => data.data.data,
    enabled: !!routeKey,
  });
}

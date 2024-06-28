import { useCallback } from 'react';
import axios from 'axios';

import { useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';

import {
  CODE_API_URL,
  FOOTER_ADDRESS_URL,
  FOOTER_CONTACT_URL,
  FOOTER_MENU_URL,
  FOOTER_SNS_URL,
  PRIVACY_POLICY_URL,
} from '@/constants/apiUrls';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';
import {
  CATEGORY_LIST_KEY,
  FOOTER_ADDRESS_KEY,
  FOOTER_CONTACT_KEY,
  FOOTER_MENU_KEY,
  FOOTER_SNS_KEY,
  PRIVACY_POLICY_KEY,
  ROUTE_LIST_KEY,
  TIME_LIST_KEY,
} from '@/constants/queryKeys';

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

export function useGetPrivacyPolicy() {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const getPrivacyPolicy = useCallback(async () => {
    return await axios.get(`${PRIVACY_POLICY_URL}?language=${language}`);
  }, [language]);

  return useSuspenseQuery({
    queryKey: [PRIVACY_POLICY_KEY, language, localStorage],
    queryFn: getPrivacyPolicy,
    select: (data) => data.data[0],
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

// Footer.jsx
export function useGetFooterInformation() {
  const language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  return useSuspenseQueries({
    queries: [
      {
        queryKey: [FOOTER_ADDRESS_KEY],
        queryFn: () => axios.get(`${FOOTER_ADDRESS_URL}&language=${language}`),
        select: (data) => data.data[0],
      },
      {
        queryKey: [FOOTER_MENU_KEY],
        queryFn: () => axios.get(`${FOOTER_MENU_URL}&language=${language}`),
        select: (data) => data.data.data,
      },
      {
        queryKey: [FOOTER_CONTACT_KEY],
        queryFn: () => axios.get(`${FOOTER_CONTACT_URL}&language=${language}`),
        select: (data) => data.data[0],
      },
      {
        queryKey: [FOOTER_SNS_KEY],
        queryFn: () => axios.get(`${FOOTER_SNS_URL}&language=${language}`),
        select: (data) => data.data[0],
      },
    ],
  });
}

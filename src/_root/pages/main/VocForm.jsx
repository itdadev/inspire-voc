import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from '@emotion/styled';
import { useIntl } from 'react-intl';

import en from 'react-phone-number-input/locale/en';
import PhoneInput from 'react-phone-number-input';

import { PrivacyPolicyModal } from '@/components/ui/modal';
import { FileUpload, PhoneNumberInput, SelectInput, TextInput } from '@/components/ui/inputs';
import { RequiredMark } from '@/components/ui/inputs/TextInput';
import { GoogleRecaptcha } from '@/components/ui/item';
import { PrimaryButton } from '@/components/ui/button';
import { zodVoc } from '@/lib/react-hook-form/zodValidation';
import { mq } from '@/lib/react-responsive/mediaQuery';
import { emailIdPerLanguage, getCodeName, getTimeIndex } from '@/utils/Functions';
import { useGetCategoryList, useGetRouteList, useGetTimeList } from '@/hooks/GetReqeusts';
import { usePostEmailForm, usePostVoCForm } from '@/hooks/PostRequests';
import { AgreeTerm } from '@/_root/pages/main/index';
import {
  CategoryText,
  ContentText,
  EmailText,
  FirstNameText,
  LastNameText,
  OptionText,
  PhoneNumberText,
  SubmitText,
  TimeText,
  TitleText,
} from '@/lib/react-intl/TranslatedTexts';
import { LOCAL_STORAGE_LANGUAGE } from '@/constants/storageKey';

const TextInputWrapper = styled.div(() => ({
  minHeight: '8rem',
  width: '100%',
}));

const CustomForm = styled.form(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '58.8rem',
  margin: '0 auto',
}));

const TextWrapper = styled.div(() => ({
  [mq('tablet')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0 1.6rem',
  },

  [mq('desktop')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0 1.6rem',
  },
}));

const ButtonWrapper = styled.div(() => ({
  marginTop: '6rem',
}));

const VocForm = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const lang = localStorage.getItem(LOCAL_STORAGE_LANGUAGE);

  const { categoryType, option1 } = useParams();

  const [fileList, setFileList] = useState([]);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState({});

  const now = dayjs().format('HH:mm');

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodVoc),
    mode: 'onSubmit',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      route: '5',
      time: '',
      category: '1',
      title: '',
      content: '',
      agreeToTerm: false,
      captcha: false,
    },
  });

  useEffect(() => {
    setValue('category', '1');
  }, [setValue]);

  // NOTE: fetching select Lists
  const watchData = watch();

  const { data: timeList } = useGetTimeList(watchData.route);
  const { data: categoryList } = useGetCategoryList();
  const { data: routeList } = useGetRouteList();

  // NOTE: post voc form
  const { mutate: postVocForm, isSuccess } = usePostVoCForm(setSubmittedData);

  const { mutate: postEmailForm, isSuccess: emailSendSuccess } = usePostEmailForm();

  useEffect(() => {
    // NOTE: time url 기준으로 미리 선택
    const lastIndex = getTimeIndex(timeList, now);

    if (timeList?.[lastIndex]) {
      setValue('time', timeList[lastIndex].code_value);
    } else {
      setValue('time', '');
    }
  }, [timeList, isSuccess, setValue, now]);

  useEffect(() => {
    // NOTE: category url 기준으로 미리 선택
    const selectedCategory = categoryList?.find(
      (el) => el.code_value.toLowerCase() === categoryType
    );

    if (selectedCategory) {
      setValue('category', selectedCategory.code_value);
    } else {
      setValue('time', '');
    }
  }, [categoryType, categoryList, isSuccess, setValue]);

  useEffect(() => {
    // NOTE: route url 기준으로 미리 선택
    const selectedRoute = routeList?.find((el) => el.code_id.toLowerCase() === option1);

    if (selectedRoute?.code_value) {
      setValue('route', selectedRoute?.code_value);
    } else {
      setValue('route', routeList?.[0].code_value);
    }
  }, [option1, routeList, isSuccess, setValue]);

  useEffect(() => {
    // NOTE: phone 쓰고 다시 지웠을 때 undefined로 떠서 validation 문구 required로 뜨는 문제
    if (watchData.phone === undefined) {
      setValue('phone', '');
    }
  }, [watchData.phone, setValue]);

  useEffect(() => {
    // NOTE: after form submit success
    if (isSuccess && !emailSendSuccess) {
      const customerEmailData = {
        template_id: emailIdPerLanguage(),
        target: [{ email: submittedData?.email }],
        content: {
          first_name: submittedData?.first_name,
          last_name: submittedData?.last_name,
          phone: submittedData?.phone,
          email: submittedData?.email,
          route: getCodeName(routeList, submittedData?.route),
          time: getCodeName(timeList, submittedData?.time),
          category: getCodeName(categoryList, submittedData?.category),
          title: submittedData?.title,
          content: submittedData?.content,
          file_url: fileList?.[0]?.file_url,
          file_name: fileList?.[0]?.origin_file_name,
        },
      };

      const managerEmailData = {
        template_id: process.env.REACT_APP_EMAIL_INSPIRE_ID,
        target: [
          { email: process.env.REACT_APP_EMAIL_MANAGER_1 },
          { email: process.env.REACT_APP_EMAIL_MANAGER_2 },
        ],
        content: {
          ins_date: submittedData?.ins_date,
          first_name: submittedData?.first_name,
          last_name: submittedData?.last_name,
          phone: submittedData?.phone,
          email: submittedData?.email,
          route: getCodeName(routeList, submittedData?.route),
          time: getCodeName(timeList, submittedData?.time),
          category: getCodeName(categoryList, submittedData?.category),
          title: submittedData?.title,
          content: submittedData?.content,
          file_url: fileList?.[0]?.file_url,
          file_name: fileList?.[0]?.origin_file_name,
        },
      };

      postEmailForm(customerEmailData);

      postEmailForm(managerEmailData);
    }

    if (emailSendSuccess) {
      navigate(`/${lang}/complete`, { state: { complete: true } });
    }
  }, [
    isSuccess,
    resetField,
    navigate,
    emailSendSuccess,
    categoryList,
    fileList,
    lang,
    postEmailForm,
    routeList,
    timeList,
    submittedData,
  ]);

  const submitVocForm = useCallback(
    (data) => {
      setSubmittedData(data);

      // NOTE: form submit
      postVocForm({
        ...data,
        file_list: fileList,
      });
    },
    [postVocForm, fileList]
  );

  return (
    <CustomForm onSubmit={handleSubmit(submitVocForm)}>
      <PrivacyPolicyModal openModal={privacyPolicyOpen} setOpenModal={setPrivacyPolicyOpen} />

      <TextWrapper>
        <TextInput
          control={control}
          name="first_name"
          label={<FirstNameText />}
          placeholder="lang-first-name-placeholder-text"
          maxLength={15}
          required
        />

        <TextInput
          control={control}
          name="last_name"
          label={<LastNameText />}
          placeholder="lang-last-name-placeholder-text"
          maxLength={15}
          required
        />
      </TextWrapper>

      <Controller
        control={control}
        name="phone"
        render={({ field }) => {
          return (
            <TextInputWrapper>
              <PhoneInput
                {...field}
                placeholder={intl.formatMessage({
                  id: 'lang-phone-number-placeholder-text',
                })}
                inputComponent={PhoneNumberInput}
                name="country_code"
                label={
                  <>
                    <PhoneNumberText />
                    {<RequiredMark>*</RequiredMark>}
                  </>
                }
                error={!!errors['phone']}
                helperText={errors['phone']?.message}
                defaultCountry={'KR'}
                labels={en}
                control={control}
              />
            </TextInputWrapper>
          );
        }}
      />

      <TextWrapper>
        <SelectInput
          disabled
          control={control}
          errors={errors}
          name="category"
          arr={categoryList}
          label={<CategoryText />}
        />

        <SelectInput
          disabled={timeList === undefined}
          control={control}
          errors={errors}
          name="time"
          arr={timeList}
          label={<TimeText />}
        />
      </TextWrapper>

      <SelectInput
        control={control}
        errors={errors}
        name="route"
        arr={routeList}
        label={<OptionText />}
      />

      <TextInput
        control={control}
        name="email"
        label={<EmailText />}
        placeholder="lang-email-placeholder-text"
        maxLength={50}
        inputmode="email"
        required
      />

      <TextInput
        control={control}
        name="title"
        label={<TitleText />}
        placeholder="lang-title-placeholder-text"
        maxLength={100}
        required
      />

      <TextInput
        control={control}
        name="content"
        label={<ContentText />}
        rows={6}
        multiline
        placeholder="lang-content-placeholder-text"
        maxLength={500}
        required
      />

      <FileUpload fileList={fileList} setFileList={setFileList} />

      <AgreeTerm control={control} errors={errors} setPrivacyPolicyOpen={setPrivacyPolicyOpen} />

      <GoogleRecaptcha setValue={setValue} errors={errors} />

      <ButtonWrapper>
        <PrimaryButton buttonType="submit" thick>
          <SubmitText />
        </PrimaryButton>
      </ButtonWrapper>
    </CustomForm>
  );
};

export default VocForm;

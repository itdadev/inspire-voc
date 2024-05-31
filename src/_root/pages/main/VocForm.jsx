import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from '@emotion/styled';

import en from 'react-phone-number-input/locale/en';
import PhoneInput from 'react-phone-number-input';

import { PrivacyPolicyModal } from '@/components/ui/modal';
import { FileUpload, PhoneNumberInput, SelectInput, TextInput } from '@/components/ui/inputs';
import { PrimaryButton } from '@/components/ui/button';
import { zodVoc } from '@/lib/react-hook-form/zodValidation';
import { mq } from '@/lib/react-responsive/mediaQuery';
import { getTimeIndex } from '@/utils/Functions';
import { useGetCategoryList, useGetRouteList, useGetTimeList } from '@/hooks/GetReqeusts';
import { usePostVoCForm } from '@/hooks/PostRequests';
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
import { useIntl } from 'react-intl';
import { SubmitSuccessAlert } from '@/components/ui/alert';

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

  const { categoryType, option1, option2 } = useParams();

  const [successSnackBar, setSuccessSnackBar] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

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
      country_code: '',
      category: '',
      route_key: '',
      time_key: '',
      category_key: '',
      title: '',
      content: '',
      agreeToTerm: false,
    },
  });

  // NOTE: fetching select Lists
  const watchData = watch();

  const { data: timeList } = useGetTimeList(watchData.route_key);
  const { data: categoryList } = useGetCategoryList();
  const { data: routeList } = useGetRouteList();

  // NOTE: post voc form
  const { mutate: postVocForm, isSuccess } = usePostVoCForm();

  useEffect(() => {
    // NOTE: time url 기준으로 미리 선택
    const lastIndex = getTimeIndex(timeList, option2);

    if (timeList?.[lastIndex]) {
      setValue('time_key', JSON.stringify(timeList[lastIndex].key));
    } else {
      setValue('time_key', '');
    }
  }, [timeList, isSuccess, setValue, option2]);

  useEffect(() => {
    // NOTE: category url 기준으로 미리 선택
    const selectedCategory = categoryList?.find((el) => el.id.toLowerCase() === categoryType);

    if (selectedCategory) {
      setValue('category_key', JSON.stringify(selectedCategory.key));
    } else {
      setValue('time_key', '');
    }
  }, [categoryType, categoryList, isSuccess, setValue]);

  useEffect(() => {
    // NOTE: route url 기준으로 미리 선택
    const selectedRoute = routeList?.find((el) => el.id.toLowerCase() === option1);

    if (selectedRoute?.key) {
      setValue('route_key', JSON.stringify(selectedRoute?.key));
    } else {
      setValue('route_key', JSON.stringify(routeList?.[0].key));
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
    if (isSuccess) {
      resetField('first_name', { keepError: false });
      resetField('last_name', { keepError: false });
      resetField('phone', { keepError: false });
      resetField('email', { keepError: false });
      resetField('title', { keepError: false });
      resetField('content', { keepError: false });
      resetField('agreeToTerm', { keepError: false });

      setSuccessSnackBar(true);

      setFileList([]);
    }
  }, [isSuccess, setSuccessSnackBar, resetField]);

  const submitVocForm = useCallback(
    (data) => {
      // NOTE: form submit
      postVocForm({ ...data, file_list: fileList });
    },
    [postVocForm, fileList]
  );

  return (
    <CustomForm onSubmit={handleSubmit(submitVocForm)}>
      <PrivacyPolicyModal openModal={privacyPolicyOpen} setOpenModal={setPrivacyPolicyOpen} />

      <SubmitSuccessAlert
        successSnackBar={successSnackBar}
        setSuccessSnackBar={setSuccessSnackBar}
      />

      <TextWrapper>
        <TextInput
          control={control}
          name="first_name"
          label={<FirstNameText />}
          placeholder={intl.formatMessage({
            id: 'lang-first-name-required-text',
          })}
          maxLength={15}
        />

        <TextInput
          control={control}
          name="last_name"
          label={<LastNameText />}
          placeholder={intl.formatMessage({
            id: 'lang-last-name-required-text',
          })}
          maxLength={15}
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
                  id: 'lang-phone-number-required-text',
                })}
                inputComponent={PhoneNumberInput}
                name="country_code"
                label={<PhoneNumberText />}
                error={!!errors['phone'] || !!errors['country_code']}
                helperText={errors['phone']?.message || errors['country_code']?.message}
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
          name="category_key"
          arr={categoryList}
          label={<CategoryText />}
        />

        <SelectInput
          disabled={timeList === undefined}
          control={control}
          errors={errors}
          name="time_key"
          arr={timeList}
          label={<TimeText />}
        />
      </TextWrapper>

      <SelectInput
        control={control}
        errors={errors}
        name="route_key"
        arr={routeList}
        label={<OptionText />}
      />

      <TextInput
        control={control}
        name="email"
        label={<EmailText />}
        placeholder={intl.formatMessage({
          id: 'lang-email-required-text',
        })}
      />

      <TextInput
        control={control}
        name="title"
        label={<TitleText />}
        placeholder={intl.formatMessage({
          id: 'lang-title-required-text',
        })}
      />

      <TextInput
        control={control}
        name="content"
        label={<ContentText />}
        rows={6}
        multiline
        placeholder={intl.formatMessage({
          id: 'lang-content-required-text',
        })}
      />

      <FileUpload fileList={fileList} setFileList={setFileList} />

      <AgreeTerm control={control} errors={errors} setPrivacyPolicyOpen={setPrivacyPolicyOpen} />

      <ButtonWrapper>
        <PrimaryButton buttonType="submit" thick>
          <SubmitText />
        </PrimaryButton>
      </ButtonWrapper>
    </CustomForm>
  );
};

export default VocForm;

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import AgreeTerm from '@/_root/pages/main/AgreeTerm';
import { findLastFalseIndex } from '@/utils/Functions';
import { useGetCategoryList, useGetRouteList, useGetTimeList } from '@/hooks/GetReqeusts';
import { usePostVoCForm } from '@/hooks/PostRequests';

const dayjs = require('dayjs');

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
  const navigate = useNavigate();

  const { categoryType, option1, option2 } = useParams();
  const [fileList, setFileList] = useState([]);

  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
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

  // NOTE: select lists
  const { data: timeList } = useGetTimeList();
  const { data: categoryList } = useGetCategoryList();
  const { data: routeList } = useGetRouteList();

  useEffect(() => {
    // NOTE: time url 기준으로 미리 선택
    const today = dayjs();
    const formattedToday = today.format('YYYY-MM-DD');

    const now = dayjs(`${formattedToday} ${option2}:00`);

    const startTimeArr = timeList.map((time) => {
      const startTime = time.name.split(' ~ ')[0];

      const startDateFormat = `${formattedToday}T${startTime}:00+09:00`;

      return now.isBefore(dayjs(startDateFormat));
    });

    const lastIndex = findLastFalseIndex(startTimeArr);

    if (timeList[lastIndex]) {
      setValue('time_key', JSON.stringify(timeList[lastIndex].key));
    } else {
      setValue('time_key', '1');
    }
  }, []);

  useEffect(() => {
    // NOTE: category url 기준으로 미리 선택
    const selectedCategory = categoryList.find((el) => el.id.toLowerCase() === categoryType);

    if (selectedCategory) {
      setValue('category_key', JSON.stringify(selectedCategory.key));
    } else {
      navigate('/not-found');
    }
  }, [categoryType, categoryList]);

  useEffect(() => {
    // NOTE: route url 기준으로 미리 선택
    const selectedRoute = routeList.find((el) => el.id.toLowerCase() === option1);

    if (selectedRoute?.key) {
      setValue('route_key', JSON.stringify(selectedRoute?.key));
    } else {
      navigate('/not-found');
    }
  }, [option1]);

  const { mutate: postVocForm } = usePostVoCForm();

  const submitVocForm = useCallback(
    (data) => {
      postVocForm({ ...data, file_list: fileList });
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
          label="First Name"
          placeholder="성을 입력해주세요."
          maxLength={15}
        />

        <TextInput
          control={control}
          name="last_name"
          label="Last Name"
          placeholder="이름을 입력해주세요."
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
                placeholder="핸드폰 번호를 입력해주세요."
                inputComponent={PhoneNumberInput}
                onChange={field.onChange}
                name="country_code"
                label="Phone Number"
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
          label={'Category'}
          placeholder="카테고리를 선택해주세요."
        />

        <SelectInput
          control={control}
          errors={errors}
          name="time_key"
          arr={timeList}
          label={'Time'}
          placeholder="시간대를 선택해주세요."
        />
      </TextWrapper>

      <SelectInput
        control={control}
        errors={errors}
        name="route_key"
        arr={routeList}
        label={'Route'}
        placeholder="루트를 선택해주세요."
      />

      <TextInput
        control={control}
        name="email"
        label="Email"
        placeholder="이메일을 입력해주세요."
      />

      <TextInput control={control} name="title" label="Title" placeholder="제목을 입력해주세요." />

      <TextInput
        control={control}
        name="content"
        label="Content"
        placeholder="내용을 입력해주세요."
        rows={6}
        multiline
      />

      <FileUpload fileList={fileList} setFileList={setFileList} />

      <AgreeTerm control={control} errors={errors} setPrivacyPolicyOpen={setPrivacyPolicyOpen} />

      <ButtonWrapper>
        <PrimaryButton buttonType="submit" thick>
          Submit
        </PrimaryButton>
      </ButtonWrapper>
    </CustomForm>
  );
};

export default VocForm;

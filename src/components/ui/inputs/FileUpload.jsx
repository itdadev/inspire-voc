import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { image } from '@/theme';
import styled from '@emotion/styled';
import { RiCloseLine } from '@remixicon/react';
import { Alert } from '@mui/material';

import { DOWNLOAD_FILE_LIST_API_URL, UPLOAD_FILE_LIST_API_URL } from '@/constants/apiUrls';
import {
  AttatchmentSizeText,
  FileFormatText,
  UploadFilesInvalidText,
  UploadFilesLimitRequiredText,
  UploadFilesSizeLimitText,
  UploadFilesText,
} from '@/lib/react-intl/TranslatedTexts';
import { LoadingSpinner } from '@/components/loading';
import { checkFileExtension } from '@/utils/Functions';
import { MAX_FILE_UPLOAD_LENGTH, MAX_FILE_UPLOAD_SIZE } from '@/constants/Constants';

const Container = styled.div(() => ({
  margin: '0 0 2rem',

  "input[type='file']": {
    display: 'none',
  },
}));

const Label = styled.label(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  background: theme.color.point04,
  gap: '0 1rem',
  cursor: 'pointer',
  padding: '1rem',
  borderRadius: '1rem',
  color: theme.color.white,
  fontSize: '1.4rem',
}));

const List = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem 0',
  margin: '1rem 0 2rem',
  padding: '1rem 0',
}));

const Item = styled.div(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0 1rem',
}));

const FileName = styled.a(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2rem',
  borderBottom: `1px solid ${theme.color.grey03}`,
  width: 'fit-content',
  cursor: 'pointer',
}));

const CloseIcon = styled(RiCloseLine)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'all 0.3s',
  color: theme.color.grey02,

  '&:hover': {
    color: theme.color.red01,
  },
}));

const StyledAlert = styled(Alert)(() => ({
  margin: '1rem 0',
}));

const Description = styled.div(() => ({
  marginTop: '1rem',
  color: '#979797',
  fontSize: '1.4rem',
  lineHeight: 1.2,
}));

const FileUpload = ({ fileList, setFileList }) => {
  const [maxFileSizeAlert, setMaxFileSizeAlert] = useState(false);
  const [maxFileLengthAlert, setMaxFileLengthAlert] = useState(false);
  const [fileInvalidAlert, setFileInvalidAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadFileList = useCallback(
    async (e) => {
      if (e.target.files.length === 0) {
        // NOTE: 파일 선택 안하고 팝업창 닫을시
        return;
      }

      if (fileList?.length + e.target.files.length > MAX_FILE_UPLOAD_LENGTH) {
        // NOTE: 최대 업로드 파일 개수 초과시
        setMaxFileLengthAlert(true);
        return;
      }

      let allFilesValid = true;
      let allFilesSmall = true;
      Array.from(e.target.files).forEach((file) => {
        if (file.size > MAX_FILE_UPLOAD_SIZE) {
          setMaxFileSizeAlert(true);
          allFilesSmall = false;
        }

        // NOTE: 파일 확장자 유효성 체크
        if (!checkFileExtension(file)) {
          setFileInvalidAlert(true);
          allFilesValid = false;
        }
      });

      if (!allFilesValid || !allFilesSmall) {
        return;
      }

      const formData = new FormData();

      Array.from(e.target.files).forEach((file) => {
        formData.append('files', file);
      });

      setLoading(true);

      try {
        const { status, data } = await axios.post(UPLOAD_FILE_LIST_API_URL, formData);

        if (status === 200) {
          const wholeArr = fileList.concat(data);

          setFileList(wholeArr);
          setFileInvalidAlert(false);
          setMaxFileSizeAlert(false);
        }
      } catch (error) {
        console.error('File upload failed', error);
      } finally {
        setLoading(false);
      }
    },
    [setFileList, fileList]
  );

  const deleteFileFromList = useCallback(
    (file) => {
      const newArr = fileList.filter((el) => el !== file);

      setFileList(newArr);
    },
    [fileList, setFileList]
  );

  useEffect(() => {
    if (fileList?.length > 5) {
      setMaxFileLengthAlert(true);
    } else {
      setMaxFileLengthAlert(false);
    }
  }, [fileList]);

  return (
    <Container>
      {loading ? (
        <LoadingSpinner isFetching width="3.2rem" point />
      ) : (
        <Label htmlFor="images">
          <img src={image.fileUploadIcon.default} alt="" width={20} />

          <div>
            <UploadFilesText />
          </div>
        </Label>
      )}

      <Description>
        <p>
          <FileFormatText />
        </p>

        <p>
          <AttatchmentSizeText />
        </p>
      </Description>

      <input type="file" id="images" onChange={uploadFileList} accept=".png, .jpg, .jpeg" />

      {maxFileLengthAlert && (
        <StyledAlert severity="warning">
          <UploadFilesLimitRequiredText />
        </StyledAlert>
      )}

      {fileInvalidAlert && (
        <StyledAlert severity="warning">
          <UploadFilesInvalidText />
        </StyledAlert>
      )}

      {maxFileSizeAlert && (
        <StyledAlert severity="warning">
          <UploadFilesSizeLimitText />
        </StyledAlert>
      )}

      {fileList?.length > 0 && (
        <List>
          {fileList?.map((file) => {
            return (
              <Item key={file.file_url}>
                <FileName
                  href={`${DOWNLOAD_FILE_LIST_API_URL}?path=${file.file_path}&tname=${file.temp_file_name}&name=${file.origin_file_name}`}
                >
                  {file.origin_file_name}
                </FileName>

                <CloseIcon size={24} onClick={() => deleteFileFromList(file)} />
              </Item>
            );
          })}
        </List>
      )}
    </Container>
  );
};

export default FileUpload;

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { image } from '@/theme';
import styled from '@emotion/styled';
import { RiCloseLine } from '@remixicon/react';
import { Alert } from '@mui/material';

import { DOWNLOAD_FILE_LIST_API_URL, UPLOAD_FILE_LIST_API_URL } from '@/constants/apiUrls';
import {
  UploadFilesLimitRequiredText,
  UploadFilesPlaceholderText,
  UploadFilesText,
} from '@/lib/react-intl/TranslatedTexts';

const Container = styled.div(() => ({
  margin: '2rem 0',

  "input[type='file']": {
    display: 'none',
  },
}));

const Label = styled.label(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0 1rem',
  cursor: 'pointer',
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

const FileUpload = ({ fileList, setFileList }) => {
  const [maxFileLengthAlert, setMaxFileLengthAlert] = useState(false);

  const uploadFileList = useCallback(
    async (e) => {
      if (e.target.files.length === 0) {
        return;
      }

      if (fileList?.length + e.target.files.length > 5) {
        setMaxFileLengthAlert(true);
        return;
      }

      const formData = new FormData();

      Array.from(e.target.files).map((file) => {
        formData.append('files', file);
      });

      const { status, data } = await axios.post(UPLOAD_FILE_LIST_API_URL, formData);

      if (status === 200) {
        const wholeArr = fileList.concat(data);

        setFileList(wholeArr);
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
    if (fileList.length > 5) {
      setMaxFileLengthAlert(true);
    } else {
      setMaxFileLengthAlert(false);
    }
  }, [fileList]);

  return (
    <Container>
      <Label htmlFor="images">
        <img src={image.fileUploadIcon.default} alt="" width={30} />
        <UploadFilesText /> (<UploadFilesPlaceholderText />)
      </Label>

      <input type="file" id="images" onChange={uploadFileList} multiple="multiple" />

      {maxFileLengthAlert && (
        <StyledAlert severity="warning">
          <UploadFilesLimitRequiredText />
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

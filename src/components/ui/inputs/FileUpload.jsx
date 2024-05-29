import React, { useCallback } from 'react';
import { image } from '@/theme';
import styled from '@emotion/styled';
import { DOWNLOAD_FILE_LIST_API_URL, UPLOAD_FILE_LIST_API_URL } from '@/constants/apiUrls';
import axios from 'axios';
import { RiCloseLine } from '@remixicon/react';

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
  margin: '2rem 0',
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

  '&:hover': {
    color: theme.color.red01,
  },
}));

const FileUpload = ({ fileList, setFileList }) => {
  const uploadFileList = useCallback(
    async (e) => {
      const formData = new FormData();

      Array.from(e.target.files).map((file) => {
        formData.append('files', file);
      });

      const { status, data } = await axios.post(UPLOAD_FILE_LIST_API_URL, formData);

      if (status === 200) {
        setFileList(data);
      }
    },
    [setFileList]
  );

  const deleteFileFromList = useCallback(
    (file) => {
      const newArr = fileList.filter((el) => el !== file);

      setFileList(newArr);
    },
    [fileList, setFileList]
  );

  return (
    <Container>
      <Label htmlFor="images">
        <img src={image.fileUploadIcon.default} alt="" width={30} />
        Upload files (max 10MB, 5 files)
      </Label>

      <input type="file" id="images" onChange={uploadFileList} multiple="multiple" />

      {fileList && (
        <List>
          {fileList?.map((file) => {
            return (
              <Item key={file.file_url}>
                <FileName
                  href={`${DOWNLOAD_FILE_LIST_API_URL}?path=${file.file_path}&tname=${file.temp_file_name}&name=${file.origin_file_name}`}
                >
                  {file.origin_file_name}
                </FileName>

                <CloseIcon size={20} onClick={() => deleteFileFromList(file)} />
              </Item>
            );
          })}
        </List>
      )}
    </Container>
  );
};

export default FileUpload;

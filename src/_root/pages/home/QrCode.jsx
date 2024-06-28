import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Button = styled.button(({ theme }) => ({
  maxWidth: '20rem',
  minWidth: '20rem',
  padding: '2rem',
  background: theme.color.point01,
  color: 'white',
  margin: '2rem auto',
}));
const QrCode = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button onClick={() => navigate('/voc/bus/ansan_jeongwang-dong')}>QR CODE</Button>
    </div>
  );
};

export default QrCode;

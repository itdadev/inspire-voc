import React, { memo } from 'react';
import { switchSlashToEmptySpace } from '@/utils/Functions';

const DangerouslyHtml = ({ value, className }) => {
  return typeof value === 'string' ? (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: switchSlashToEmptySpace(value),
      }}
    />
  ) : (
    value
  );
};

export default memo(DangerouslyHtml);

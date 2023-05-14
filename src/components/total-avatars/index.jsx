import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export function B8TotalAvatars({ data }) {
    console.log(data);
  return (
      <AvatarGroup max={10} total={data?.length}>
          {data.map((item, index) => (
              <Avatar key={index} alt={item?.author?.name} src={item?.author?.avatar} />
          ))}
    </AvatarGroup>
  );
}
import React from 'react';
import { Stack, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const UserAvatar = styled(Avatar)({
  width: 24,
  height: 24,
  borderRadius: '50%'
});

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: theme.palette.text.primary
}));

interface UserCellProps {
  name: string;
  avatar: string;
}

const UserCell: React.FC<UserCellProps> = ({ name, avatar }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <UserAvatar src={avatar} alt={name} />
      <UserName>{name}</UserName>
    </Stack>
  );
};

export default UserCell;
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemText } from '@mui/material';
import ThreeDotsIcon from '../icons/ThreeDotsIcon';

interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete, onView }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: () => void) => {
    action();
    handleClose();
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ color: 'text.primary' }}
      >
        <ThreeDotsIcon width={10} height={2} color="currentColor" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {onView && (
          <MenuItem onClick={() => handleAction(onView)}>
            <ListItemText primary="View" />
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem onClick={() => handleAction(onEdit)}>
            <ListItemText primary="Edit" />
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem onClick={() => handleAction(onDelete)}>
            <ListItemText primary="Delete" />
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ActionMenu;
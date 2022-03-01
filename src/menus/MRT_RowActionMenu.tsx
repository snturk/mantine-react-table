import React, { FC } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Row } from '..';

interface Props {
  anchorEl: HTMLElement | null;
  row: MRT_Row;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  handleEdit: () => void;
}

export const MRT_RowActionMenu: FC<Props> = ({
  anchorEl,
  row,
  handleEdit,
  setAnchorEl,
}) => {
  const {
    icons: { EditIcon },
    enableRowEditing,
    localization,
    renderRowActionMenuItems,
    tableInstance,
  } = useMRT();

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {enableRowEditing && (
        <MenuItem sx={{ display: 'flex', gap: '0.75rem' }} onClick={handleEdit}>
          <EditIcon /> {localization.rowActionMenuItemEdit}
        </MenuItem>
      )}
      {renderRowActionMenuItems?.(row, tableInstance, () =>
        setAnchorEl(null),
      ) ?? null}
    </Menu>
  );
};

import React, { FC } from 'react';
import { Box } from '@mantine/core';
import { lighten } from '../colorManipulator';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooter: FC<Props> = ({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode, muiTableFooterProps },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps({ table })
      : muiTableFooterProps;

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <Box
      component="tfoot"
      {...tableFooterProps}
      sx={(theme) => ({
        backgroundColor: lighten(theme.colors.dark[7], 0.06),
        bottom: stickFooter ? 0 : undefined,
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        opacity: stickFooter ? 0.97 : undefined,
        outline: stickFooter
          ? theme.colorScheme === 'light'
            ? `1px solid ${theme.colors.gray[3]}`
            : `1px solid ${theme.colors.gray[7]}`
          : undefined,
        position: stickFooter ? 'sticky' : undefined,
        zIndex: stickFooter ? 1 : undefined,
        ...(tableFooterProps?.sx instanceof Function
          ? tableFooterProps?.sx(theme)
          : (tableFooterProps?.sx as any)),
      })}
    >
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          table={table}
          virtualColumns={virtualColumns}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </Box>
  );
};
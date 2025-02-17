import clsx from 'clsx';
import {
  ActionIcon,
  Box,
  Group,
  Pagination,
  Select,
  Text,
} from '@mantine/core';

import { type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

import classes from './MRT_TablePagination.module.css';

const defaultRowsPerPage = [5, 10, 15, 20, 25, 30, 50, 100].map((x) =>
  x.toString(),
);

interface Props<TData extends Record<string, any> = {}> {
  position?: 'top' | 'bottom';
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePagination = <TData extends Record<string, any> = {}>({
  table,
  position = 'bottom',
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    setPageIndex,
    setPageSize,
    options: {
      enableToolbarInternalActions,
      icons: {
        IconChevronLeftPipe,
        IconChevronRightPipe,
        IconChevronLeft,
        IconChevronRight,
      },
      localization,
      mantinePaginationProps,
      paginationDisplayMode,
      rowCount,
    },
  } = table;
  const {
    pagination: { pageSize = 10, pageIndex = 0 },
    showGlobalFilter,
  } = getState();

  const paginationProps = parseFromValuesOrFunc(mantinePaginationProps, {
    table,
  });

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const numberOfPages = Math.ceil(totalRowCount / pageSize);
  const showFirstLastPageButtons = numberOfPages > 2;
  const firstRowIndex = pageIndex * pageSize;
  const lastRowIndex = Math.min(pageIndex * pageSize + pageSize, totalRowCount);

  const {
    rowsPerPageOptions = defaultRowsPerPage,
    showRowsPerPage = true,
    withEdges = showFirstLastPageButtons,
    ...rest
  } = paginationProps ?? {};

  const needsTopMargin =
    position === 'top' && enableToolbarInternalActions && !showGlobalFilter;

  return (
    <Box
      className={clsx(
        'mrt-table-pagination',
        classes.root,
        needsTopMargin && classes['with-top-margin'],
      )}
    >
      {paginationProps?.showRowsPerPage !== false && (
        <Group gap="xs">
          <Text id="rpp-label">{localization.rowsPerPage}</Text>
          <Select
            aria-labelledby="rpp-label"
            className={classes.pagesize}
            data={paginationProps?.rowsPerPageOptions ?? defaultRowsPerPage}
            onChange={(value: string | null) => setPageSize(+(value as string))}
            value={pageSize.toString()}
            allowDeselect={false}
          />
        </Group>
      )}
      {paginationDisplayMode === 'pages' ? (
        <Pagination
          onChange={(newPageIndex) => setPageIndex(newPageIndex - 1)}
          total={numberOfPages}
          value={pageIndex + 1}
          withEdges={withEdges}
          nextIcon={IconChevronRight}
          previousIcon={IconChevronLeft}
          firstIcon={IconChevronLeftPipe}
          lastIcon={IconChevronRightPipe}
          {...rest}
        />
      ) : paginationDisplayMode === 'default' ? (
        <>
          <Text>{`${
            lastRowIndex === 0 ? 0 : (firstRowIndex + 1).toLocaleString()
          }-${lastRowIndex.toLocaleString()} ${
            localization.of
          } ${totalRowCount.toLocaleString()}`}</Text>
          <Group gap={6}>
            {withEdges && (
              <ActionIcon
                aria-label={localization.goToFirstPage}
                disabled={pageIndex <= 0}
                onClick={() => setPageIndex(0)}
                variant="subtle"
                color="gray"
              >
                <IconChevronLeftPipe />
              </ActionIcon>
            )}
            <ActionIcon
              aria-label={localization.goToPreviousPage}
              disabled={pageIndex <= 0}
              onClick={() => setPageIndex(pageIndex - 1)}
              variant="subtle"
              color="gray"
            >
              <IconChevronLeft />
            </ActionIcon>
            <ActionIcon
              aria-label={localization.goToNextPage}
              disabled={lastRowIndex >= totalRowCount}
              onClick={() => setPageIndex(pageIndex + 1)}
              variant="subtle"
              color="gray"
            >
              <IconChevronRight />
            </ActionIcon>
            {withEdges && (
              <ActionIcon
                aria-label={localization.goToLastPage}
                disabled={lastRowIndex >= totalRowCount}
                onClick={() => setPageIndex(numberOfPages - 1)}
                variant="subtle"
                color="gray"
              >
                <IconChevronRightPipe />
              </ActionIcon>
            )}
          </Group>
        </>
      ) : null}
    </Box>
  );
};

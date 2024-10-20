'use client'

import { trpc } from '@/app/_trpc/client'
import { Config } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'
import ViewEditDialog from '../ViewEditDialog'
import { GenericTableRowActions } from './generic/GenericTableRowActions'

interface ConfigWithStrings extends Omit<Config, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseConfigDates = (data: ConfigWithStrings[]): Config[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const configColumns: ColumnDef<Config>[] = [
  {
		id: "actions",
		cell: ({ row }) => <GenericTableRowActions id={row.getValue("id")} />,
	},
  {
    accessorKey: 'id',
    header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <GenericColumnHeader column={column} title="Location" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'key',
    header: ({ column }) => <GenericColumnHeader column={column} title="Key" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'value',
    header: ({ column }) => <GenericColumnHeader column={column} title="Value" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: ({ column }) => <GenericColumnHeader column={column} title="Created At" />,
  // },
  // {
  //   accessorKey: 'updatedAt',
  //   header: ({ column }) => <GenericColumnHeader column={column} title="Updated At" />,
  // },
];

const ConfigTable = () => {
  const { data, isLoading, error, status } = trpc.getConfig.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseConfigDates(data!);

  return <GenericTable title="Config" columns={configColumns} data={parsedData} />;
};

export default ConfigTable;

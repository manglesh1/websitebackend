'use client'

import { trpc } from '@/app/_trpc/client'
import { BirthdayPackages } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'
import ViewEditDialog from '../ViewEditDialog'
import { GenericTableRowActions } from './generic/GenericTableRowActions'

interface BirthdayPackagesWithStrings extends Omit<BirthdayPackages, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseBirthdayPackagesDates = (data: BirthdayPackagesWithStrings[]): BirthdayPackages[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const birthdayPackagesColumns: ColumnDef<BirthdayPackages>[] = [
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
    accessorKey: 'plantitle',
    header: ({ column }) => <GenericColumnHeader column={column} title="Plan Title" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <GenericColumnHeader column={column} title="Category" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <GenericColumnHeader column={column} title="Price" />,
  },
  {
    accessorKey: 'period',
    header: ({ column }) => <GenericColumnHeader column={column} title="Period" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'includes',
    header: ({ column }) => <GenericColumnHeader column={column} title="Includes" />,
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

const BirthdayPackagesTable = () => {
  const { data, isLoading, error, status } = trpc.getBirthdayPackages.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseBirthdayPackagesDates(data!);

  return <GenericTable title="Birthday Packages" columns={birthdayPackagesColumns} data={parsedData} />;
};

export default BirthdayPackagesTable;

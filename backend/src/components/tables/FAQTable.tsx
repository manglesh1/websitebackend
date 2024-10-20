'use client'

import { trpc } from '@/app/_trpc/client'
import { FAQ } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'
import ViewEditDialog from '../ViewEditDialog'
import { GenericTableRowActions } from './generic/GenericTableRowActions'

interface FAQWithStrings extends Omit<FAQ, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseFAQDates = (data: FAQWithStrings[]): FAQ[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const faqColumns: ColumnDef<FAQ>[] = [
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
    accessorKey: 'question',
    header: ({ column }) => <GenericColumnHeader column={column} title="Question" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'answer',
    header: ({ column }) => <GenericColumnHeader column={column} title="Answer" />,
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

const FAQTable = () => {
  const { data, isLoading, error, status } = trpc.getFAQ.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseFAQDates(data!);

  return <GenericTable title="FAQ" columns={faqColumns} data={parsedData} />;
};

export default FAQTable;

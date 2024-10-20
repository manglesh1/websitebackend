'use client'

import { trpc } from '@/app/_trpc/client'
import { BlogReviews } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'
import ViewEditDialog from '../ViewEditDialog'
import { GenericTableRowActions } from './generic/GenericTableRowActions'

interface BlogReviewsWithStrings extends Omit<BlogReviews, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseBlogReviewsDates = (data: BlogReviewsWithStrings[]): BlogReviews[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const blogReviewsColumns: ColumnDef<BlogReviews>[] = [
  {
		id: "actions",
		cell: ({ row }) => <GenericTableRowActions id={row.getValue("id")} />,
	},
  {
    accessorKey: 'id',
    header: ({ column }) => <GenericColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => <GenericColumnHeader column={column} title="Comment" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'user',
    header: ({ column }) => <GenericColumnHeader column={column} title="User" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <GenericColumnHeader column={column} title="Created At" />,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <GenericColumnHeader column={column} title="Updated At" />,
  },
];

const BlogReviewsTable = () => {
  const { data, isLoading, error, status } = trpc.getBlogReviews.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseBlogReviewsDates(data!);

  return <GenericTable title="Blog Reviews" columns={blogReviewsColumns} data={parsedData} />;
};

export default BlogReviewsTable;

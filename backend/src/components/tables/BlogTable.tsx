'use client'

import { trpc } from '@/app/_trpc/client'
import { Blog } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'
import ViewEditDialog from '../ViewEditDialog'
import { GenericTableRowActions } from './generic/GenericTableRowActions'

interface BlogWithStrings extends Omit<Blog, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseBlogDates = (data: BlogWithStrings[]): Blog[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const blogColumns: ColumnDef<Blog>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => <GenericColumnHeader column={column} title="Title" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <GenericColumnHeader column={column} title="Category" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => <GenericColumnHeader column={column} title="Tags" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'shortdesc',
    header: ({ column }) => <GenericColumnHeader column={column} title="Short Description" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'format',
    header: ({ column }) => <GenericColumnHeader column={column} title="Format" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'image',
    header: ({ column }) => <GenericColumnHeader column={column} title="Image" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'video',
    header: ({ column }) => <GenericColumnHeader column={column} title="Video" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'postdate',
    header: ({ column }) => <GenericColumnHeader column={column} title="Post Date" />,
    //cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'views',
    header: ({ column }) => <GenericColumnHeader column={column} title="Views" />,
    //cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'author',
    header: ({ column }) => <GenericColumnHeader column={column} title="Author" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'htmldesc',
    header: ({ column }) => <GenericColumnHeader column={column} title="HTML Description" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  // {
  //   accessorKey: 'createdAt',
  //   header: ({ column }) => <GenericColumnHeader column={column} title="Created At" />,
  //   //cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  // },
  // {
  //   accessorKey: 'updatedAt',
  //   header: ({ column }) => <GenericColumnHeader column={column} title="Updated At" />,
  //   //cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  // },
];

const BlogTable = () => {
  const { data, isLoading, error, status } = trpc.getBlog.useQuery();

  if (status === 'error') {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <div>Loading...</div>;

  if (!data && !isLoading) return <div>No Data Found</div>;

  const parsedData = parseBlogDates(data!);

  return <GenericTable title="Blog" columns={blogColumns} data={parsedData} />;
};

export default BlogTable;

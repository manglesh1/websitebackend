'use client'

import { trpc } from '@/app/_trpc/client'
import { Data } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { GenericTable } from './generic/GenericTable'
import { GenericColumnHeader } from './generic/GenericTableHeader'
import { GenericTableRowActions } from './generic/GenericTableRowActions'
import ViewEditDialog from '../ViewEditDialog'
import { Skeleton } from '../ui/skeleton'
interface DataWithStrings extends Omit<Data, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

const parseDates = (data: DataWithStrings[]): Data[] => {
  return data.map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt),
  }));
};

export const columns: ColumnDef<Data>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
	// 	<Checkbox
	// 		checked={
	// 			table.getIsAllPageRowsSelected() ||
	// 			(table.getIsSomePageRowsSelected() && "indeterminate")
	// 		}
	// 		onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
	// 		aria-label="Select all"
	// 		className="translate-y-[2px]"
	// 	/>
	// 	),
	// 	cell: ({ row }) => (
	// 	<Checkbox
	// 		checked={row.getIsSelected()}
	// 		onCheckedChange={(value) => row.toggleSelected(!!value)}
	// 		aria-label="Select row"
	// 		className="translate-y-[2px]"
	// 	/>
	// 	),
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
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
    accessorKey: 'pageid',
    header: ({ column }) => <GenericColumnHeader column={column} title="Page ID" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'isactive',
    header: ({ column }) => <GenericColumnHeader column={column} title="Is Active" />,
    //cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'desc',
    header: ({ column }) => <GenericColumnHeader column={column} title="Description" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'parentid',
    header: ({ column }) => <GenericColumnHeader column={column} title="Parent ID" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'path',
    header: ({ column }) => <GenericColumnHeader column={column} title="Path" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'pagetype',
    header: ({ column }) => <GenericColumnHeader column={column} title="Page Type" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <GenericColumnHeader column={column} title="Title" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'metatitle',
    header: ({ column }) => <GenericColumnHeader column={column} title="Meta Title" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'metadescription',
    header: ({ column }) => <GenericColumnHeader column={column} title="Meta Description" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'seosection',
    header: ({ column }) => <GenericColumnHeader column={column} title="SEO Section" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'icon',
    header: ({ column }) => <GenericColumnHeader column={column} title="Icon" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'booknowurl',
    header: ({ column }) => <GenericColumnHeader column={column} title="Book Now URL" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'video',
    header: ({ column }) => <GenericColumnHeader column={column} title="Video" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'smallimage',
    header: ({ column }) => <GenericColumnHeader column={column} title="Small Image" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'smalltext',
    header: ({ column }) => <GenericColumnHeader column={column} title="Small Text" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'headerimage',
    header: ({ column }) => <GenericColumnHeader column={column} title="Header Image" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'imageTitle',
    header: ({ column }) => <GenericColumnHeader column={column} title="Image Title" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'section1',
    header: ({ column }) => <GenericColumnHeader column={column} title="Section 1" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'sectionImage',
    header: ({ column }) => <GenericColumnHeader column={column} title="Section Image" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'section2',
    header: ({ column }) => <GenericColumnHeader column={column} title="Section 2" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'section2Image',
    header: ({ column }) => <GenericColumnHeader column={column} title="Section 2 Image" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'Seoheader',
    header: ({ column }) => <GenericColumnHeader column={column} title="SEO Header" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'ruleyes',
    header: ({ column }) => <GenericColumnHeader column={column} title="Rule Yes" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'ruleno',
    header: ({ column }) => <GenericColumnHeader column={column} title="Rule No" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'warnings',
    header: ({ column }) => <GenericColumnHeader column={column} title="Warnings" />,
    cell: ({ cell }) => <ViewEditDialog value={cell.getValue() as string} />
  },
  {
    accessorKey: 'booknowlink',
    header: ({ column }) => <GenericColumnHeader column={column} title="Book Now Link" />,
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
  
const DataTable = () => {
    const { data, isLoading, status } = trpc.getData.useQuery();
    if(status==='error'){
        <div>
            Server Error! Please refresh the page!
        </div>
    } 
    if(isLoading) return (
        <Skeleton />
    )
    if(!data && !isLoading) return(
        <div>
            No Data Found;
        </div>
    )
    const parsedData = parseDates(data!);
    return (
        <GenericTable title="Data" columns={columns} data={parsedData} />
    )
}

export default DataTable

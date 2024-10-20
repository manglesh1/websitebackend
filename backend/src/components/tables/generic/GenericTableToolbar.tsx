"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "../../ui/input"
import { GenericTableViewOptions } from "./GenericTableViewOptions"
import GenericCreateButton from "./GenericCreateButton"

interface GenericTableToolbarProps<TData> {
  form: string
  table: Table<TData>
  title: string
}

export function GenericTableToolbar<TData>({
  form,
  table,
  title,
}: GenericTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between my-6">
      
      <div className="flex items-center space-x-2" >
        <GenericTableViewOptions table={table} />
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter}
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          className="h-10 w-[180px] lg:w-[300px] pr-10 shadow-md border rounded-md"
        />
      </div>
    
      <div className="font-semibold text-lg text-gray-700">{title}</div>

      <GenericCreateButton form={form} />
    </div>
  )
}
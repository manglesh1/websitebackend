"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "../../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu"
import GenericEditButton from "./GenericEditButton";
import GenericDeleteButton from "./GenericDeleteButton";


export function GenericTableRowActions({id}:{id:number}) {

  const getLastPartOfUrl = (): string => {
    const path = window.location.pathname; // Get the full path of the URL
    const parts = path.split('/'); // Split the path by '/'
    return parts[parts.length - 1] || parts[parts.length - 2] || "data"; // Return the last part, or second last if last is empty
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <GenericEditButton id={id} form={getLastPartOfUrl()} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <GenericDeleteButton id={id} form={getLastPartOfUrl()} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
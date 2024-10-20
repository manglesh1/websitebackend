import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ScrollArea } from './ui/scroll-area'

interface ViewEditDialogProps {
    value: string
}

const ViewEditDialog = ({value}:ViewEditDialogProps) => {
    if(!value) return null
    return (
        <Dialog>
            <DialogTrigger>{value.length>15 ? (value.substring(0,15).replace(/(\r\n|\n|\r)/g, ' ') + " ..."):(value)}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>value</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <ScrollArea className=' h-[50vh]'>
                        {/* Use dangerouslySetInnerHTML to render HTML content */}
                        <div dangerouslySetInnerHTML={{ __html: value }} />
                    </ScrollArea>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ViewEditDialog

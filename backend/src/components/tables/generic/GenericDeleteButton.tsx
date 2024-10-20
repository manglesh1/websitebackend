"use client"

import { trpc } from '@/app/_trpc/client'
import { Button } from '@/components/ui/button' 
// import React, { useState } from 'react'
import { toast } from 'sonner'

interface GenericDeleteButtonProps {
    id: number
    form: string
}

const GenericDeleteButton = ({ id, form }: GenericDeleteButtonProps) => {
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const [deletedItem, setDeletedItem] = useState<any | null>(null);

    const utils = trpc.useUtils()

    // const { mutate:createItem  } = trpc.createData.useMutation({
    //     onSuccess: () => {
    //         utils.invalidate()
    //         toast("Item Retored!", {
    //             description: "The Item has been successfully restored!"
    //         })
    //         setDeletedItem(null)
    //     },
    //     onError: (err) => {
    //         utils.invalidate()
    //         toast("Item Failed To Retore!", {
    //             description: err.message
    //         })
    //         setDeletedItem(null)
    //     }
    // })

    const { mutate:deleteData } = trpc.deleteData.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })
    const { mutate:deleteBlog } = trpc.deleteBlog.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })
    const { mutate:deleteBlogReviews } = trpc.deleteBlogReview.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })
    const { mutate:deleteConfig } = trpc.deleteConfig.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })
    const { mutate:deleteLocation } = trpc.deleteLocations.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })
    const { mutate:deletePromo } = trpc.deletePromo.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })
    const { mutate:deleteBirthdayPackage } = trpc.deleteBirthdayPackages.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })
    const { mutate:deleteFAQ } = trpc.deleteFAQ.useMutation({
        onSuccess: (data) => onSuccess(data),
        onError: () => onError()
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSuccess = (data:any)  => {
        if (data) {
            // setDeletedItem(data)
            utils.invalidate()
            toast("Item Deleted!", {
                description: "Item has been successfully deleted!",
                // action: {
                //   label: "Undo",
                //   onClick: () => createItem(deletedItem)
                // },
            })
        } else {
            toast("Failed to delete item!", {
                description: "Try again, task failed due to server problems!",
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
            })
        }
    }

    const onError = () => {
        toast("Failed to Delete Item!", {
            description: "Operation failed due to server error",
        })
    }

    const onClick = (event?: React.BaseSyntheticEvent) => {
        event?.preventDefault()
        switch(form){
            case "data": {
                deleteData({id});
                break;
            }
            case "blog": {
                deleteBlog({id});
                break;
            }
            case "blog_reviews": {
                deleteBlogReviews({id});
                break;
            }
            case "locations": {
                deleteLocation({id});
                break;
            }
            case "config": {
                deleteConfig({id});
                break;
            }
            case "promo": {
                deletePromo({id});
                break;
            }
            case "birthday_packages": {
                deleteBirthdayPackage({id});
                break;
            }
            case "faq": {
                deleteFAQ({id});
                break;
            }
        }
        
    }

    return (
        <Button className='w-full' onClick={onClick} variant="ghost">Delete</Button>
    )
}

export default GenericDeleteButton

"use client"

import DataForm from '@/components/form/DataForm'
import BlogForm from '@/components/form/BlogForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import BlogReviewsForm from '@/components/form/BlogReviewsForm'
import BirthdayPackagesForm from '@/components/form/BirthdayPackagesForm'
import ConfigForm from '@/components/form/ConfigForm'
import FAQForm from '@/components/form/FAQForm'
import LocationsForm from '@/components/form/LocationsForm'
import PromoForm from '@/components/form/PromoForm'

interface GenericEditButtonProps {
    form: string
    id: number
}

const GenericEditButton = ({ form, id }: GenericEditButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Dialog open={isOpen} onOpenChange={(v) => { if (!v) setIsOpen(v) }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button variant="ghost" className=' w-full'>Edit</Button>
            </DialogTrigger>

            <DialogContent className='z-50 sm:w-full md:w-[1000px] w-[1000px]'>
                {form === "data" && <DataForm onClose={()=>setIsOpen(false)} id={id} />}
                {form === "blog" && <BlogForm onClose={()=>setIsOpen(false)} id={id} />}
                {form === "blog_reviews" && <BlogReviewsForm onClose={()=>setIsOpen(false)} id={id} />}
                {form === "birthday_packages" && <BirthdayPackagesForm onClose={()=>setIsOpen(false)} id={id} />}
                {form === "config" && <ConfigForm onClose={()=>setIsOpen(false)} id={id} />}
                {form === "faq" && <FAQForm onClose={()=>setIsOpen(false)} id={id} />}
                {form === "locations" && <LocationsForm onClose={()=>setIsOpen(false)} id={id} />}
                {form === "promo" && <PromoForm onClose={()=>setIsOpen(false)} id={id} />}
            </DialogContent>
        </Dialog>
    )
}

export default GenericEditButton

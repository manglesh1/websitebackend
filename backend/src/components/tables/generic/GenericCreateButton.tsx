"use client"

import DataForm from '@/components/form/DataForm'
import BlogForm from '@/components/form/BlogForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'
import BlogReviewsForm from '@/components/form/BlogReviewsForm'
import BirthdayPackagesForm from '@/components/form/BirthdayPackagesForm'
import ConfigForm from '@/components/form/ConfigForm'
import FAQForm from '@/components/form/FAQForm'
import LocationsForm from '@/components/form/LocationsForm'
import PromoForm from '@/components/form/PromoForm'

interface GenericCreateButtonProps {
    form: string
}

const GenericCreateButton = ({ form }: GenericCreateButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    form = form.toLowerCase()
    return (
        <Dialog open={isOpen} onOpenChange={(v) => { if (!v) setIsOpen(v) }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button className=''>Create</Button>
            </DialogTrigger>

            <DialogContent className='z-50'>
                <DialogTitle className='hidden'>Form</DialogTitle>
                {form === "data" && <DataForm onClose={()=>setIsOpen(false)} />}
                {form === "blog" && <BlogForm onClose={()=>setIsOpen(false)} />}
                {form === "blog_reviews" && <BlogReviewsForm onClose={()=>setIsOpen(false)} />}
                {form === "birthday_packages" && <BirthdayPackagesForm onClose={()=>setIsOpen(false)} />}
                {form === "config" && <ConfigForm onClose={()=>setIsOpen(false)} />}
                {form === "faq" && <FAQForm onClose={()=>setIsOpen(false)} />}
                {form === "locations" && <LocationsForm onClose={()=>setIsOpen(false)} />}
                {form === "promo" && <PromoForm onClose={()=>setIsOpen(false)} />}
            </DialogContent>
        </Dialog>
    )
}

export default GenericCreateButton

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { DataSchema } from "@/lib/schema";
import { Data } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const DataForm = ({ id, onClose }: { id?: number, onClose: ()=>void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<Data | null>(null);

    const {data, isLoading, isError} = trpc.getDataById.useQuery({id})

    const utils = trpc.useUtils()

    const form = useForm<z.infer<typeof DataSchema>>({
        resolver: zodResolver(DataSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            pageid: existingData?.pageid ?? "",
            isactive: existingData?.isactive ?? null,
            desc: existingData?.desc ?? "",
            parentid: existingData?.parentid ?? "",
            path: existingData?.path ?? "",
            pagetype: existingData?.pagetype ?? "",
            title: existingData?.title ?? "",
            metatitle: existingData?.metatitle ?? "",
            metadescription: existingData?.metadescription ?? "",
            seosection: existingData?.seosection ?? "",
            icon: existingData?.icon ?? "",
            booknowurl: existingData?.booknowurl ?? "",
            video: existingData?.video ?? "",
            smallimage: existingData?.smallimage ?? "",
            smalltext: existingData?.smalltext ?? "",
            headerimage: existingData?.headerimage ?? "",
            imageTitle: existingData?.imageTitle ?? "",
            section1: existingData?.section1 ?? "",
            sectionImage: existingData?.sectionImage ?? "",
            section2: existingData?.section2 ?? "",
            section2Image: existingData?.section2Image ?? "",
            Seoheader: existingData?.Seoheader ?? "",
            ruleyes: existingData?.ruleyes ?? "",
            ruleno: existingData?.ruleno ?? "",
            warnings: existingData?.warnings ?? "",
            booknowlink: existingData?.booknowlink ?? "",
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {createdAt, updatedAt, ...restOfTheData} = data;
            setExistingData({...restOfTheData, createdAt:new Date(), updatedAt:new Date()}); 
            form.reset(restOfTheData)
        } else if (isError) {
            setError("Failed to fetch data.");
        }
    }, [data, form, isError]);

    const { mutate: createData, isPending:creationPending } = trpc.createData.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Data successfully created");
                utils.invalidate()
                onClose()
                toast("Data successfully Created!")
            } else {
                setError("Data Creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updateData, isPending:updatePending } = trpc.updateData.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Data successfully updated");
                utils.invalidate()
                toast("Data successfully updated")
            } else {
                setError("Data Update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Data Update failed");
            console.log(error.message);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof DataSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if(id) updateData(values) 
        else createData(values);
    };

    if(isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="space-y-4 h-[70vh]">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Title</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Title" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="metatitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Meta Title</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Meta Title" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="metadescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Meta Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Meta Description" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="seosection"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">SEO Section</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="SEO Section" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Location</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Location" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pageid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Page ID</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Page ID" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="path"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Path</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Path" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Icon</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Icon" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="booknowurl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Book Now URL</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Book Now URL" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isactive"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Is Active</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        type="number"
                                        placeholder="1 for active, 0 for inactive"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Description" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parentid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Parent ID</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Parent ID" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pagetype"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Page Type</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Page Type" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="video"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Video URL</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Video URL" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="smallimage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Small Image</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Small Image" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="smalltext"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Small Text</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Small Text" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="headerimage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Header Image</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Header Image" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Image Title</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Image Title" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="section1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Section 1</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Section 1" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sectionImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Section Image</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Section Image" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="section2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Section 2</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Section 2" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="section2Image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Section 2 Image</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Section 2 Image" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Seoheader"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">SEO Header</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="SEO Header" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ruleyes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Rule Yes</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Rule Yes" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ruleno"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Rule No</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Rule No" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="warnings"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Warnings</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Warnings" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="booknowlink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Book Now Link</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Book Now Link" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </ScrollArea>

                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={creationPending || updatePending} type="submit">
                    {existingData ? "Update" : "Create"}
                </Button>
            </form>
        </Form>
    );
};

export default DataForm;

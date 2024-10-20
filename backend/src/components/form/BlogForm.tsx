"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { BlogSchema } from "@/lib/schema"; // Define schema for the Blog model in lib/schema
import { Blog } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const BlogForm = ({ id, onClose }: { id?: number, onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<Blog | null>(null);

    const { data, isLoading, isError } = trpc.getBlogById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof BlogSchema>>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            title: existingData?.title ?? "",
            category: existingData?.category ?? "",
            tags: existingData?.tags ?? "",
            shortdesc: existingData?.shortdesc ?? "",
            format: existingData?.format ?? "",
            image: existingData?.image ?? "",
            video: existingData?.video ?? "",
            postdate: existingData?.postdate ?? "",
            views: existingData?.views ?? null,
            author: existingData?.author ?? "",
            htmldesc: existingData?.htmldesc ?? "",
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, ...restOfTheData } = data;
            setExistingData({ ...restOfTheData, createdAt: new Date(), updatedAt: new Date()});
            form.reset(restOfTheData);
        } else if (isError) {
            setError("Failed to fetch blog data.");
        }
    }, [data, form, isError]);

    const { mutate: createBlog, isPending: creationPending } = trpc.createBlog.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Blog successfully created");
                utils.invalidate();
                onClose();
                toast("Blog successfully created!");
            } else {
                setError("Blog creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Blog creation failed");
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updateBlog, isPending: updatePending } = trpc.updateBlog.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Blog successfully updated");
                utils.invalidate();
                toast("Blog successfully updated!");
            } else {
                setError("Blog update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof BlogSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if (id) updateBlog(values);
        else createBlog(values);
    };

    if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="space-y-4 h-[70vh]">
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
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Category</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Category" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Tags</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Tags" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="shortdesc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Short Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Short Description" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="format"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Format</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Format" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Image URL</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Image URL" disabled={creationPending || updatePending} />
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
                        name="postdate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Post Date</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Post Date" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="views"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Views</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} type="number" placeholder="Views" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Author</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Author" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="htmldesc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">HTML Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="HTML Description" disabled={creationPending || updatePending} />
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

export default BlogForm;

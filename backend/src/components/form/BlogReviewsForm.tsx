"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { BlogReviewsSchema } from "@/lib/schema"; // Define schema for BlogReviews in lib/schema
import { BlogReviews } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const BlogReviewsForm = ({ id, onClose }: { id?: number, onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<BlogReviews | null>(null);

    const { data, isLoading, isError } = trpc.getBlogReviewsById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof BlogReviewsSchema>>({
        resolver: zodResolver(BlogReviewsSchema),
        defaultValues: {
            comment: existingData?.comment ?? "",
            user: existingData?.user ?? "",
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, ...restOfTheData } = data;
            setExistingData({ ...restOfTheData, createdAt: new Date(), updatedAt: new Date() });
            form.reset(restOfTheData);
        } else if (isError) {
            setError("Failed to fetch blog review data.");
        }
    }, [data, form, isError]);

    const { mutate: createBlogReview, isPending: creationPending } = trpc.createBlogReview.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Blog review successfully created");
                utils.invalidate();
                onClose();
                toast("Blog review successfully created!");
            } else {
                setError("Blog review creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updateBlogReview, isPending: updatePending } = trpc.updateBlogReview.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Blog review successfully updated");
                utils.invalidate();
                toast("Blog review successfully updated!");
            } else {
                setError("Blog review update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Blog review update failed");
            console.log(error.message);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof BlogReviewsSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if (id) updateBlogReview(values);
        else createBlogReview(values);
    };

    if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="space-y-4 h-[70vh]">
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Comment</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Enter the review comment" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">User</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="User name" disabled={creationPending || updatePending} />
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

export default BlogReviewsForm;

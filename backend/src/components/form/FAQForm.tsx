"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { FAQSchema } from "@/lib/schema"; // Define schema for FAQ in lib/schema
import { FAQ } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const FAQForm = ({ id, onClose }: { id?: number; onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<FAQ | null>(null);

    const { data, isLoading, isError } = trpc.getFAQById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof FAQSchema>>({
        resolver: zodResolver(FAQSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            question: existingData?.question ?? "",
            answer: existingData?.answer ?? "",
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, ...restOfTheData } = data;
            setExistingData({ ...restOfTheData, createdAt: new Date(), updatedAt: new Date() });
            form.reset(restOfTheData);
        } else if (isError) {
            setError("Failed to fetch FAQ data.");
        }
    }, [data, form, isError]);

    const { mutate: createFAQ, isPending: creationPending } = trpc.createFAQ.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("FAQ successfully created");
                utils.invalidate();
                onClose();
                toast("FAQ successfully created!");
            } else {
                setError("FAQ creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("FAQ creation failed");
            console.log(error)
            form.reset();
        },
    });

    const { mutate: updateFAQ, isPending: updatePending } = trpc.updateFAQ.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("FAQ successfully updated");
                utils.invalidate();
                toast("FAQ successfully updated!");
            } else {
                setError("FAQ update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof FAQSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if (id) updateFAQ(values);
        else createFAQ(values);
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
                        name="question"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Question</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Question" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="answer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Answer</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Answer" disabled={creationPending || updatePending} />
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

export default FAQForm;

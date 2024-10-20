"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { BirthdayPackagesSchema } from "@/lib/schema"; // Define schema for BirthdayPackages in lib/schema
import { BirthdayPackages } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const BirthdayPackagesForm = ({ id, onClose }: { id?: number; onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<BirthdayPackages | null>(null);

    const { data, isLoading, isError } = trpc.getBirthdayPackageById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof BirthdayPackagesSchema>>({
        resolver: zodResolver(BirthdayPackagesSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            plantitle: existingData?.plantitle ?? "",
            category: existingData?.category ?? "",
            price: existingData?.price ?? null,
            period: existingData?.period ?? "",
            includes: existingData?.includes ?? "",
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, ...restOfTheData } = data;
            setExistingData({ ...restOfTheData, createdAt: new Date(), updatedAt: new Date() });
            form.reset({ ...restOfTheData });
        } else if (isError) {
            setError("Failed to fetch data.");
        }
    }, [data, form, isError]);

    const { mutate: createPackage, isPending: creationPending } = trpc.createBirthdayPackages.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Birthday Package successfully created");
                utils.invalidate();
                onClose();
                toast("Birthday Package successfully created!");
            } else {
                setError("Birthday Package creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updatePackage, isPending: updatePending } = trpc.updateBirthdayPackages.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Birthday Package successfully updated");
                utils.invalidate();
                toast("Birthday Package successfully updated");
            } else {
                setError("Birthday Package update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Birthday Package update failed");
            console.log(error.message);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof BirthdayPackagesSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if (id) updatePackage(values);
        else createPackage(values);
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
                        name="plantitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Plan Title</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Plan Title" disabled={creationPending || updatePending} />
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
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Price</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} value={field.value ?? ""} placeholder="Price" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="period"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Period</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Period" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="includes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Includes</FormLabel>
                                <FormControl>
                                    <Textarea {...field} value={field.value ?? ""} placeholder="Includes" disabled={creationPending || updatePending} />
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

export default BirthdayPackagesForm;

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { PromoSchema } from "@/lib/schema"; 
import { Promo } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const PromoForm = ({ id, onClose }: { id?: number; onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<Promo | null>(null);

    const { data, isLoading, isError } = trpc.getPromoById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof PromoSchema>>({
        resolver: zodResolver(PromoSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            promo: existingData?.promo ?? "",
            img: existingData?.img ?? "",
            description: existingData?.description ?? "",
            startdate: new Date(existingData?.startdate ?? new Date()).toISOString().split('T')[0],
            enddate: new Date(existingData?.enddate ?? new Date()).toISOString().split('T')[0],
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, startdate, enddate, ...restOfTheData } = data;
            setExistingData({
                ...restOfTheData,
                startdate: new Date(startdate),
                enddate: new Date(enddate),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            form.reset({
                ...restOfTheData,
                startdate: new Date(startdate ?? new Date()).toISOString().split('T')[0],
                enddate: new Date(enddate ?? new Date()).toISOString().split('T')[0],
            });
        } else if (isError) {
            setError("Failed to fetch data.");
        }
    }, [data, form, isError]);

    const { mutate: createPromo, isPending: creationPending } = trpc.createPromo.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Promo successfully created");
                utils.invalidate();
                onClose();
                toast("Promo successfully created!");
            } else {
                setError("Promo creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Promo creation failed");
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updatePromo, isPending: updatePending } = trpc.updatePromo.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Promo successfully updated");
                utils.invalidate();
                toast("Promo successfully updated");
            } else {
                setError("Promo update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Promo update failed");
            console.log(error.message);
            form.reset();
        },
    });

    // Ensure the values are Date objects before submission
    const onSubmit = (values: z.infer<typeof PromoSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        values.startdate = new Date(
            new Date(values?.startdate ?? new Date()).getTime() - new Date().getTimezoneOffset() * 60000
        ).toISOString();
        values.enddate = new Date(
            new Date(values?.enddate ?? new Date()).getTime() - new Date().getTimezoneOffset() * 60000
        ).toISOString();
        if (id) {
            updatePromo({ ...values });
        } else {
            createPromo({ ...values });
        }
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
                        name="promo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Promo</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Promo" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="img"
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
                        name="description"
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
                        name="startdate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Start Date</FormLabel>
                                <Input {...field} type="date" placeholder="Start date" disabled={creationPending || updatePending} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="enddate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date</FormLabel>
                                <Input {...field} type="date" placeholder="End date" disabled={creationPending || updatePending} />
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

export default PromoForm;

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import * as z from "zod";
import { ConfigSchema } from "@/lib/schema"; // Define schema for Config in lib/schema
import { Config } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const ConfigForm = ({ id, onClose }: { id?: number; onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<Config | null>(null);

    const { data, isLoading, isError } = trpc.getConfigById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof ConfigSchema>>({
        resolver: zodResolver(ConfigSchema),
        defaultValues: {
            location: existingData?.location ?? "",
            key: existingData?.key ?? "",
            value: existingData?.value ?? "",
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, ...restOfTheData } = data;
            setExistingData({ ...restOfTheData, createdAt: new Date(), updatedAt: new Date() });
            form.reset(restOfTheData);
        } else if (isError) {
            setError("Failed to fetch data.");
        }
    }, [data, form, isError]);

    const { mutate: createConfig, isPending: creationPending } = trpc.createConfig.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Config successfully created");
                utils.invalidate();
                onClose();
                toast("Config successfully Created!");
            } else {
                setError("Config Creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Config Creation failed");
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updateConfig, isPending: updatePending } = trpc.updateConfig.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Config successfully updated");
                utils.invalidate();
                toast("Config successfully updated");
            } else {
                setError("Config Update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof ConfigSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if (id) updateConfig(values);
        else createConfig(values);
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
                        name="key"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Key</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Key" disabled={creationPending || updatePending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Value</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value ?? ""} placeholder="Value" disabled={creationPending || updatePending} />
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

export default ConfigForm;

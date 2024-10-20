"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import * as z from "zod";
import { LocationsSchema } from "@/lib/schema"; // Define schema for Locations in lib/schema
import { Locations } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";
import { FormError, FormSuccess } from "./info";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

const LocationsForm = ({ id, onClose }: { id?: number; onClose: () => void }) => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [existingData, setExistingData] = useState<Locations | null>(null);

    const { data, isLoading, isError } = trpc.getLocationById.useQuery({ id });

    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof LocationsSchema>>({
        resolver: zodResolver(LocationsSchema),
        defaultValues: {
            locations: existingData?.locations ?? "",
            address: existingData?.address ?? "",
            phone: existingData?.phone ?? "",
            map: existingData?.map ?? "",
            locationid: existingData?.locationid ?? "",
            hours: existingData?.hours ?? "",
            email: existingData?.email ?? "",
            desc: existingData?.desc ?? "",
            smallimage: existingData?.smallimage ?? "",
            tag: existingData?.tag ?? "",
            rollerurl: existingData?.rollerurl ?? "",
            facebook: existingData?.facebook ?? "",
            insta: existingData?.insta ?? "",
            twitter: existingData?.twitter ?? "",
            tiktok: existingData?.tiktok ?? "",
        },
    });

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { createdAt, updatedAt, ...restOfTheData } = data;
            setExistingData({ ...restOfTheData, createdAt: new Date(), updatedAt: new Date() });
            form.reset(restOfTheData);
        } else if (isError) {
            setError("Failed to fetch locations data.");
        }
    }, [data, form, isError]);

    const { mutate: createLocation, isPending: creationPending } = trpc.createLocations.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Location successfully created");
                utils.invalidate();
                onClose();
                toast("Location successfully created!");
            } else {
                setError("Location creation failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError("Location creation failed");
            console.log(error.message);
            form.reset();
        },
    });

    const { mutate: updateLocation, isPending: updatePending } = trpc.updateLocations.useMutation({
        onSuccess: (data) => {
            if (data) {
                setSuccess("Location successfully updated");
                utils.invalidate();
                onClose()
                toast("Location successfully updated!");
            } else {
                setError("Location update failed");
            }
            form.reset();
        },
        onError: (error) => {
            setError(error.message);
            console.log(error.message);
            form.reset();
        },
    });

    const onSubmit = (values: z.infer<typeof LocationsSchema>, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        if (id) updateLocation(values);
        else createLocation(values);
    };

    if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <ScrollArea className="space-y-4 h-[70vh]">
                    <FormField
                        control={form.control}
                        name="locations"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Location Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Location Name"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Address</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Address"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Phone</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Phone Number"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="map"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Map URL</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Map URL"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="locationid"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Location ID</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Location ID"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hours"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Operating Hours</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Operating Hours"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Email"
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
                                    <Textarea
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Description"
                                        disabled={creationPending || updatePending}
                                    />
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
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Small Image"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tag"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Tag</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Tag"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rollerurl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Roller URL</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Roller URL"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Facebook</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Facebook"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="insta"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Instagram</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Instagram"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">Twitter</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="Twitter"
                                        disabled={creationPending || updatePending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tiktok"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-md">TikTok</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        placeholder="TikTok"
                                        disabled={creationPending || updatePending}
                                    />
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

export default LocationsForm;

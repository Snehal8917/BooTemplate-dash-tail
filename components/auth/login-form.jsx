"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from 'react-select';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getStationsAction } from "@/action/auth-action";
import { useQuery } from "@tanstack/react-query";
import { Icon } from "@iconify/react";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(4, { message: "Password must be at least 4 characters." }),
  station: z.number().min(1, { message: "Station is required." })
});

const LogInForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const router = useRouter();

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "text" ? "password" : "text"));
  };

  const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      username: "",
      password: "",
      station: null,
    },
  });

  const { data: stationData, error: userError, isLoading: userLoading } = useQuery({
    queryKey: ["stationData"],
    queryFn: () => getStationsAction(),
  });

  const stationOptions = stationData?.data?.stations?.rows?.map(station => ({
    value: station.id,
    label: station.station,
  })) || [];

  const onSubmit = async (data) => {
    startTransition(async () => {
      const response = await signIn("credentials", {
        stationId: data.station,
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Login Successful");
        const session = await getSession();
        if (session) {
          router.push("/dashboard");
        }
        reset();
      } else if (response?.error) {
        toast.error(response.error);
      }
    });
  };

  return (
    <div className="w-full py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="username" className="mb-2 font-medium text-default-600">Username</Label>
          <Input
            disabled={isPending}
            {...register("username")}
            type="text"
            id="username"
            className={cn("", { "border-destructive": errors.username })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>
        {errors.username && <div className="text-destructive mt-2">{errors.username.message}</div>}

        <div className="mt-3.5">
          <Label htmlFor="password" className="mb-2 font-medium text-default-600">Password</Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register("password")}
              type={passwordType}
              id="password"
              className="peer"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
            />
            <div className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer" onClick={togglePasswordType}>
              <Icon
                icon={passwordType === "password" ? "heroicons:eye" : "heroicons:eye-slash"}
                className="w-5 h-5 text-default-400"
              />
            </div>
          </div>
        </div>
        {errors.password && <div className="text-destructive mt-2">{errors.password.message}</div>}

        <div className="mt-3.5">
          <Label htmlFor="station" className="mb-2 font-medium text-default-600">Station</Label>
          <Select
            options={stationOptions}
            isDisabled={isPending || userLoading}
            onChange={(selectedOption) => setValue("station", selectedOption.value)}
            className={cn("basic-single", { "border-destructive": errors.station })}
            classNamePrefix="select"
            id="station"
            placeholder="Select Station"
          />
        </div>
        {errors.station && <div className="text-destructive mt-2">{errors.station.message}</div>}

         <div className="mt-5 mb-8 flex flex-wrap gap-2">
        {/*  <div className="flex-1 flex items-center gap-1.5">
            <Checkbox size="sm" className="border-default-300 mt-[1px]" id="isRemebered" />
            <Label htmlFor="isRemebered" className="text-sm text-default-600 cursor-pointer whitespace-nowrap">Remember me</Label>
          </div>
          <Link href="/auth/forgot" className="flex-none text-sm text-primary">Forget Password?</Link>*/}
        </div> 
        <Button className="w-full" disabled={isPending} size={!isDesktop2xl ? "lg" : "md"}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default LogInForm;

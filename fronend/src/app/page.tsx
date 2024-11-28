'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast from 'react-hot-toast';
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useAuthStore} from '@/Zustand/useAuthStore';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  })
})

const page = function() {
    const router = useRouter();
    const {updateAuthName} = useAuthStore();
    const[loading,setLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
 async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
        await axios.post('http://localhost:8888/api/login', values,{
            withCredentials:true,
        });
        updateAuthName(values.username);
        router.replace('/chat');
    } catch (error) {
        console.log(error);
        toast.error('Login failed!');
    } finally{
        setLoading(false);
    }
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100 ">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}  className="w-2/5 border-[0.4px] bg-white border-gray-300 p-10 rounded-lg space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username <span className="text-sky-600">*</span></FormLabel>
              <FormControl>
                <Input className="border-gray-300" placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password <span className="text-sky-600">*</span></FormLabel>
              <FormControl>
                <Input className="border-gray-300" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
        <Button disabled={loading} type="submit" className="bg-sky-600 hover:bg-sky-800">
          {loading? "Loading..." : "Submit"}    
        </Button>
        </div>
      </form>
    </Form>
    </div>
  )
}

export default page;
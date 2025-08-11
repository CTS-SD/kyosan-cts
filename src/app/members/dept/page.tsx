"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { StudentNumberSchema } from "@/lib/student-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  studentNumber: StudentNumberSchema,
});

type FormValues = z.infer<typeof FormSchema>;

const Page = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      studentNumber: "",
    },
  });

  const router = useRouter();

  function handleSubmit(values: FormValues) {
    router.push(`/members/dept/${values.studentNumber}`);
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="grid place-content-center pt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="studentNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>学籍番号（6桁） </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      {...field}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {<Button className="w-full">配属部署を確認</Button>}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;

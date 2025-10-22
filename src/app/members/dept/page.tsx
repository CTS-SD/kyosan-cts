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
import { Spinner } from "@/components/ui/spinner";
import { existsStudentByStudentNumber } from "@/lib/student-actions";
import { StudentNumberSchema } from "@/lib/student-editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(values: FormValues) {
    startTransition(async () => {
      const exists = await existsStudentByStudentNumber(values.studentNumber);
      if (!exists) {
        form.reset();
        toast.error("学生が見つかりませんでした", {
          description: "学籍番号をご確認の上、再度お試しください。",
        });
        return;
      }
      router.push(`/members/dept/${values.studentNumber}`);
    });
  }

  return (
    <div className="mx-auto mt-6 max-w-md p-6">
      <div className="flex flex-col items-center">
        <Image
          src="/people.svg"
          alt="people"
          width={300}
          height={300}
          objectFit="contain"
          className="w-60 drop-shadow-lg"
        />
        <div className="bg-card z-10 flex w-full justify-center rounded-lg border p-6 shadow-xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="studentNumber"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>あなたの学籍番号（6桁） </FormLabel>
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
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner />}
                配属部署を確認
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../../components/ui/input-otp";
import { PlayfulButton } from "../../../components/ui/playful-button";
import { Spinner } from "../../../components/ui/spinner";
import { existsStudentByStudentNumber } from "../../../lib/student-actions";
import { StudentNumberSchema } from "../../../lib/student-editor";

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
        <Image src="/people.svg" alt="people" width={240} height={182.72} loading="eager" className="drop-shadow-lg" />
        <div className="z-10 flex w-full rounded-3xl border bg-card shadow-xl">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full flex-col">
            <div className="mx-auto px-6 py-8">
              <Controller
                control={form.control}
                name="studentNumber"
                disabled={isPending}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>あなたの学籍番号（6桁） </FieldLabel>
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-invalid={fieldState.invalid} {...field}>
                      <InputOTPGroup className="font-bold">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <div className="w-full rounded-b-3xl border-t bg-accent/20 p-6">
              <PlayfulButton tint="blue" type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner />}
                配属部署を確認
              </PlayfulButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

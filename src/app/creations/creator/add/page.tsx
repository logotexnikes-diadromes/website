"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronsUpDown } from "lucide-react";
import addfunc from "@/utils/add";
import * as z from "zod";
import { Fragment, useEffect, useState } from "react";
import getschools from "@/utils/getschools";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
import Input from "@/components/input";
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import { H3, H3Small } from "@/components/typography";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string({ required_error: "Ο τίτλος είναι απαρίτητος" }),
  school: z.string({ required_error: "Επιλέξτε ένα από τα σχολεία σας" }),
  description: z.string({ required_error: "Η περιγραφή είναι απαραίτητη" }),
  youtube: z.any(),
  spotify: z.any(),
});

export default function Page() {
  const router = useRouter();
  const [files, setFiles] = useState<null | FileList>(null);
  const [schools, setSchools] = useState<String[] | null>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const user: any = auth.currentUser;
    getschools(user.uid).then((schools) => {
      if (null !== schools) {
        setSchools(schools);
      }
    });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (files !== null) {
      let size = 0;
      Array.from(files).forEach((file) => {
        size = size + file.size;
      });
      if (size > 104857600) {
        toast(
          <div>
            <p className="mb-0.5">Πολύ μεγάλα αρχεία!</p>
            <span className="text-xs">
              Το σύνολο των αρχείων σας ξεπερνά τα 100mb.
            </span>
          </div>
        );
      } else {
        toast.loading("Προσθήκη...");
        toast.loading("Μεταφόρτωση αρχείων...");
        addfunc(values, files)
          .then(() => {
            toast.dismiss();
            toast("Η δημιουργία σας προστέθηκε!");
            router.push("/creations/creator");
          })
          .catch((e) => {
            toast.dismiss();
            toast.error(e);
          });
      }
    } else {
      toast.loading("Προσθήκη...");
      addfunc(values, null)
        .then(() => {
          toast.dismiss();
          toast("Η δημιουργία σας προστέθηκε!");
          router.push("/creations/creator");
        })
        .catch((e) => {
          toast.dismiss();
          toast.error(e);
        });
    }
  }
  const watchSchool = watch("school");

  return (
    <div>
      <div className="px-6 py-14 relative">
        <H3 className="text-red px-6">Προσθήκη δημιουργίας</H3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 px-6">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Τίτλος"
              invalid={errors.title && true}
              message={errors.title}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="school"
          render={({ field: { onChange, value } }) => (
            <div>
              <label className={`text-sm ml-3 ${errors.school && "text-red"}`}>
                Σχολείο
              </label>
              <Listbox
                as={"div"}
                onChange={onChange}
                value={value}
                className={"relative"}
              >
                <Listbox.Button
                  className={`border border-black/10 bg-neutral-50 rounded-xl w-full outline-none py-2 px-3 text-left`}
                >
                  {watchSchool ? watchSchool : "Επιλέξτε ένα σχολείο"}
                </Listbox.Button>
                <div className="absolute -bottom-18 -mb-0.5 left-0 z-10">
                  <Transition
                    as={Fragment}
                    enter="transition ease-in duration-100"
                    leave="transition ease-in duration-100"
                    enterFrom="-translate-y-2 opacity-0"
                    enterTo="opacity-100"
                    leaveFrom="opacity-100"
                    leaveTo="-translate-y-2 opacity-0"
                  >
                    <Listbox.Options
                      className={
                        "bg-neutral-50 border rounded-xl border-black/10 cursor-pointer mt-2 ml-3"
                      }
                    >
                      {schools &&
                        schools.map((i, key) => (
                          <Listbox.Option
                            key={key}
                            value={i}
                            className="flex w-full px-4 py-2 hover:bg-neutral-200 rounded-xl duration-200"
                          >
                            {i}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
              {errors.school && (
                <p className="text-red text-xs mt-0.5 ml-0.5 ">
                  {errors.school.message}
                </p>
              )}
            </div>
          )}
        />
        <div>
          <label className={`text-sm ml-3 ${errors.description && "text-red"}`}>
            Περιγραφή
          </label>
          <textarea
            className={`border border-black/10 bg-neutral-50 rounded-xl w-full outline-none py-2 px-3`}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red text-xs mt-0.5 ml-0.5">
              {errors.description.message}
            </p>
          )}
        </div>
        <Input
          type="file"
          multiple
          label="Αρχεία"
          onChange={(e: any) => setFiles(e.target.files)}
        />
        <p className="text-xs mt-0.5 ml-0.5">
          {" "}
          Τα αρχεία βίντεο και μεγάλα αρχεία ήχου τα ανεβάζετε{" "}
          <Link href={"/help"} className="underline">
            έτσι
          </Link>
        </p>
        <Disclosure>
          <Disclosure.Button className="py-3 w-full bg-neutral-50 rounded-t-xl group border border-black/10">
            <div className="flex items-center justify-between space-x-4 px-4 ">
              <h4 className="font-medium">Σύνδεσμοι</h4>
              <ChevronDown className="opacity-50 group-hover:translate-y-1 duration-200" />
            </div>{" "}
          </Disclosure.Button>
          <Transition
            enter="transition duration-300 ease-out"
            enterFrom="transform -translate-y-8 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-8 opacity-0"
          >
            <Disclosure.Panel className="p-5 rounded-b-xl -translate-y-4 border border-t-0 border-black/10">
              <Controller
                control={control}
                name="spotify"
                render={({ field: { onChange, value } }) => (
                  <Input label="Spotify" onChange={onChange} value={value} />
                )}
              />
              <div className="h-3" />
              <Controller
                control={control}
                name="youtube"
                render={({ field: { onChange, value } }) => (
                  <Input label="Youtube" onChange={onChange} value={value} />
                )}
              />
            </Disclosure.Panel>
          </Transition>
        </Disclosure>
        <div className="w-full mt-3 text-right">
          <Button type="submit">Υποβολή</Button>
        </div>
      </form>
    </div>
  );
}

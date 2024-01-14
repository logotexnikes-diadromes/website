"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { ChevronLeft, ChevronsUpDown } from "lucide-react";
import addfunc from "@/utils/add";
import * as z from "zod";
import { Fragment, useEffect, useState } from "react";
import getschools from "@/utils/getschools";
import { auth } from "@/utils/firebase";
import toast from "react-hot-toast";
import Input from "@/components/input";
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import { H3Small } from "@/components/typography";

const formSchema = z.object({
  title: z.string({ required_error: "Ο τίτλος είναι απαρίτητος" }),
  school: z.string({ required_error: "Επιλέξτε ένα από τα σχολεία σας" }),
  description: z.string({ required_error: "Η περιγραφή είναι απαραίτητη" }),
  youtube: z.any(),
  spotify: z.any(),
});

export default function Page() {
  const [files, setFiles] = useState<null | FileList>(null);
  const [cover, setCover] = useState<null | File>(null);
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
        addfunc(values, files).then(() => {
          toast.dismiss();
          toast("Η δημιουργία σας προστέθηκε!");
        });
      }
    } else {
      toast.loading("Προσθήκη...");
      addfunc(values, null).then(() => {
        toast.dismiss();
        toast("Η δημιουργία σας προστέθηκε!");
      });
    }
  }
  const watchSchool = watch("school");

  return (
    <div className="mx-10">
      <div className="flex mb-8">
        <div className="flex items-center space-x-2">
          <Link href={"./"}>
            <ChevronLeft />
          </Link>
          <H3Small className="font-medium">Προσθήκη δημιουργίας</H3Small>
        </div>
        <div className="mb-8" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
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
            <div className="mt-5">
              <div className="relative">
                <label
                  className={`absolute -top-3 text-sm left-3 bg-white peer-focus:translate-x-1 peer-focus:-translate-y-1 peer-focus:scale-90 peer-focus:opacity-75 duration-300 ${
                    errors.school && "text-red peer-focus:opacity-100"
                  }`}
                >
                  Σχολείο
                </label>

                <Listbox
                  as={"div"}
                  onChange={onChange}
                  value={value}
                  className={"relative"}
                >
                  <Listbox.Button
                    className={
                      "border-b border-black-50 w-full focus:outline-none pt-3 pb-1 px-1 text-left"
                    }
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
                          "bg-white border-b border-x border-black-50 cursor-pointer "
                        }
                      >
                        {schools &&
                          schools.map((i, key) => (
                            <Listbox.Option
                              key={key}
                              value={i}
                              className="flex border-b w-full px-4 py-2 hover:bg-slate-50 duration-300"
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
            </div>
          )}
        />
        <div className="mt-5">
          <div className="relative">
            <textarea
              className={`border-b border-black-50 w-full focus:outline-none pt-3 pb-1 px-1 peer h-52 resize-none`}
              {...register("description")}
            />
            <label
              className={`absolute -top-3 text-sm left-3 bg-white peer-focus:translate-x-1 peer-focus:-translate-y-1 peer-focus:scale-90 peer-focus:opacity-75 duration-300 ${
                errors.description && "text-red peer-focus:opacity-100"
              }`}
            >
              Περιγραφή
            </label>
            {errors.description && (
              <p className="text-red text-xs mt-0.5 ml-0.5">
                {errors.description.message}
              </p>
            )}
          </div>
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
          <Disclosure.Button className="py-2 w-full">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">Σύνδεσμοι</h4>
              <Button type="button" className="!px-3">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </div>{" "}
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="mx-3">
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
        <br />
        <Button type="submit">Υποβολή</Button>
      </form>
    </div>
  );
}

"use client";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { TypographyH3 } from "@/components/ui/typography";
import { ChevronLeft, ChevronsUpDown } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import addfunc from "@/utils/add";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import getschools from "@/utils/getschools";
import { auth } from "@/utils/firebase";

const formSchema = z.object({
  title: z.string({ required_error: "Ο τίτλος είναι απαρίτητος" }),
  school: z.string({ required_error: "Επιλέξτε ένα από τα σχολεία σας" }),
  description: z.string({ required_error: "Η περιγραφή είναι απαραίτητη" }),
  youtube: z.any(),
  spotify: z.any(),
});

export default function Page() {
  const { toast } = useToast();
  const [files, setFiles] = useState<null | FileList>(null);
  const [schools, setSchools] = useState<String[] | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      school: undefined,
      description: undefined,
      youtube: undefined,
      spotify: undefined,
    },
  });
  useEffect(() => {
    const user: any = auth.currentUser;
    getschools(user.uid).then((schools) => {
      if (null !== schools) {
        setSchools(schools);
      }
    });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    if (files !== null) {
      let size = 0;
      Array.from(files).forEach((file) => {
        size = size + file.size;
      });
      if (size > 104857600) {
        toast({
          title: "Πολύ μεγάλα αρχεία!",
          description: "Το σύνολο των αρχείων σας ξεπερνά τα 100mb.",
        });
      } else {
        addfunc(values, files).then(() => {
          toast({
            title: "Η δημιουργία σας προστέθηκε!",
          });
        });
      }
    } else {
      addfunc(values, null).then(() => {
        toast({
          title: "Η δημιουργία σας προστέθηκε!",
        });
      });
    }
  }

  return (
    <div>
      <Toaster />
      <div className="flex mb-8">
        <div className="flex items-center space-x-2">
          <Link href={"./"}>
            <ChevronLeft />
          </Link>
          <TypographyH3>Προσθήκη δημιουργίας</TypographyH3>
        </div>
        <div className="mb-8" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Τίτλος</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Σχολείο</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Επιλέξτε ένα σχολείο" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {schools &&
                      schools.map((school, index) => (
                        <SelectItem key={index} value={school as string}>
                          {school}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Τα σχολεία σας διαχειρίζονται από την πλατφόρμα.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Περιγραφή</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Αρχεία</FormLabel>
            <FormControl>
              <Input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
            </FormControl>
            <FormDescription>
              Τα αρχεία βίντεο και μεγάλα αρχεία ήχου τα ανεβάζετε{" "}
              <Link href={""} className="underline">
                έτσι
              </Link>
              .
            </FormDescription>
          </FormItem>
          <Collapsible className="space-y-2">
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">Σύνδεσμοι</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              <FormField
                control={form.control}
                name="spotify"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spotify</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Youtube</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CollapsibleContent>
          </Collapsible>
          <Button type="submit">Υποβολή</Button>
        </form>
      </Form>
    </div>
  );
}

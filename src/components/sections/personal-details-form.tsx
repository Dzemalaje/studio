
"use client";

import { useCvData } from "@/hooks/use-cv-data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetails, PersonalDetailsSchema } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useCallback, useState, useRef } from "react";
import debounce from 'lodash.debounce';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ImageCropper } from "../image-cropper";

export function PersonalDetailsForm() {
  const { cvData, setCvData } = useCvData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PersonalDetails>({
    resolver: zodResolver(PersonalDetailsSchema),
    defaultValues: cvData.personalDetails,
    mode: "onChange",
  });

  const handleUpdateProfilePicture = useCallback((dataUrl: string) => {
    setCvData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        profilePicture: dataUrl,
      },
    }));
    setDialogOpen(false);
    setImageSrc(null);
  }, [setCvData]);
  
  const debouncedSetCvData = useCallback(
    debounce((data: PersonalDetails) => {
      setCvData((prev) => ({
        ...prev,
        personalDetails: {
          ...prev.personalDetails,
          ...data,
        }
      }));
    }, 300),
    [setCvData]
  );

  const watchedData = useWatch({ control: form.control });

  useEffect(() => {
    const { profilePicture, ...rest } = watchedData;
    if (form.formState.isDirty) {
      debouncedSetCvData(rest as PersonalDetails);
    }
    return () => {
      debouncedSetCvData.cancel();
    };
  }, [watchedData, form.formState.isDirty, debouncedSetCvData]);


  useEffect(() => {
    if (JSON.stringify(form.getValues()) !== JSON.stringify(cvData.personalDetails)) {
        form.reset(cvData.personalDetails);
    }
  }, [cvData.personalDetails, form]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string);
        setDialogOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
     setCvData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        profilePicture: "",
      },
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4 p-1">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {cvData.personalDetails.profilePicture ? (
                    <Image src={cvData.personalDetails.profilePicture} alt="Profile" width={96} height={96} className="object-cover w-full h-full" />
                ) : (
                    <Camera className="w-8 h-8 text-muted-foreground" />
                )}
            </div>
             <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                onClick={() => fileInputRef.current?.click()}
             >
                <Camera className="w-4 h-4" />
             </Button>
            {cvData.personalDetails.profilePicture && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button type="button" variant="ghost" size="icon" className="text-destructive-foreground hover:text-destructive-foreground" onClick={handleRemoveImage}>
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept="image/png, image/jpeg"
        />

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crop your profile picture</DialogTitle>
                </DialogHeader>
                {imageSrc && <ImageCropper imageSrc={imageSrc} onCropComplete={handleUpdateProfilePicture} />}
            </DialogContent>
        </Dialog>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Full Stack Developer" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., jane.doe@email.com" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., (123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website/Portfolio</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., yourportfolio.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="A brief summary of your professional background..." rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      </form>
    </Form>
  );
}

    
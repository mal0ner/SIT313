import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

import { Timestamp } from 'firebase/firestore';
import { auth, createPost, Post, uploadImageReturnURL } from '@/utils/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//TODO: Ensure MAX Pay is > MIN pay
//coerce allows for string input to be autocast to number
const formSchema = z
  .object({
    jobtype: z.string(),
    title: z
      .string()
      .min(3, { message: 'Must be more than 3 characters' })
      .max(40, { message: 'Cannot be more than 40 characters' }),
    userRole: z.string(),
    business: z.string().min(1, { message: 'Must not be empty' }).max(50),
    description: z.string().min(10).max(200),
    skills: z.string().min(5).max(100),
    projectLength: z.string().min(1).max(15),
    paymentMin: z.coerce.number().gt(0),
    paymentMax: z.coerce.number().gt(0),
    workingHours: z.coerce.number().gt(0).lt(100),
    createdDate: z.custom<Timestamp>(),
  })
  .refine((data) => data.paymentMin <= data.paymentMax, {
    path: ['paymentMin'],
    message: 'Minimum payment must be equal to or smaller than maximum',
  })
  .refine((data) => data.paymentMin <= data.paymentMax, {
    path: ['paymentMax'],
    message: 'Maximum payment must be equal to or greater than minimum',
  });

//DONE: Add missing fields from db and firebase Post type to schema
function FreelanceForm() {
  const navigate = useNavigate();
  const [imageList, setImageList] = useState<FileList | null>(null);
  // define our form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobtype: 'freelance',
      title: '',
      business: '',
      userRole: '',
      description: '',
      skills: '',
      projectLength: '',
      paymentMin: 0,
      paymentMax: 0,
      workingHours: 0,
      createdDate: Timestamp.now(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be DB connection eventually
    // console.log(values);
    // HACK: Surely there is a better way, I don't even let users onto this page without
    // signing in
    if (!auth.currentUser) {
      return;
    }

    const imageURL: string | null = await uploadImageReturnURL(imageList);

    const post: Post = {
      postId: '',
      userId: auth.currentUser.uid,
      userRole: values.userRole,
      jobType: 'freelance',
      title: values.title,
      business: values.business,
      description: values.description,
      skills: values.skills.split(','),
      projectLength: values.projectLength,
      paymentMin: values.paymentMin,
      paymentMax: values.paymentMax,
      workingHours: values.workingHours,
      experience: null,
      experienceTypes: [],
      likes: 0,
      applicants: [],
      imageURL: imageURL ?? null,
      createdDate: Timestamp.now(),
    };
    try {
      await createPost(auth.currentUser, post);
      navigate('/jobs');
    } catch (error: any) {
      alert(
        error.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, ''),
      );
    }
  }

  return (
    <>
      <div className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 max-w-prose"
          >
            <h2 className="text-2xl font-yeseva">New Freelance Offer</h2>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Chief Consulting Officer" {...field} />
                  </FormControl>
                  <FormDescription>
                    The full role title for the position
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="business"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business</FormLabel>
                  <FormControl>
                    <Input placeholder="Willow Tech Consulting" {...field} />
                  </FormControl>
                  <FormDescription>Company name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea {...field}></Textarea>
                  </FormControl>
                  <FormDescription>
                    Succinct but descriptive synopsis of the role.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Java, AWS, Azure, Templating"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma separated list of skills. Be specific, developers will
                    largely decide to apply based on what you provide here...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <Separator />
            <h2 className="text-2xl font-yeseva">Project Conditions</h2>

            <FormField
              control={form.control}
              name="projectLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Length</FormLabel>
                  <FormControl>
                    <Input placeholder="1 month" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="paymentMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Pay</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <span>$</span>
                      <Input placeholder="2000" type="number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="paymentMax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Pay</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <span>$</span>
                      <Input placeholder="12000" type="number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name="workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Hours</FormLabel>
                  <FormControl>
                    <span>
                      <Input placeholder="8" type="number" {...field} />
                    </span>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <Separator />
            <h2 className="text-2xl font-yeseva">Optional: Upload an image</h2>

            <div className="flex gap-6">
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setImageList(event.target.files);
                }}
                className="file:bg-sky-200 file:rounded file:px-3 file:outline-2 file:outline-slate-200 hover:bg-slate-50 transition-all ease-in-out"
              />
            </div>

            <Button type="submit" className="w-fit pl-12 pr-12">
              Post
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default FreelanceForm;

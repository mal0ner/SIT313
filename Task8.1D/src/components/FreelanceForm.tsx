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

//coerce allows for string input to be autocast to number
const formSchema = z.object({
  jobtype: z.string(),
  title: z
    .string()
    .min(3, { message: 'Must be more than 3 characters' })
    .max(40, { message: 'Cannot be more than 40 characters' }),
  description: z.string().min(10).max(200),
  skills: z.string().min(5).max(100),
  projectLength: z.string().min(1).max(15),
  paymentMin: z.coerce.number().gt(0),
  paymentMax: z.coerce.number().gt(0),
  workingHours: z.coerce.number().gt(0).lt(100),
});

//TODO: Add missing fields from db and firebase Post type to schema
function FreelanceForm() {
  // define our form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobtype: 'freelance',
      title: '',
      skills: '',
      projectLength: '',
      paymentMin: 0,
      paymentMax: 0,
      workingHours: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be DB connection eventually
    console.log(values);
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

            <Button className="w-fit pl-12 pr-12" type="submit">
              Post
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default FreelanceForm;

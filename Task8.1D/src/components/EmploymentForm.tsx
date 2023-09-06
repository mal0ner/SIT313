import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

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
import { Plus, Minus } from 'lucide-react';

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
  experience: z.array(
    z.object({
      type: z.string().min(1, { message: 'Must not be empty' }),
      years: z.string().min(1, { message: 'Must not be empty' }),
    }),
  ),
});

function FreelanceForm() {
  // define our form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobtype: 'employment',
      title: '',
      skills: '',
      projectLength: '',
      paymentMin: 0,
      paymentMax: 0,
      workingHours: 0,
      experience: [
        {
          type: '',
          years: '',
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be DB connection eventually
    console.log(values);
  }

  const { fields, append, remove } = useFieldArray({
    name: 'experience',
    control: form.control,
  });

  return (
    <>
      <div className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 max-w-prose"
          >
            <h2 className="text-2xl font-yeseva">New Employment Offer</h2>
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
            />

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
            />

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
            />

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
            />

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
            />

            <FormField
              control={form.control}
              name="workingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekly Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="8" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`experience.${index}.type`}
                    render={({ field }) => (
                      <FormItem>
                        {index == 0 && <FormLabel>Experience</FormLabel>}
                        {index == 0 && (
                          <FormDescription>What technology?</FormDescription>
                        )}
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`experience.${index}.years`}
                    render={({ field }) => (
                      <FormItem>
                        {index == 0 && <FormLabel>Years</FormLabel>}
                        {index == 0 && (
                          <FormDescription>How long?</FormDescription>
                        )}
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => append({ type: '', years: '' })}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(-1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>

            <Button type="submit">Post</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default FreelanceForm;

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  checkUserExists,
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from '@/utils/firebase';

const signupSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }).trim(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password should be at least 8 characters' })
      .regex(/^(?=.*[A-Z]).*$/, { message: 'Must contain a capital letter' })
      .regex(/^(?=.*[0-9])/, { message: 'Must contain at least 1 digit' })
      .regex(/^(?=.*[!@#$%^&*()\-__+.])/, {
        message: 'Must contain at least 1 special character',
      }),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .refine(
    async (data) => {
      const userExists = await checkUserExists(data.email);
      // refine error message is thrown when this function evaluates to false
      // so we want to return false if the user does exist
      return !userExists;
    },
    {
      path: ['email'],
      message: 'User already exists in database',
    },
  );

export default function Signup() {
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    // This will use firebase to create a new user record in the
    // Auth service

    // TODO: Signup Email should be checked against existing firestore db
    // in case of conflict.

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        values.email,
        values.password,
      );
      console.log(user);
      await createUserDocFromAuth(user, values.name);
    } catch (error: any) {
      console.log(error.message);
    }
    console.log('created user');
  }

  return (
    <div className="m-10 flex flex-col gap-10 items-center justify-center w-1/2">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-4xl font-yeseva">Sign Up</h1>
        <p className="font-josefin">Come join us at DevLink Marketplace!</p>
      </div>
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full max-w-prose"
        >
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="James Schmidtson" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="jschmiddy@aol.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-1/2 place-self-center" type="submit">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}

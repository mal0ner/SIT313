import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import * as z from 'zod';
import {
  checkUserExists,
  handleUserSignupEmailPassword,
} from '@/utils/firebase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

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
  });

export default function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  function togglePasswordVisible() {
    setPasswordVisible(!passwordVisible);
  }

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    //dont submit the form if a user exists already
    if (await checkUserExists(values.email)) {
      signupForm.setError('email', {
        message: 'An account with that email already exists',
      });
      return;
    }
    try {
      await handleUserSignupEmailPassword(
        values.email,
        values.password,
        values.name,
      );
      // Redirect to home page after signup
      navigate('/');
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
                  <div className="flex items-center gap-1">
                    <Input
                      placeholder="*******"
                      type={passwordVisible ? 'text' : 'password'}
                      {...field}
                    />
                    {passwordVisible ? (
                      <EyeOff
                        onClick={togglePasswordVisible}
                        className="cursor-pointer text-gray-400"
                      />
                    ) : (
                      <Eye
                        onClick={togglePasswordVisible}
                        className="cursor-pointer text-gray-400"
                      />
                    )}
                  </div>
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
                  <Input
                    placeholder="*******"
                    type={passwordVisible ? 'text' : 'password'}
                    {...field}
                  />
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

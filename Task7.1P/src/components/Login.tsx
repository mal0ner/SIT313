import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import * as z from 'zod';
import {
  checkUserExists,
  loginAuthUserWithEmailAndPassword,
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

const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, { message: 'Password required to login' }),
  })
  .refine(
    async (data) => {
      return await checkUserExists(data.email);
    },
    {
      path: ['email'],
      message: 'We could not find an account under that email',
    },
  );

export default function Login() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    //Do something with form values
    //this will use firebase to check user against existing user
    //documents
    try {
      await loginAuthUserWithEmailAndPassword(values.email, values.password);
      navigate('/');
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        loginForm.setError('password', { message: 'Incorrect Password' });
      } else {
        alert(
          error.message.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, ''),
        );
      }
    }
  }

  function togglePasswordVisible() {
    setPasswordVisible(!passwordVisible);
  }

  return (
    <>
      <div className="m-10 flex flex-col gap-10 items-center justify-center w-1/2">
        <div className="text-center flex flex-col gap-2">
          <h1 className="text-4xl font-yeseva">Welcome back!</h1>
        </div>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full max-w-prose"
          >
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      <Input
                        placeholder="**********"
                        type={passwordVisible ? 'text' : 'password'}
                        {...field}
                      />
                      {passwordVisible ? (
                        <EyeOff
                          onClick={togglePasswordVisible}
                          className="cursor-pointer"
                        />
                      ) : (
                        <Eye
                          onClick={togglePasswordVisible}
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-1/2 place-self-center" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

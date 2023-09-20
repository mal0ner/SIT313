'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { auth, signOutCurrentUser } from '@/utils/firebase';
import { User } from 'firebase/auth';
//ShadCN Navigation Menu component import
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from './ui/separator';

import HamburgerMenu from '@/components/HamburgerMenu';

function Navbar() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // clean up on component unmount
    return () => unsubscribe();
  });
  return (
    <>
      <div className="flex justify-between items-center font-josefin m-4">
        <h1 className="font-bold italic text-xl select-none">
          <Link to={'/'}>
            <span className="bg-sky-200 p-2 rounded hover:bg-blue-300 transition ease duration-200">
              DevLink
            </span>
          </Link>{' '}
          Marketplace
        </h1>
        <nav className="bold font-josefin">
          <div className="flex md:hidden">
            <HamburgerMenu user={currentUser} />
          </div>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  to={'/find/freelancers'}
                  className={navigationMenuTriggerStyle()}
                >
                  Find Devs
                </Link>
              </NavigationMenuItem>

              {/* TODO: Add ShadCN/UI altert dialog element here to trigger when there is no user logged in  */}
              <NavigationMenuItem>
                <Link to={'/jobs'} className={navigationMenuTriggerStyle()}>
                  Find Jobs
                </Link>
              </NavigationMenuItem>

              {currentUser ? (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <div className="flex items-center">
                        <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-1 p-3 md:w-[150px] lg:w-[200px]">
                            <h1>
                              {currentUser ? currentUser.displayName : ''}
                            </h1>
                            <Separator />
                            <Link to="#">
                              <ListItem>Posts</ListItem>
                            </Link>
                            <Link to="/profile">
                              <ListItem>Edit Profile</ListItem>
                            </Link>
                            <Separator />
                            <ListItem
                              onClick={() => {
                                signOutCurrentUser();
                                navigate('/');
                              }}
                              className="cursor-pointer"
                            >
                              Sign Out
                            </ListItem>
                          </ul>
                        </NavigationMenuContent>
                        {currentUser && currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt="profile picture"
                            width={50}
                          />
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <div className="flex">
                  <NavigationMenuItem>
                    <Link
                      to={'/login'}
                      className={navigationMenuTriggerStyle()}
                    >
                      Login
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      to={'/signup'}
                      className={navigationMenuTriggerStyle()}
                    >
                      Create Account
                    </Link>
                  </NavigationMenuItem>
                </div>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-sky-200 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Navbar;

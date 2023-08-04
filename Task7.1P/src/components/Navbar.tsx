'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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

function Navbar() {
  return (
    <>
      <div className="flex justify-center md:justify-between font-josefin m-4">
        <h1 className="font-bold italic text-xl select-none">
          <span className="bg-sky-200 p-2 rounded hover:bg-blue-300 transition ease duration-200">
            DevLink
          </span>{' '}
          Marketplace
        </h1>
        <nav className="bold hidden md:flex font-josefin">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Find Devs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-6 md:w-[150px] lg:w-[200px]">
                    <Link to={'/find/freelancers'}>
                      <ListItem href="#" title="New Post"></ListItem>
                    </Link>
                    <ListItem href="#" title="All Posts"></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Find Jobs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-6 md:w-[150px] lg:w-[200px]">
                    <ListItem href="#" title="New Post"></ListItem>
                    <ListItem href="#" title="All Posts"></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to={'/login'}>Login</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Create Account
                </NavigationMenuLink>
              </NavigationMenuItem>
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

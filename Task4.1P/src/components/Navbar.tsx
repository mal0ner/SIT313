'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

//ShadCN Navigation Menu component import
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
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
                    <ListItem href="#" title="Frontend"></ListItem>
                    <ListItem href="#" title="Backend"></ListItem>
                    <ListItem href="#" title="Full-stack"></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Find Jobs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-1 p-6 md:w-[150px] lg:w-[200px]">
                    <ListItem href="#" title="Go"></ListItem>
                    <ListItem href="#" title="C#"></ListItem>
                    <ListItem href="#" title="Typescript"></ListItem>
                    <ListItem href="#" title="Rust"></ListItem>
                    <ListItem href="#" title="Python"></ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Login
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
            className
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

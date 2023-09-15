import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarSeparator,
} from '@/components/ui/menubar';

import { User } from 'firebase/auth';
import { Menu } from 'lucide-react';

import { Link } from 'react-router-dom';

type MenuProps = {
  user: User | null;
};

function HamburgerMenu(props: MenuProps) {
  return (
    <>
      <Menubar className="w-fit">
        <MenubarMenu>
          <MenubarTrigger>
            <Menu />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link to={'/find/freelancers'}>Find Devs</Link>
            </MenubarItem>
            <MenubarItem>
              <Link to={'jobs'}>Find Jobs</Link>
            </MenubarItem>
            <MenubarSeparator />
            {!props.user && <MenubarItem>Login</MenubarItem>}
            {!props.user && <MenubarItem>Signup</MenubarItem>}
            {props.user && (
              <MenubarSub>
                <MenubarSubTrigger>
                  {props.user.photoURL && (
                    <img
                      src={props.user.photoURL}
                      alt="profile picture"
                      width={30}
                      className="mr-2"
                    />
                  )}
                  Profile
                </MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>My Posts</MenubarItem>
                  <MenubarItem>Edit Profile</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}

export default HamburgerMenu;

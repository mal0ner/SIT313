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
import { signOutCurrentUser } from '@/utils/firebase';

import { User } from 'firebase/auth';
import { Menu } from 'lucide-react';

import { Link, useNavigate } from 'react-router-dom';

type MenuProps = {
  user: User | null;
};

function HamburgerMenu(props: MenuProps) {
  const navigate = useNavigate();
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
            {!props.user && (
              <MenubarItem>
                <Link to={'/login'}>Login</Link>
              </MenubarItem>
            )}
            {!props.user && (
              <MenubarItem>
                <Link to={'/signup'}>Signup</Link>
              </MenubarItem>
            )}
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
                  <MenubarItem>
                    <Link to={'/profile/posts'}>Posts</Link>
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer">
                    <Link to={'/profile'}>Profile</Link>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    className="cursor-pointer text-rose-500"
                    onClick={() => {
                      signOutCurrentUser();
                      navigate('/');
                    }}
                  >
                    Sign Out
                  </MenubarItem>
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

import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Instagram } from 'lucide-react';

function Footer() {
  return (
    <>
      <footer className="mb-10">
        <div className="flex flex-col md:flex-row md:justify-between m-12">
          <div className="flex flex-col items-center">
            <h2 className="font-yeseva text-lg md:text-xl">For Developers</h2>
            <Button variant="link">
              <a href="#">How it works</a>
            </Button>
            <Button variant="link">
              <a href="#">Creating a profile</a>
            </Button>
            <Button variant="link">
              <a href="#">Find Jobs</a>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-yeseva text-lg md:text-xl">For Clients</h2>
            <Button variant="link">
              <a href="#">How it works</a>
            </Button>
            <Button variant="link">
              <a href="#">Creating a profile</a>
            </Button>
            <Button variant="link">
              <a href="#">Find Devs</a>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-yeseva text-lg md:text-xl">Stay Connected</h2>
            <div className="flex gap-4">
              <Button variant="outline" size="icon">
                <a href="#">
                  <Twitter />
                </a>
              </Button>
              <Button variant="outline" size="icon">
                <a href="#">
                  <Facebook />
                </a>
              </Button>
              <Button variant="outline" size="icon">
                <a href="#">
                  <Instagram />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-yeseva text-lg md:text-xl">DEVLink</h2>
          <div className="flex flex-col md:flex-row md:justify-between">
            <Button variant="link">
              <a href="#">Privacy Policy</a>
            </Button>
            <Button variant="link">
              <a href="#">Terms of Service</a>
            </Button>
            <Button variant="link">
              <a href="#">Code of Conduct</a>
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

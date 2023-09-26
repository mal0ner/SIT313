import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '@/context/user.context';
import { Loader2 } from 'lucide-react';

function NewJobPage() {
  const { user, loading, error } = useContext(UserContext);

  if (loading) {
    return (
      <div className="p-10 gap-6 w-full flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Error... {error.message}</div>;
  }
  if (user) {
    return (
      <div className="flex flex-col gap-6 m-6 mt-20 mb-20">
        <section className="max-w-prose">
          <h1 className="text-3xl md:text-5xl font-yeseva">
            Your new hire is just a few clicks away...
          </h1>
          <p>
            Fill out the following form to create a new post on DevLink
            marketplace, and connect directly to developers in minutes.
          </p>
        </section>
        <div>
          <div className="flex">
            <NavLink
              to={'/find/freelancers'}
              className={({ isActive }) =>
                isActive
                  ? 'p-2 pr-4 pl-4 rounded-t-md bg-sky-200 font-bold font-josefin'
                  : 'p-2 pr-4 pl-4 rounded-t-md bg-slate-100 font-josefin'
              }
            >
              Freelance
            </NavLink>
            <NavLink
              to={'/find/employees'}
              className={({ isActive }) =>
                isActive
                  ? 'p-2 pr-4 pl-4 rounded-t-md bg-sky-200 font-bold font-josefin'
                  : 'p-2 pr-4 pl-4 rounded-t-md bg-slate-100 font-josefin'
              }
            >
              Employment
            </NavLink>
          </div>
          <div className="outline outline-sky-200 outline-6 rounded">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
  return <Navigate to={'/login'} />;
}

export default NewJobPage;

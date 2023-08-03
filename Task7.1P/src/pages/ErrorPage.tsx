import { useRouteError } from 'react-router-dom';
import errorImg from '@/assets/404.png';

function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="flex flex-col gap-5 items-center">
        <img src={errorImg} alt="an empty bar" className="w-72 md:w-96" />
        <h1 className="text-2xl md:text-4xl font-yeseva">Oops!</h1>
        <p className="font-josefin">An error has occurred.</p>
        <p className="bg-gray-200 p-2 rounded text-gray-500">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;

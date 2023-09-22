import { User } from 'firebase/auth';

type InformationProps = {
  user: User;
};

function UserInformation(props: InformationProps) {
  return (
    <>
      <div>Hello, {props.user.displayName}</div>
    </>
  );
}

export default UserInformation;

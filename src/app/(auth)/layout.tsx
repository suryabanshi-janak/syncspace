import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-7.5rem)] pb-20'>
      {children}
    </div>
  );
};

export default AuthLayout;

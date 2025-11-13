import React, { ReactNode } from 'react';

// Recommended way using the PropsWithChildren utility type
const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>{children}</div>
    );
};

export default Layout;

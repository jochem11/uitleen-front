import { Box } from '@mui/material';
import Sidebar from './Sidebar'; // Assuming Sidebar is in the same directory
import { ReactNode } from 'react';

type Props = {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

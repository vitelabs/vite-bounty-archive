import {ReactNode} from 'react';
import {NetworkTypes, State} from '../utils/types';
import {connect} from '../utils/globalContext';
import {Box, Container, AppBar, Typography, Toolbar, Link, Stack} from '@mui/material'
import ViteConnectButton from "./ViteConnectButton";

type Props = State & {
  noPadding?: boolean;
  children: ReactNode;
};

const PageContainer = ({children,}: Props) => {
  return (
    <>
      <AppBar position="static" color="primary" enableColorOnDark>
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{marginLeft: '-24px'}}>
              ViteDao
            </Typography>

            <Stack
              sx={{flexGrow: 1, padding: '0 30px'}}
              direction="row"
              spacing={2}
            >
              <Link href="/" sx={{color: '#fff'}}>Spaces</Link>
            </Stack>

            <ViteConnectButton/>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container fixed sx={{padding: '30px 0',}}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default connect(PageContainer);

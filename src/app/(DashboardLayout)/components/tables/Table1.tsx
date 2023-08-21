import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Chip,
  LinearProgress,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from '@mui/material';
import BlankCard from '../shared/BlankCard';
import { Box, Stack } from '@mui/system';
import {
  IconArrowBackUp,
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconPlus,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import TableHeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/TableHeaderTab';

const rows = [
  {
    no: 3066,
    status: 'paid',
    avatar: "/images/users/1.jpg",
    cname: 'Olivia Rhye',
    email: 'olivia@ui.com',
    percent: 60,
  },
  {
    no: 3067,
    status: 'cancelled',
    avatar: "/images/users/2.jpg",
    cname: 'Barbara Steele',
    email: 'steele@ui.com',
    percent: 30,
  },
  {
    no: 3068,
    status: 'paid',
    avatar: "/images/users/3.jpg",
    cname: 'Leonard Gordon',
    email: 'olivia@ui.com',
    percent: 45,
  },
  {
    no: 3069,
    status: 'refunded',
    avatar: "/images/users/4.jpg",
    cname: 'Evelyn Pope',
    email: 'steele@ui.com',
    percent: 37,
  },
  {
    no: 3070,
    status: 'cancelled',
    avatar: "/images/users/5.jpg",
    cname: 'Tommy Garza',
    email: 'olivia@ui.com',
    percent: 87,
  },
  {
    no: 3071,
    status: 'refunded',
    avatar: "/images/users/6.jpg",
    cname: 'Isabel Vasquez',
    email: 'steele@ui.com',
    percent: 32,
  },
];

const Table1 = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <BlankCard>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHeaderTab isForTeamLeader={true}/>
          <TableBody>
            {/* <getLeaderInfo tabs={companies[0].label} auth={"true"} /> */}
            {/* {rows.map((row) => (
              <TableRow key={row.no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell scope="row">
                  <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                    INV-{row.no}
                  </Typography>
                </TableCell>
                </TableRow>
                ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default Table1;

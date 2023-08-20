import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TabPanel,
} from '@mui/material';
import BlankCard from '../shared/BlankCard';
import { Box, Stack } from '@mui/system';
import { IconDotsVertical, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import CompanyTabs from '@/app/(DashboardLayout)/ui-components/companyTabs/CompanyTab';


const rows = [
  {
    status: 'active',
    avatar: "/images/users/1.jpg",
    name: 'Olivia Rhye',
    project: 'Xtreme admin',
    percent: 60,
    users: [{ img: "/images/users/1.jpg" }, { img: "/images/users/2.jpg" }],
  },
  {
    status: 'cancel',
    avatar: "/images/users/2.jpg",
    name: 'Barbara Steele',
    project: 'Adminpro admin',
    percent: 30,
    users: [{ img: "/images/users/1.jpg" }, { img: "/images/users/2.jpg" }, { img: "/images/users/3.jpg" }],
  },
  {
    status: 'active',
    avatar: "/images/users/3.jpg",
    name: 'Leonard Gordon',
    project: 'Monster admin',
    percent: 45,
    users: [{ img: "/images/users/3.jpg" }, { img: "/images/users/2.jpg" }],
  },
  {
    status: 'pending',
    avatar: "/images/users/4.jpg",
    name: 'Evelyn Pope',
    project: 'Materialpro admin',
    percent: 37,
    users: [{ img: "/images/users/1.jpg" }, { img: "/images/users/2.jpg" }, { img: "/images/users/5.jpg" }],
  },
  {
    status: 'cancel',
    avatar: "/images/users/5.jpg",
    name: 'Tommy Garza',
    project: 'Elegant admin',
    percent: 87,
    users: [{ img: "/images/users/5.jpg" }, { img: "/images/users/6.jpg" }],
  },
  {
    status: 'pending',
    avatar: "/images/users/6.jpg",
    name: 'Isabel Vasquez',
    project: 'Modernize admin',
    percent: 32,
    users: [{ img: "/images/users/2.jpg" }, { img: "/images/users/4.jpg" }],
  },
];

interface UserTableProps {
  data: [];
}

const UserTable = (props:UserTableProps) => {

  const data = props.data

  console.log(data)
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
          <TableHead>
            <TableRow>
              {Object.keys(data).map((row, idx) => (
                <TableCell key={idx}>{row}</TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

                
          </TableBody>

        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default UserTable;

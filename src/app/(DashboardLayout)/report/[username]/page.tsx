'use client'

import * as React from 'react';
import {
  Typography,
  Box,
  Avatar,
  Chip,
  Paper,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Grid,
} from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useValidUser from '../../components/dataFetching/useValidateUser';
import { usePathname, useSearchParams } from 'next/navigation';
import GeneralTab from '@/app/(DashboardLayout)/ui-components/tabs/GeneralTab';
import BaseTable from '../../components/tables/baseTable';


function createData(
  imgsrc?: string,
  pname?: string,
  customer?: string,
  inventory?: boolean,
  price?: number,
  items?: string,
) {
  return {
    imgsrc,
    pname,
    customer,
    inventory,
    price,
    items,
    history: [
      { date: '2021-02-05', customerId: '15202410', price: 250, amount: 3 },
      { date: '2021-02-02', customerId: 'Anonymous', price: 600, amount: 1 },
    ],
  };
}


function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const pathName = decodeURI(usePathname().split('/')[2]);
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: `${pathName}`.split('/')[3],
    },
  ];


  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={row.imgsrc}
              alt={row.imgsrc}
              sx={{
                width: 90,
                height: 70,
                borderRadius: '10px',
              }}
            />
            <Typography variant="h6" fontWeight="600">
              {row.pname}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {row.customer}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            size="small"
            label={row.inventory ? 'In Stock' : 'Out of Stock'}
            color={row.inventory ? 'success' : 'error'}
            sx={{ borderRadius: '6px' }}
          />
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            ${row.price}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" fontWeight="400">
            {row.items}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A200,
                  p: '5px 15px',
                  color: (theme) =>
                    `${
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey.A200
                        : 'rgba(0, 0, 0, 0.87)'
                    }`,
                }}
              >
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Customer</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Amount</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">Total price ($)</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow: any) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.customerId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.amount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight="600">
                          {Math.round(historyRow.amount * historyRow.price * 100) / 100}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const rows = [
  createData("/images/products/s1.jpg", 'Good butterscotch ice-cream', 'Sunil Joshi', true, 250, '2'),
  createData("/images/products/s2.jpg", 'Supreme fresh tomato available', 'John Deo', false, 450, '1'),
  createData("/images/products/s3.jpg", 'Red color candy from Gucci', 'Andrew McDownland', false, 150, '2'),
  createData("/images/products/s4.jpg", 'Stylish night lamp for night', 'Christopher Jamil', true, 550, '6'),
];




const CollapsibleTable = () => {

  const pathName = decodeURI(usePathname().split('/')[2]);

  {/* 더미 데이터 */}
  const personalSalesTab = ['관리번호','상호','팀장','번호','도메인','서브도메인 수', '회원 수', '아이디','비밀번호']
  const personalSalesData = ['1','1팀','이동규','010-1234-5678','www.naver.com','3','3','id','pw']

  const myTotalSalesSummaryTab =['전체신청','상담전','상담완료','상담거절','성공','실패','대출',"연구소","벤처","메인","경정", "총 매출(천원)"]
  const myTotalSalesSummaryCnt = Array.from({length: myTotalSalesSummaryTab.length}, () => Math.floor(Math.random() * 100))

  const customerInfoTab = [
    "고객정보",
    "업체명",
    "업체대표",
    "휴대폰",
    "업태",
    "사업자",
    "업력",
    "연매출",
    "4대보험",
    "인증항목",
    "사업자소유여부",
  ]





  return(
  <PageContainer title="Collapsible Table" description="this is Collapsible Table">
    <ParentCard title={`${pathName}의  영업 현황`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <BlankCard>
              <TableContainer component={Paper}>
                <Table
                  aria-label="collapsible table"
                  sx={{
                    whiteSpace: {
                      xs: 'nowrap',
                      sm: 'unset',
                    },
                  }}
                >
                  <TableHead>
                    <GeneralTab 
                    arr={personalSalesTab} />
                  </TableHead>
                  <TableBody>
                    <GeneralTab arr={personalSalesData}/>
                    {/* {rows.map((row) => (
                      <Row key={row.pname} row={row} />
                    ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </BlankCard>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <BlankCard>
              <TableContainer component={Paper}>
                <Table
                  aria-label="collapsible table"
                  sx={{
                    whiteSpace: {
                      xs: 'nowrap',
                      sm: 'unset',
                    },
                  }}
                >
                  <TableHead>
                    <GeneralTab 
                    arr={myTotalSalesSummaryTab} />
                  </TableHead>
                  <TableBody>
                    <GeneralTab arr={myTotalSalesSummaryCnt}/>
                    {/* {rows.map((row) => (
                      <Row key={row.pname} row={row} />
                    ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </BlankCard>
          </Box>
      </Grid>
      <Grid item xs={12}>
          <Box>
            <BlankCard>
              <TableContainer component={Paper}>
                <Table
                  aria-label="collapsible table"
                  sx={{
                    whiteSpace: {
                      xs: 'nowrap',
                      sm: 'unset',
                    },
                  }}
                >
                  <TableHead>
                    <GeneralTab 
                    arr={customerInfoTab} />
                  </TableHead>
                  <TableBody>
                    {/* {rows.map((row) => (
                      <Row key={row.pname} row={row} />
                    ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </BlankCard>
          </Box>
      </Grid>
    </Grid>
    </ParentCard>
  </PageContainer>
  )
};

export default CollapsibleTable;

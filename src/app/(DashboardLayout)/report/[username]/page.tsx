'use client';
import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Grid,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { usePathname } from 'next/navigation';
import GeneralTab from '@/app/(DashboardLayout)/ui-components/tabs/GeneralTab';
import ReportTable from '../../ui-components/tables/ReportTable';
import { update } from 'lodash';

const CollapsibleTable = () => {
  const personalSalesTab = [
    '관리번호',
    '상호',
    '팀장',
    '번호',
    '도메인',
    '서브도메인 수',
    '회원 수',
    '아이디',
    '비밀번호',
  ];
  const personalSalesData = [
    '1',
    '1팀',
    '이동규',
    '010-1234-5678',
    'www.naver.com',
    '3',
    '3',
    'id',
    'pw',
  ];

  const myTotalSalesSummaryTab = [
    '전체신청',
    '상담전',
    '상담완료',
    '상담거절',
    '성공',
    '진행 중',
    '실패',
    '대출',
    '연구소',
    '벤처',
    '메인',
    '경정',
    '총 매출(천원)',
  ];
  const myTotalSalesSummaryCnt = [
    120, 100, 70, 30, 65, 5, 30, 50, 20, 15, 60, 10, 150000,
  ];

  const pathName = decodeURI(usePathname().split('/')[2]);

  // 더미 데이터

  const dummyData = [
    [
      '2023.09.01. 12:34:45',
      '미래자동차',
      '오태식',
      '010-1234-5678',
      '정보서비스업',
      '법인사업자',
      '10년 이상',
      '10억 이상',
      '5인 이상',
      '벤처기업, 이노비즈, 특허',
      '자가',
    ],
    [
      '2023.09.03. 01:02:03',
      '미래자동차',
      '오태식',
      '010-1234-5678',
      '정보서비스업',
      '법인사업자',
      '10년 이상',
      '10억 이상',
      '5인 이상',
      '벤처기업, 이노비즈, 특허',
      '자가',
    ],
  ];

  const [data, setData] = React.useState(dummyData);

  const handleOnDelete = (index: number) => {
    const updateData = [...data];
    updateData.splice(index, 1);
    setData(updateData);
  };

  return (
    <PageContainer
      title='Collapsible Table'
      description='this is Collapsible Table'
    >
      <ParentCard title={`${pathName}의  영업 현황`}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BlankCard>
              <TableContainer component={Paper}>
                <Table
                  aria-label='collapsible table'
                  sx={{
                    whiteSpace: {
                      xs: 'nowrap',
                      sm: 'unset',
                    },
                  }}
                >
                  <TableHead>
                    <GeneralTab arr={personalSalesTab} />
                  </TableHead>
                  <TableBody>
                    <GeneralTab arr={personalSalesData} />
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
                    aria-label='collapsible table'
                    sx={{
                      whiteSpace: {
                        xs: 'nowrap',
                        sm: 'unset',
                      },
                    }}
                  >
                    <TableHead>
                      <GeneralTab arr={myTotalSalesSummaryTab} />
                    </TableHead>
                    <TableBody>
                      <GeneralTab arr={myTotalSalesSummaryCnt} />
                    </TableBody>
                  </Table>
                </TableContainer>
              </BlankCard>
            </Box>
          </Grid>
          {data.map((item, idx) => {
            return (
              <Grid item xs={12} key={idx}>
                <ReportTable
                  customerInfoData={item}
                  onDelete={() => handleOnDelete(idx)}
                />
              </Grid>
            );
          })}
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default CollapsibleTable;

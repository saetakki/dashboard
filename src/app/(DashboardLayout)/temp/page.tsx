'use client';

import { Grid, Box, TableContainer, TableHead, Table } from '@mui/material';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import GeneralTab from '@/app/(DashboardLayout)/ui-components/tabs/GeneralTab';

const Test = () => {
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
  const customerInfoTab = [
    '업체명',
    '업체대표',
    '휴대폰',
    '업태',
    '사업자',
    '업력',
    '연매출',
    '4대보험',
    '인증항목',
    '사업자소유여부',
  ];

  const customerInfoData = [
    [
      'test1',
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
      'test2',
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

  return (
    <Grid item xs={12}>
      <Box>
        <BlankCard>
          <TableContainer>
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
                <GeneralTab arr={customerInfoTab} />
              </TableHead>
            </Table>
          </TableContainer>
        </BlankCard>
      </Box>
    </Grid>
  );
};

export default Test;

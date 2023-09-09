'use client';
import * as React from 'react';
import {
  Typography,
  Box,
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
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { usePathname, useSearchParams } from 'next/navigation';
import GeneralTab from '@/app/(DashboardLayout)/ui-components/tabs/GeneralTab';

import PersonalSelectionRow from '../../ui-components/tabs/PersonalSelectionRow';

interface SalesDataTableProps {
  companyName: string;
}

const SalesDataTable: React.FC<SalesDataTableProps> = (companyName) => {
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
    '실패',
    '대출',
    '연구소',
    '벤처',
    '메인',
    '경정',
    '총 매출(천원)',
  ];
  const myTotalSalesSummaryCnt = [
    120, 100, 70, 30, 65, 5, 50, 20, 15, 60, 10, 150000,
  ];

  const customerInfoTab = [
    '고객정보',
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

  const historyTab = [
    '고객정보',
    '상담전',
    '상담완료',
    '상담거절',
    '성공',
    '실패',
    '진행여부',
    '대출',
    '연구소',
    '벤처',
    '메인',
    '경정',
    '총 매출(천원)',
  ];

  return (
    <PageContainer
      title='Collapsible Table'
      description='this is Collapsible Table'
    >
      <ParentCard title={'영업 내역'}></ParentCard>
    </PageContainer>
  );
};

export default SalesDataTable;

'use client';

import React, { useState, useEffect } from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Grid,
  Pagination,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import GeneralTab from '@/app/(DashboardLayout)/ui-components/tabs/GeneralTab';

interface BaseTableProps {
  company: string;
  team: string;
}

const BaseTable: React.FC<BaseTableProps> = ({ company, team }) => {
  const teamInfoTab = [
    '리더',
    '번호',
    '도메인',
    '서브도메인',
    '회원수',
    '아이디',
    '비밀번호',
  ];

  const teamInfo = [
    '전제희&이재상',
    '010-4919-3230',
    'a.withinfo.kr',
    5,
    21,
    'id',
    'pw',
  ];

  const myTotalSalesSummaryCnt = [
    120, 100, 70, 30, 65, 5, 30, 50, 20, 15, 60, 10, 150000,
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

  const paginationTab = [
    '아이디',
    '이름',
    '전화번호',
    '총신청',
    '상담전',
    '상담중',
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

  interface DataItem {
    아이디: string;
    이름: string;
    전화번호: string;
    총신청: number;
    상담전: number;
    상담중: number;
    상담거절: number;
    성공: number;
    실패: number;
    대출: number;
    연구소: number;
    벤처: number;
    메인: number;
    경정: number;
    '총 매출(천원)': number;
  }

  const generateRandomPhoneNumber = () => {
    const generateFourDigits = () =>
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
    return `010-${generateFourDigits()}-${generateFourDigits()}`;
  };

  const createDummyData = (length: number): DataItem[] => {
    const data: DataItem[] = [];

    for (let i = 0; i < length; i++) {
      data.push({
        아이디: `아이디${i + 1}`,
        이름: `사용자${i + 1}`,
        전화번호: generateRandomPhoneNumber(),
        총신청: Math.floor(Math.random() * 100),
        상담전: Math.floor(Math.random() * 10),
        상담중: Math.floor(Math.random() * 10),
        상담거절: Math.floor(Math.random() * 10),
        성공: Math.floor(Math.random() * 100),
        실패: Math.floor(Math.random() * 100),
        대출: Math.floor(Math.random() * 10000),
        연구소: Math.floor(Math.random() * 10),
        벤처: Math.floor(Math.random() * 10),
        메인: Math.floor(Math.random() * 100),
        경정: Math.floor(Math.random() * 10),
        '총 매출(천원)': Math.floor(Math.random() * 100000),
      });
    }
    return data;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [dummyData, setDummyData] = useState<DataItem[]>([]);

  useEffect(() => {
    const dummy = createDummyData(50);
    setDummyData(dummy);
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setCurrentPage(value);
  };

  const ITEMS_PER_PAGE = 5;

  const getCurrentPageData = (): DataItem[] => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return dummyData.slice(start, end);
  };

  return (
    <PageContainer>
      {/* 팀 이름 들어갈 곳 */}
      <ParentCard title={`팀 이름 영업 현황`}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BlankCard>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <GeneralTab arr={teamInfoTab} />
                  </TableHead>
                  <TableBody>
                    <GeneralTab arr={teamInfo} />
                  </TableBody>
                </Table>
              </TableContainer>
            </BlankCard>
          </Grid>
          <Grid item xs={12}>
            <BlankCard>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <GeneralTab arr={myTotalSalesSummaryTab} />
                  </TableHead>
                  <TableBody>
                    <GeneralTab arr={myTotalSalesSummaryCnt} />
                  </TableBody>
                </Table>
              </TableContainer>
            </BlankCard>
          </Grid>
          <Grid item xs={12}>
            <BlankCard>
              <TableContainer
                component={Paper}
                sx={{ maxWidth: '100%', overflow: 'auto' }}
              >
                <Table>
                  <TableHead>
                    <GeneralTab arr={paginationTab} />
                  </TableHead>
                  <TableBody>
                    {getCurrentPageData().map((item, index) => (
                      <GeneralTab arr={Object.values(item)} key={index} />
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  count={10}
                  color='primary'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '16px 0',
                  }}
                  onChange={handlePageChange}
                />
              </TableContainer>
            </BlankCard>
          </Grid>
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default BaseTable;

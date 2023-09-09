'use client';
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
  Switch,
  List,
  Checkbox,
  Radio,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import { usePathname, useSearchParams } from 'next/navigation';
import GeneralTab from '@/app/(DashboardLayout)/ui-components/tabs/GeneralTab';
import { FormControlLabel } from '@mui/material';

const CollapsibleTable = () => {
  const checkboxes = ['진행여부', '대출', '연구소', '벤처', '메인', '경정'];

  const [checkedState, setCheckedState] = React.useState<{
    [key: string]: string | null;
  }>({
    진행여부: null,
    대출: null,
    연구소: null,
    벤처: null,
    메인: null,
    경정: null,
  });
  const [isOnProgress, setIsOnProgress] = React.useState([]);
  const [selected, setSelected] = React.useState<string | null>('상담전');

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

  const customerDataTab = [
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

  const pathName = decodeURI(usePathname().split('/')[2]);
  const [open, setOpen] = React.useState(false);

  {
    /* 더미 데이터 */
  }

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

  const historyTab = [
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
          {customerInfoData.map((item, idx) => {
            return (
              <Grid item xs={12} key={item[0]}>
                <Box>
                  <BlankCard>
                    <div style={{ display: 'flex' }}>
                      {selected === '상담전' && (
                        <div
                          style={{
                            display: 'flex',
                            textAlign: 'center',
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: '#0bb2fb',
                              writingMode: 'vertical-rl',
                              textOrientation: 'upright',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          >
                            신규
                          </span>
                        </div>
                      )}
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
                            <GeneralTab arr={customerInfoTab} />
                          </TableHead>
                          <TableHead>
                            <GeneralTab arr={item} />
                          </TableHead>
                        </Table>
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
                            <GeneralTab arr={historyTab} />
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              {historyTab.map((item, idx) => {
                                if (idx >= 0 && idx <= 4) {
                                  // 체크박스 1개 형태
                                  return (
                                    <TableCell key={idx} align='center'>
                                      <Checkbox
                                        color='primary'
                                        checked={selected === item}
                                        onChange={() => setSelected(item)}
                                      />
                                    </TableCell>
                                  );
                                } else if (idx >= 5 && idx <= 10) {
                                  // 체크박스 2개 형태
                                  return (
                                    <TableCell key={item} align='center'>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column-reverse',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <FormControlLabel
                                          sx={{ margin: 'auto' }}
                                          control={
                                            <Checkbox
                                              checked={
                                                checkedState[item] === '진행중'
                                              }
                                              onChange={() => {
                                                setCheckedState((prev) => ({
                                                  ...prev,
                                                  [item]: !prev[item]
                                                    ? '진행중'
                                                    : null,
                                                }));
                                              }}
                                            />
                                          }
                                          label=''
                                        />
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            marginBottom: '4px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          진행중
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <FormControlLabel
                                          sx={{ margin: 'auto' }}
                                          control={
                                            <Checkbox
                                              checked={
                                                checkedState[item] === '완료'
                                              }
                                              onChange={() => {
                                                setCheckedState((prev) => ({
                                                  ...prev,
                                                  [item]: !prev[item]
                                                    ? '완료'
                                                    : null,
                                                }));
                                              }}
                                            />
                                          }
                                          label=''
                                        />
                                        <span
                                          style={{
                                            fontSize: '12px',
                                            marginTop: '4px',
                                            textAlign: 'left',
                                          }}
                                        >
                                          완료
                                        </span>
                                      </div>
                                    </TableCell>
                                  );
                                }
                                return null;
                              })}
                              <TableCell align='center'>23989</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </BlankCard>
                </Box>
              </Grid>
            );
          })}
          {/* <Grid item xs={12}>
            <Box>
              <BlankCard>
                <div style={{ display: 'flex' }}>
                  {selected === '상담전' && (
                    <div
                      style={{
                        display: 'flex',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: '#0bb2fb',
                          writingMode: 'vertical-rl',
                          textOrientation: 'upright',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        신규
                      </span>
                    </div>
                  )}
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
                        <GeneralTab arr={customerInfoTab} />
                      </TableHead>
                      <TableHead>
                        <GeneralTab arr={customerInfoData[0]} />
                      </TableHead>
                    </Table>
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
                        <GeneralTab arr={historyTab} />
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {historyTab.map((item, idx) => {
                            if (idx >= 0 && idx <= 4) {
                              // 체크박스 1개 형태
                              return (
                                <TableCell key={idx} align='center'>
                                  <Checkbox
                                    color='primary'
                                    checked={selected === item}
                                    onChange={() => setSelected(item)}
                                  />
                                </TableCell>
                              );
                            } else if (idx >= 5 && idx <= 10) {
                              // 체크박스 2개 형태
                              return (
                                <TableCell key={item} align='center'>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column-reverse',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <FormControlLabel
                                      sx={{ margin: 'auto' }}
                                      control={
                                        <Checkbox
                                          checked={
                                            checkedState[item] === '진행중'
                                          }
                                          onChange={() => {
                                            setCheckedState((prev) => ({
                                              ...prev,
                                              [item]: !prev[item]
                                                ? '진행중'
                                                : null,
                                            }));
                                          }}
                                        />
                                      }
                                      label=''
                                    />
                                    <span
                                      style={{
                                        fontSize: '12px',
                                        marginBottom: '4px',
                                        textAlign: 'left',
                                      }}
                                    >
                                      진행중
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <FormControlLabel
                                      sx={{ margin: 'auto' }}
                                      control={
                                        <Checkbox
                                          checked={
                                            checkedState[item] === '완료'
                                          }
                                          onChange={() => {
                                            setCheckedState((prev) => ({
                                              ...prev,
                                              [item]: !prev[item]
                                                ? '완료'
                                                : null,
                                            }));
                                          }}
                                        />
                                      }
                                      label=''
                                    />
                                    <span
                                      style={{
                                        fontSize: '12px',
                                        marginTop: '4px',
                                        textAlign: 'left',
                                      }}
                                    >
                                      완료
                                    </span>
                                  </div>
                                </TableCell>
                              );
                            }
                            return null;
                          })}
                          <TableCell align='center'>23989</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </BlankCard>
            </Box>
          </Grid> */}
        </Grid>
      </ParentCard>
    </PageContainer>
  );
};

export default CollapsibleTable;

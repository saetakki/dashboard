'use client';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCompanies } from '@/store/companySlice';
import { RootState } from '@/store/store';
import { Grid, Box } from '@mui/material';

import CompanyNamesTabs from '@/app/(DashboardLayout)/ui-components/tabs/CompaniesNameTabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Breadcrumb from '../layout/shared/breadcrumb/Breadcrumb';
import ReportTable from '../ui-components/tables/ReportTable';
import ParentCard from '../components/shared/ParentCard';

import NoData from '../components/tables/NoData';
import BaseTable from '../components/tables/BaseTable';

const CompanyDashboard = () => {
  const companies = useSelector((state: RootState) => state.company.companies);
  const [value, setValue] = useState('1');
  const [team, setTeam] = useState('1');
  const [currentCompany, setCurrentCompany] = useState(companies[0].label); // 현재 선택된 회사 이름
  const teamLeaderList =
    useSelector(selectCompanies).teamLeadersByCompany[currentCompany];

  const onTeamChangeHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const target = (event.target as HTMLElement).textContent?.split(' ')[1];
    setTeam(target || '1');
  };

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: `${currentCompany}`,
    },
  ];

  const teamInfoTab = [
    '리더',
    '번호',
    '도메인',
    '서브도메인수',
    '회원수',
    '아이디',
    '비밀번호',
  ];

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
    [
      '2023.09.04. 14:22:13',
      '테크노로지',
      '이정훈',
      '010-5678-1234',
      '제조업',
      '개인사업자',
      '5년 이하',
      '5억 이상',
      '10인 이상',
      '벤처기업',
      '임차',
    ],
    [
      '2023.09.05. 09:45:26',
      '이노베이션',
      '박지민',
      '010-4321-8765',
      'IT서비스업',
      '법인사업자',
      '2년 이상',
      '3억 이상',
      '3인 이상',
      '특허',
      '자가',
    ],
    [
      '2023.09.06. 18:53:47',
      '데이터솔루션',
      '김태리',
      '010-8888-8888',
      '정보보안업',
      '법인사업자',
      '3년 이상',
      '7억 이상',
      '8인 이상',
      '이노비즈',
      '자가',
    ],
    [
      '2023.09.07. 07:30:29',
      'AI테크',
      '정유미',
      '010-4444-4444',
      'AI개발업',
      '개인사업자',
      '1년 이하',
      '1억 이상',
      '2인 이상',
      '벤처기업, 특허',
      '임차',
    ],
    [
      '2023.09.08. 11:11:11',
      '클라우드서비스',
      '최우식',
      '010-9999-9999',
      '클라우드서비스업',
      '법인사업자',
      '8년 이상',
      '20억 이상',
      '15인 이상',
      '이노비즈',
      '자가',
    ],
  ];

  const [data, setData] = useState(dummyData);

  const handleOnDelete = (index: number) => {
    const updateData = [...data];
    updateData.splice(index, 1);
    setData(updateData);
  };

  return (
    <div style={{ width: '100%' }}>
      <h1>기업별 보기</h1>
      <ParentCard title={''}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box>
              <TabContext value={value}>
                <CompanyNamesTabs
                  setCurrentCompany={setCurrentCompany}
                  value={value}
                  setValue={setValue}
                  isAddable={false}
                />
                <Breadcrumb title={`${currentCompany}`} items={BCrumb} />
              </TabContext>
              <TabContext value={team}>
                <TabList>
                  {teamLeaderList && teamLeaderList.length
                    ? teamLeaderList.map((teamLeader, index) => (
                        <Tab
                          key={index}
                          // 팀명이 들어갈 위치
                          label={`팀 ${index + 1}`}
                          value={String(index + 1)}
                          onClick={onTeamChangeHandler}
                        />
                      ))
                    : null}
                </TabList>
                `
                {/* <TableHead>
                  <GeneralTab arr={teamInfoTab} />
                </TableHead> */}
                {teamLeaderList && teamLeaderList.length ? (
                  teamLeaderList.map((teamLeader, index) => (
                    <TabPanel key={index} value={String(index + 1)}>
                      <BaseTable
                        company={currentCompany}
                        team={String(index + 1)}
                      />
                    </TabPanel>
                  ))
                ) : (
                  <NoData />
                )}
              </TabContext>
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
    </div>
  );
};

export default CompanyDashboard;

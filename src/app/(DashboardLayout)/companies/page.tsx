'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, selectCompanies } from '@/store/companySlice';
import { RootState } from '@/store/store';
import { Grid, Box, TableRow, TableCell, Typography } from '@mui/material';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProductPerfomance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import { dummyPerformance } from '@/app/(DashboardLayout)/dummy/dummyData';

import CompanyNamesTabs from '@/app/(DashboardLayout)/ui-components/tabs/CompaniesNameTabs';
import MainboardTeamLeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/MainboardTeamLeaderTab';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Breadcrumb from '../layout/shared/breadcrumb/Breadcrumb';
import ParentCard from '../components/shared/ParentCard';
import { set } from 'lodash';
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
                          label={`팀 ${index + 1}`}
                          value={String(index + 1)}
                          onClick={onTeamChangeHandler}
                        />
                      ))
                    : null}
                </TabList>
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
          <Grid item xs={12}></Grid>
        </Grid>
      </ParentCard>
    </div>
  );
};

export default CompanyDashboard;

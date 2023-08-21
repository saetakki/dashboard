'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, selectCompanies } from '@/store/companySlice'
import { RootState} from '@/store/store';
import { Grid, 
  Box, 
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProductPerfomance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import { dummyPerformance } from '@/app/(DashboardLayout)/dummy/dummyData';

import CompanyNamesTabs from '@/app/(DashboardLayout)/ui-components/tabs/CompaniesNameTabs';
import MainboardTeamLeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/MainboardTeamLeaderTab';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Breadcrumb from '../layout/shared/breadcrumb/Breadcrumb';
import BaseTable from '@/app/(DashboardLayout)/components/tables/baseTable';
import NoData from '@/app/(DashboardLayout)/components/tables/noData';
import { current } from '@reduxjs/toolkit';



const CompanyDashboard = () => {

  const companies = useSelector((state: RootState) => state.company.companies);
  const [value, setValue] = useState('1');
  const [currentCompany, setCurrentCompany] = useState(companies[0].label); // 현재 선택된 회사 이름
  const addCompanyValue = (companies.length + 1).toString();
  const teamLeaderList = useSelector(selectCompanies).teamLeadersByCompany[currentCompany] 
  const salarySummayByTeam = useSelector(selectCompanies).salesData[currentCompany]


  const handleValueChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== addCompanyValue) {
      setValue(newValue);
    }
  };

  const handleCompanyChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;
    setCurrentCompany(target.innerText);
  };



  console.log(teamLeaderList)

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
  <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TabContext value={value}>
                <CompanyNamesTabs
                  setCurrentCompany={setCurrentCompany} 
                  value={value}
                  setValue={setValue}
                  isAddable={false}
                />
                <Breadcrumb title={`${currentCompany}`} items={BCrumb} />
                {teamLeaderList ? teamLeaderList.map((teamLeader, index) => (
                  <BaseTable key={index} company={currentCompany} team={String(index+1)}/>
                ))
                : <NoData/>
              }
            </TabContext>
            </Grid>
          <Grid item xs={12}>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
  )
}


export default CompanyDashboard;

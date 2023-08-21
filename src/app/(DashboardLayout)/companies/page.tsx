'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, selectCompanies } from '@/store/companySlice'
import { RootState} from '@/store/store';
import { Grid, 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
} from '@mui/material';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ProductPerfomance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import { dummyPerformance } from '@/app/(DashboardLayout)/dummy/dummyData';

import MainboardTeamLeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/MainboardTeamLeaderTab';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TableFrame from '@/app/(DashboardLayout)/tables/basic/page';
import { current } from '@reduxjs/toolkit';

const CompanyDashboard = () => {

  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const [value, setValue] = useState('1');
  const [currentCompany, setCurrentCompany] = useState(companies[0].label); // 현재 선택된 회사 이름
  const addCompanyValue = (companies.length + 1).toString();
  const teamLeaderList = useSelector(selectCompanies).teamLeadersByCompany[currentCompany] 
  const salarySummayByTeam = useSelector(selectCompanies).salesData[currentCompany]

  console.log(salarySummayByTeam)


  const handleValueChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== addCompanyValue) {
      setValue(newValue);
    }
  };

  const handleCompanyChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;
    setCurrentCompany(target.innerText);
  };




  console.log(useSelector(selectCompanies).salesData[currentCompany]?.[0] || undefined)
  


  return (        
  <PageContainer title="Dashboard" description="this is Dashboard">
  <Box mt={3}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TabContext value={value}>
          <Box display="flex" flexDirection="column" alignItems="start">
            {/* 전체 회사 목록을 출력하는 함수 */}
            <TabList onChange={handleValueChange}>
                {companies.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} onClick={handleCompanyChange}/>
                ))}
            </TabList>
          </Box>
          {/* 팀별 팀장 목록을 출력하는 함수 */}
          {teamLeaderList ? teamLeaderList.map((teamLeader,idx) => (
            <TableFrame key={idx} tab={currentCompany} team={teamLeader.관리번호} />
          )) : null}
          <ProductPerfomance data={salarySummayByTeam} tab={currentCompany}/>
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

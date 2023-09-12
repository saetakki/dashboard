'use client';
import * as XLSX from 'xlsx';
import '../global.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Grid, Box, Button } from '@mui/material';

import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import MainboardTeamLeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/MainboardTeamLeaderTab';
import CompaniesNameTabs from './ui-components/tabs/CompaniesNameTabs';
import onExcelExportHandler from './components/dashboard/onExcelExportHandler';
import AllIndividualSalary from './components/tables/AllIndividualSalary';

const Dashboard = () => {
  const companies = useSelector(
    (state: RootState) => state.company.companies || []
  );
  const teamLeadersByCompany = useSelector(
    (state: RootState) => state.company.teamLeadersByCompany || {}
  );
  const salesDataByCompany = useSelector(
    (state: RootState) => state.company.salesData || {}
  );
  const [value, setValue] = useState('1');
  const [currentCompany, setCurrentCompany] = useState(
    companies && companies.length > 0 ? companies[0].label : ''
  );

  const onClickExportButtonHandler = () => {
    onExcelExportHandler({
      currentCompany,
      teamLeadersByCompany,
      salesDataByCompany,
    });
  };

  return (
    <PageContainer title='Dashboard' description='this is Dashboard'>
      <Button onClick={onClickExportButtonHandler}>엑셀로 만들기</Button>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box display='flex' flexDirection='column' alignItems='start'>
                {/* 전체 회사 목록을 출력하는 함수 */}
                <CompaniesNameTabs
                  setCurrentCompany={setCurrentCompany}
                  value={value}
                  setValue={setValue}
                  isAddable={true}
                />

                {/* 회사별 상세 정보를 출력하는 함수 */}
                <Box bgcolor='grey.200' mt={2} width={'100%'}>
                  {companies.map((tab, index) => (
                    <TabPanel key={tab.value} value={tab.value.toString()}>
                      <MainboardTeamLeaderTab tabs={tab.label} auth={'auth'} />
                    </TabPanel>
                  ))}
                </Box>
              </Box>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            <AllIndividualSalary company={currentCompany} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;

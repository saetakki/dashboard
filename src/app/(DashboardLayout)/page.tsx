'use client'
import * as XLSX from 'xlsx';
import { use, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, selectCompanies } from '../../store/companySlice'
import { RootState} from '../../store/store';
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
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import { dummyPerformance } from '@/app/(DashboardLayout)/dummy/dummyData';


import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MainboardTeamLeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/MainboardTeamLeaderTab';
import FormDialog from './ui-components/dialog/FormDialog';
import CompaniesNameTabs from './ui-components/tabs/CompaniesNameTabs';
import onExcelExportHandler from './components/dashboard/onExcelExportHandler';



const Dashboard = () => {

  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies || []);
  const teamLeadersByCompany = useSelector((state: RootState) => state.company.teamLeadersByCompany || {});
  const salesDataByCompany = useSelector((state: RootState) => state.company.salesData || {});
  const [value, setValue] = useState('1');
  const [currentCompany, setCurrentCompany] = useState(companies && companies.length > 0 ? companies[0].label : '');
  const currentCompanyTotalSalesData = useSelector(selectCompanies)?.salesData?.[currentCompany]
  

  const tmp = useSelector(selectCompanies)
  const currentCompanies = useSelector(selectCompanies).companies.map((item) => item.label);  
  const headers = ['관리번호', '팀', '팀장', '번호', '도메인', '서브도메인수', '회원수', '아이디', '비밀번호'];
  // const teamLeaders = useSelector(selectCompanies).teamLeadersByCompany[currentCompany];
  const teamLeaders = useSelector(selectCompanies).teamLeadersByCompany;

  const onClickExportButtonHandler = () => {
    onExcelExportHandler({ currentCompany, teamLeadersByCompany, salesDataByCompany });
  }




  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Button onClick={onClickExportButtonHandler}>엑셀로 만들기</Button>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box display="flex" flexDirection="column" alignItems="start">
                {/* 전체 회사 목록을 출력하는 함수 */}
                <CompaniesNameTabs 
                    setCurrentCompany={setCurrentCompany} 
                    value={value}
                    setValue={setValue}
                    isAddable={true}
                  />

                {/* 회사별 상세 정보를 출력하는 함수 */}               
                <Box bgcolor="grey.200" mt={2} width={"100%"}>
                  {companies.map((tab, index) => (
                    <TabPanel key={tab.value} value={tab.value.toString()}> 
                      <MainboardTeamLeaderTab tabs={tab.label} auth={"auth"}/>
                    </TabPanel>
                  ))}
                </Box>
              </Box>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            {/* 회사 팀별 매출 정보를 출력하는 함수 */}
            <ProductPerformance data={currentCompanyTotalSalesData} tab={currentCompany}/>

          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}


export default Dashboard;

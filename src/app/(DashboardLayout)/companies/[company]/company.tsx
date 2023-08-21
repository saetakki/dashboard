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


import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CompanyTabs from '@/app/(DashboardLayout)/ui-components/tabs/MainboardTeamLeaderTab';
// import TableFrame from '../../tables/basic/page';
import MainboardTeamLeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/MainboardTeamLeaderTab';
import CompaniesNameTabs from '../../ui-components/tabs/CompaniesNameTabs';


const CompanyDashboard = () => {

  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const [value, setValue] = useState('1');
  const [currentCompany, setCurrentCompany] = useState(companies[0].label); // 현재 선택된 회사 이름
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const addCompanyValue = (companies.length + 1).toString();

  console.log(useSelector(selectCompanies))




  const handleValueChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== addCompanyValue) {
      setValue(newValue);
    }
  };

  console.log(currentCompany, companies)

  const handleCompanyChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLButtonElement;
    setCurrentCompany(target.innerText);
  };


  const handleDialogOpen = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleAddCompany = () => {
    if (newCompanyName.trim() !== "") {
        const newValue = (companies.length -1).toString() // Get next value based on the length of tabs
        const newTab = { value: newValue, label: newCompanyName.trim() };
        dispatch(addCompany(newTab)); // Redux store에 회사 추가
        handleDialogOpen();
    }
  };




  return (
        <PageContainer title="Dashboard" description="this is Dashboard">
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
                    isAddable={false}
                  />
                    {/* <TabList onChange={handleValueChange}>
                        {companies.map((tab) => (
                          <Tab key={tab.value} label={tab.label} value={tab.value} onClick={handleCompanyChange}/>
                        ))}
                    </TabList> */}

                    {/* 회사별 상세 정보를 출력하는 함수 */}               
                    <Box bgcolor="grey.200" mt={2} width={"100%"}>
                      {companies.map((tab,index) => (
                        <TabPanel key={index} value={tab.value}>
                          <MainboardTeamLeaderTab tabs={tab.label} auth={"auth"}/>
                          {/* <ProductPerfomance data={dummyPerformance[companies[parseInt(value)-1].label]} tab={currentCompany}/> */}
                        </TabPanel>
                      ))}
                    </Box>
                  </Box>
                </TabContext>
              </Grid>
              <Grid item xs={12}>
                {/* {console.log(dummyPerformance[companies[parseInt(value)-1].label])} */}
                {/* <ProductPerfomance data={dummyPerformance[companies[parseInt(value)-1].label]} tab={currentCompany}/> */}
              </Grid>
            </Grid>
          </Box>
        </PageContainer>
  )
}


export default CompanyDashboard;

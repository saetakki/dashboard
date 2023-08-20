'use client'
import { useState } from 'react';
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
import CompanyTabs from '@/app/(DashboardLayout)/ui-components/companyTabs/CompanyTab';
import { is } from 'immer/dist/internal.js';
import SimpleDialog from './ui-components/dialog/SimpleDialog';
import FormDialog from './ui-components/dialog/FormDialog';


const Dashboard = () => {

  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies || []);
  const [value, setValue] = useState('1');
  const [currentCompany, setCurrentCompany] = useState(companies && companies.length > 0 ? companies[0].label : '');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const addCompanyValue = (companies.length + 1).toString();
  const currentCompanySalesData = useSelector(selectCompanies)?.salesData?.[currentCompany]?.[0] || null;



  
  console.log(currentCompanySalesData, companies)


  const handleValueChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
};

const handleCompanyChange = (event: React.SyntheticEvent) => {
  const target = event.target as HTMLButtonElement;
  setCurrentCompany(target.innerText);
};

const handleNewCompanyAddition = (name: string) => {
  const newValue = (companies.length + 1).toString();  // Fix the value assignment
  const newTab = { value: newValue, label: name.trim() };
  dispatch(addCompany(newTab));
}

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box display="flex" flexDirection="column" alignItems="start">
                {/* 전체 회사 목록을 출력하는 함수 */}
                <TabList onChange={handleValueChange}>
                    {companies.map((tab, index) => (
                      <Tab key={tab.value} label={tab.label} value={tab.value.toString()} onClick={handleCompanyChange}/> 
                    ))}
                    <FormDialog onAdd={handleNewCompanyAddition} />
                </TabList>

                {/* 회사별 상세 정보를 출력하는 함수 */}               
                <Box bgcolor="grey.200" mt={2} width={"100%"}>
                  {companies.map((tab, index) => (
                    <TabPanel key={tab.value} value={tab.value.toString()}> 
                      <CompanyTabs tabs={tab.label} auth={"auth"} add={true}/>
                    </TabPanel>
                  ))}
                </Box>
              </Box>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            {/* {console.log(dummyPerformance[companies[parseInt(value)-1].label])} */}
            <ProductPerformance data={currentCompanySalesData ? [currentCompanySalesData] : []} tab={currentCompany}/>

          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}


export default Dashboard;

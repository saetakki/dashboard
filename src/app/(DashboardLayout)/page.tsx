'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany } from '../../store/companySlice'
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
import ProductPerfomance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import { dummyPerformance } from '@/app/(DashboardLayout)/dummy/dummyData';


import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CompanyTabs from '@/app/(DashboardLayout)/ui-components/companyTabs/CompanyTab';


const Dashboard = () => {

  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const [value, setValue] = useState('1');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const addCompanyValue = (companies.length + 1).toString();


  const handleValueChange = (event: React.SyntheticEvent, newValue: string) => {
    // setValue(newValue);
    if (newValue !== addCompanyValue) {
      setValue(newValue);
    }
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
                <TabList onChange={handleValueChange}>
                    {companies.map((tab) => (
                      <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                    <Tab label='회사 추가' value={addCompanyValue} onClick={handleDialogOpen} style={{color:"#03c9d7", fontWeight:"800"}}/>
                    <Dialog open={isDialogOpen} onClose={handleDialogOpen}>
                        <DialogTitle>회사 이름 추가</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            label="회사 이름"
                            type="text"
                            fullWidth
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleDialogOpen} color="primary">
                            취소
                          </Button>
                          <Button onClick={handleAddCompany} color="primary">
                            추가
                          </Button>
                        </DialogActions>
                      </Dialog>
                </TabList>

                {/* 회사별 상세 정보를 출력하는 함수 */}               
                <Box bgcolor="grey.200" mt={2} width={"100%"}>
                  {companies.map((tab,index) => (
                    <TabPanel key={index} value={tab.value}>
                      <CompanyTabs tabs={tab.label} auth={"auth"} />
                    </TabPanel>
                  ))}
                </Box>
              </Box>
            </TabContext>
          </Grid>
          <Grid item xs={12}>
            {/* {console.log(dummyPerformance[companies[parseInt(value)-1].label])} */}
            <ProductPerfomance data={dummyPerformance[companies[parseInt(value)-1].label]}/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}


export default Dashboard;

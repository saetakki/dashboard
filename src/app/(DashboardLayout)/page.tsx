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

  // console.log(currentCompanies)
  // currentCompanies.map((item) =>{
  //   console.log(teamLeaders[item])
  // })


console.log(teamLeadersByCompany[currentCompany])




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


  const handleExport = () => {
    const wb = XLSX.utils.book_new();
  
    const titleRow = [currentCompany];
    const head = headers;
    const dataRows = teamLeadersByCompany[currentCompany]?.map(obj => Object.values(obj)) || [];
  
    // 계산된 합계 값들을 저장할 배열
    let sumSubdomain = 0;
    let sumMembers = 0;
  
    dataRows.forEach(row => {
      sumSubdomain += Number(row[5]); // '서브도메인수'가 6번째 열에 있기 때문에 인덱스는 5
      sumMembers += Number(row[6]); // '회원수'가 7번째 열에 있기 때문에 인덱스는 6
    });
  
    const summaryRow = [
      '', '합계', '', '', '', 
      sumSubdomain, 
      sumMembers,
      0, 0
    ];
  
    const salesHeader = ["관리번호","팀","전체신청","상담전","상담완료","상담거절","성공","실패","대출","연구소","벤처","메인","경정","총매출"];
    const salesData = salesDataByCompany[currentCompany]?.map(obj => Object.values(obj)) || [];
  
  const salesSums = salesHeader.map((_, colIdx) => {
    if(colIdx === 0) return '';            // 관리번호에 해당하는 열
    if(colIdx === 1) return '합계';        // 팀에 해당하는 열
    return salesData.reduce((acc, currRow) => acc + (Number(currRow[colIdx]) || 0), 0);
  });


    const allData = [
      titleRow,
      head,
      ...dataRows,
      summaryRow,
      [], // 빈 행
      salesHeader,
      ...salesData,
      salesSums
    ];

    const ws = XLSX.utils.aoa_to_sheet(allData);
    
    // 병합과 스타일 적용
    // if (!ws['!merges']) ws['!merges'] = [];
    // const lastRowIndexBeforeSales = titleRow.length + head.length + dataRows.length + 1; // +1 for summaryRow
    // ws['!merges'].push({s: {r: lastRowIndexBeforeSales, c: 1}, e: {r: lastRowIndexBeforeSales, c: 4}});

    if (!ws['!merges']) ws['!merges'] = [];
    const lastRowIndexForData = titleRow.length + 1 + dataRows.length; 
    console.log(lastRowIndexForData)

    // 누적합 행의 인덱스
    // 병합
    const mergeRange = {s: {r: lastRowIndexForData, c: 1}, e: {r: lastRowIndexForData, c: 4}};
    ws['!merges'].push(mergeRange);




    XLSX.utils.book_append_sheet(wb, ws, `${currentCompany}`);
    XLSX.writeFile(wb, `${currentCompany}.xlsx`);
  }




  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Button onClick={handleExport}>엑셀로 만들기</Button>
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

import React, { useState } from 'react'; // Import React
import { useSelector, useDispatch } from 'react-redux';
import { addCompany } from  '../../../../store/companySlice'
import {Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField, Typography
} from '@mui/material';
import { RootState } from '../../../../store/store';
import { addTeamLeader, TeamLeader } from '../../../../store/companySlice';

type CompanyTabsProps = {
  tabs: string;
  auth: string;
};

const SalesDashboard: React.FC<CompanyTabsProps> = ({ tabs, auth }) => {
  const dispatch = useDispatch();
  const teamLeaders = useSelector((state: RootState) => state.company.teamLeadersByCompany[tabs]);
  const salesData = useSelector((state: RootState) => state.company.salesData);

  const [open, setOpen] = useState(false);

  // Handle input change function
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // You might want to do something with the input value here
  };

  const newManagingNumber = () => {
    const maxExistingId = teamLeaders?.reduce((maxId, leader) => {
      const currentId = parseInt(leader.관리번호, 10);
      return currentId > maxId ? currentId : maxId;
    }, 0) || 0;
  
    // 최대값에서 1 더한 값을 새로운 팀 리더의 관리번호로 설정
    const newLeaderId = (maxExistingId + 1).toString();
    return newLeaderId;
  };

  const headers = ['관리번호', '팀', '전체신청', '상담전', '상담완료', '상담거절', '성공', '실패', '대출', '연구소', '벤처', '메인', '경정', '총매출'];

  return (
    <Box mt={1}>
      <Grid container spacing={2}> {/* Reduced spacing for better visualization */}
        <Grid item xs={12}>
          <Table sx={{ width: '100%', marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData[tabs]?.map((row: any, index: number) => (
                <TableRow key={index}>
                  {headers.map((header, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {row[header]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="body2" sx={{ width: '200px', marginTop: '10px' }}>
            *총매출 = 천원단위
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesDashboard;

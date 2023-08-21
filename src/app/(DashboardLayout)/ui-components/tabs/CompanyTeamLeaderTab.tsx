import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField, Typography
} from '@mui/material';
import { RootState } from '../../../../store/store';
import { addTeamLeader, TeamLeader } from '../../../../store/companySlice';

type CompanyTabsProps = {
  tabs: string;
  auth: string;
};

const MainboardTeamLeaderTab: React.FC<CompanyTabsProps> = ({ tabs, auth }) => {

  const dispatch = useDispatch();
  const teamLeaders = useSelector((state: RootState) => state.company.teamLeadersByCompany[tabs]);
  const [open, setOpen] = useState(false);

  const newManagingNumber = () => {
    const maxExistingId = teamLeaders?.reduce((maxId, leader) => {
      const currentId = parseInt(leader.관리번호, 10);
      return currentId > maxId ? currentId : maxId;
    }, 0) || 0;
  
    // 최대값에서 1 더한 값을 새로운 팀 리더의 관리번호로 설정
    const newLeaderId = (maxExistingId + 1).toString();
    return newLeaderId;
  }



  const headers = ['관리번호', '팀', '팀장', '번호', '도메인', '서브도메인수', '회원수', '아이디', '비밀번호'];

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Table sx={{ width: '100%'}}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {teamLeaders ? teamLeaders.map((row: any, index: number) => (
              <TableRow key={index}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>{String(row[header])}</TableCell>
                ))}
              </TableRow>
            )) : null }
          </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainboardTeamLeaderTab;

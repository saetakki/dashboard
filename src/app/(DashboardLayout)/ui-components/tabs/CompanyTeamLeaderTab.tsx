import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField, Typography
} from '@mui/material';
import { RootState } from '../../../../store/store';
import { addTeamLeader, TeamLeader } from '../../../../store/companySlice';

type CompanyTabsProps = {
  tabs: string;
  team: string;
  auth: string;
};

const CompanyTeamLeaderTab: React.FC<CompanyTabsProps> = ({ tabs, team, auth }) => {

  
  const dispatch = useDispatch();
  const teamLeader = useSelector((state: RootState) => state.company.teamLeadersByCompany[tabs][Number(team)-1]);
  const teamLeaderInfo = Object.values(teamLeader)
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(!open);
  }

  const headers = ['관리번호', '팀', '팀장', '번호', '도메인', '서브도메인수', '회원수', '아이디', '비밀번호'];

  return (
    <Box mt={1}>
      <Grid container spacing={10}>
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
              <TableRow>
                {teamLeader ? teamLeaderInfo.map((row: any, index: number) => (
                  <TableCell key={index}>{String(row)}</TableCell>
                )) : null }
              </TableRow>
              {/* {teamLeaders ? teamLeaders.map((row: any, index: number) => (
                <TableRow key={index}>
                  {headers.map((header, cellIndex) => (
                    <TableCell key={cellIndex}>{String(row[header])}</TableCell>
                  ))}
                </TableRow>
              )) : null } */}
          </TableBody>
          </Table>   
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyTeamLeaderTab;

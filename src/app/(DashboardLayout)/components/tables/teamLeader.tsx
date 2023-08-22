import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  TableHead,
  Chip,
  Box,
  AvatarGroup,
} from '@mui/material';
import BlankCard from '../shared/BlankCard';
import { basicsTableData, TableType } from './tableData';
import { Stack } from '@mui/system';
import TableHeaderTab from '@/app/(DashboardLayout)/ui-components/tabs/TableHeaderTab';

const basics: TableType[] = basicsTableData;

interface TeamLeaderProps {
  company: string;
  team: string;
}

const TeamLeader: React.FC<TeamLeaderProps> = ({ company, team })=> {

  type TeamLeader = {
    관리번호: string;
    팀: string;
    팀장: string;
    번호: string;
    도메인: string;
    서브도메인수: string;
    회원수: string;
    아이디: string;
    비밀번호: string;
    [key: string]: string; // 이 부분을 추가합니다.
  };


  const teamLeaders: TeamLeader[] = useSelector((state: RootState) => state.company.teamLeadersByCompany[company]);
  const leaderKeys =['관리번호','팀','팀장','번호','도메인','서브도메인수','회원수','아이디','비밀번호'];
  const target = teamLeaders?.filter((leader) => leader.팀 === team);

  return (
    <BlankCard>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {leaderKeys.map((header) => (
                <TableCell key={header} align="center">
                  {header}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {target?.map((leader) => (
              <TableRow key={leader.관리번호}>
                {leaderKeys.map((key) => (
                  <TableCell align="center" key={key}>{leader[key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default TeamLeader;

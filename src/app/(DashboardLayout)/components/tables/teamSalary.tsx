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
import { selectCompanies } from '@/store/companySlice';

const basics: TableType[] = basicsTableData;

interface TeamSalaryProps {
  company: string;
  team: string;
}

const TeamSalary: React.FC<TeamSalaryProps> = ({ company, team })=> {

  type SalesData = {
    관리번호: number;
    팀: number;
    전체신청: number;
    상담전: number;
    상담완료: number;
    상담거절: number;
    성공: number;
    실패: number;
    대출: number;
    연구소: number;
    벤처: number;
    메인: number;
    경정: number;
    총매출: number;
    [key: string]: number;
  };



  const salesData: SalesData[] = useSelector((state: RootState) => state.company.salesData[company]);
  const target = salesData?.filter((leader) => String(leader.팀) === team)[0];
  const salesKeys = ['관리번호','팀','전체신청','상담전','상담완료','상담거절','성공','실패','대출','연구소','벤처','메인','경정','총매출'];



  return (

    <BlankCard>
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              {salesKeys.map((header) => (
                <TableCell key={header} align="center">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={target.관리번호}>
              {salesKeys.map((key) => (
                <TableCell align="center" key={key}>{target[key]}</TableCell>
              ))}
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default TeamSalary;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from '@mui/material';
import { RootState } from '../../../../store/store';
import { TeamLeader, SalesData } from '@/store/companySlice';

interface TableHeaderTabProps {
  isForTeamLeader: boolean;
}

const TableHeaderTab: React.FC<TableHeaderTabProps> = ({ isForTeamLeader }) => {

  // TeamLeader와 SalesData의 키 값을 동적으로 가져옵니다.
  const leaderKeys =['관리번호','팀','팀장','번호','도메인','서브도메인수','회원수','아이디','비밀번호'];
  const salesKeys = ['관리번호','팀','전체신청','상담전','상담완료','상담거절','성공','실패','대출','연구소','벤처','메인','경정','총매출'];

  // isForTeamLeader 값에 따라 headers에 대입
  const headers = isForTeamLeader ? leaderKeys : salesKeys;

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
              {headers.map((header) => (
                <TableCell key={header} align="center">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>      
  );
};

export default TableHeaderTab;

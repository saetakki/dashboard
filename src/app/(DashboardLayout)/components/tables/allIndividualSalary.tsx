import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import BlankCard from '../shared/BlankCard';
import { basicsTableData, TableType } from './tableData';
import { selectCompanies } from '@/store/companySlice';



const basics: TableType[] = basicsTableData;

interface TeamSalaryProps {
  company: string;
}

const AllIndividualSalary: React.FC<TeamSalaryProps> = ({ company }) => {

  type IndividualSalesData = {
    팀: number,
    관리번호: number;
    이름: string;
    총신청: number;
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
    고유URL: string;
    활성화: boolean;
    [key: string]: number | string | boolean;
  };



  // const initialData = useSelector((state: RootState) => state.company.employees[company] || []);
  // const [individualSalesDatas, setIndividualSalesDatas] = React.useState<IndividualSalesData[]>(initialData);
  const target: IndividualSalesData[] = useSelector((state: RootState) => state.company.employees[company]) || [];
  const exposeSalaryKeys: (keyof IndividualSalesData)[] = ['관리번호','이름','총신청','상담전','상담완료','상담거절','성공','실패','대출','연구소','벤처','메인','경정','총매출'];




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
              {exposeSalaryKeys.map((header) => (
                <TableCell key={header} align="center">
                  {header}
                </TableCell>
              ))}
            </TableRow>
            {target?.map((leader) => (
            <TableRow key={leader.관리번호}>
              {exposeSalaryKeys.map((key) => (
                <TableCell align="center" key={key}>{leader[key]}</TableCell>
              ))}
            </TableRow>
          ))}
          </TableHead>
          <TableBody>
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default AllIndividualSalary;

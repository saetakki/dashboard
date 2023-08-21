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



const basics: TableType[] = basicsTableData;

interface TeamSalaryProps {
  company: string;
  team: string;
}

const IndividualSalary: React.FC<TeamSalaryProps> = ({ company, team })=> {

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


  const [hiddenUrls, setHiddenUrls] = React.useState<number[]>([]);

  const toggleUrlVisibility = (id: number) => {
    if (hiddenUrls.includes(id)) {
      setHiddenUrls(prev => prev.filter(item => item !== id));
    } else {
      setHiddenUrls(prev => [...prev, id]);
    }
  };


  const initialData = useSelector((state: RootState) => state.company.employees[company] || []);
  const [individualSalesDatas, setIndividualSalesDatas] = React.useState<IndividualSalesData[]>(initialData);
  
  const toggleActivation = (id: number) => {
    const updatedData = individualSalesDatas.map(person => {
      if (person.관리번호 === id) {
        return { ...person, 활성화: !person.활성화 };
      }
      return person;
    });
    setIndividualSalesDatas(updatedData);
  };

  const exposeSalaryKeys = ['관리번호','이름','총신청','상담전','상담완료','상담거절','성공','실패','대출','연구소','벤처','메인','경정','총매출','고유URL','활성화'];

  const target = individualSalesDatas?.filter((person) => String(person.팀) === team);

  const onToggleActivateHandler = (id:number) => {
    console.log(id)
  }


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
          </TableHead>
          <TableBody>
            {target.map((person) => (
              <TableRow key={person.관리번호}>
                {exposeSalaryKeys.map((key) => {
                  if (key === "고유URL") {
                    if (person.활성화) {  // "활성화"가 true일 때 숨김처리
                      return <TableCell align="center" key={key}>숨김</TableCell>;
                    }
                    return <TableCell align="center" key={key}>{person[key as keyof IndividualSalesData]}</TableCell>;
                  } else if (key === "활성화") {
                    return (
                      <TableCell align="center" key={key}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={person.활성화}
                              onChange={() => toggleActivation(person.관리번호)}
                              inputProps={{ 'aria-label': 'Toggle Activation' }}
                            />
                          }
                          label={person.활성화 ? 'on' : 'off'}
                        />
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell align="center" key={key}>
                      {String(person[key as keyof IndividualSalesData])}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BlankCard>
  );
};

export default IndividualSalary;

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation'
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
import Link from 'next/link'
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
  const exposeSalaryKeys = ['관리번호','이름','총신청','상담전','상담완료','상담거절','성공','실패','대출','연구소','벤처','메인','경정','총매출','고유URL','활성화'];
  const target = individualSalesDatas?.filter((person) => String(person.팀) === team);
  const router = useRouter();


  const toggleActivation = (id: number) => {
    const updatedData = individualSalesDatas.map(person => {
      if (person.관리번호 === id) {
        return { ...person, 활성화: !person.활성화 };
      }
      return person;
    });
    setIndividualSalesDatas(updatedData);
  };

  const onRowClickHandler = (name: string) => {
    router.push(`report/${name}`)
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
              <TableRow 
                key={person.관리번호} 
                onClick={() => onRowClickHandler(person.이름)} // 행 클릭 이벤트를 추가합니다.
                style={{ cursor: 'pointer' }} // 마우스 커서가 포인터 형태가 되도록 스타일을 추가합니다.
              >
                {exposeSalaryKeys.map((key) => {
                  let content;

                  switch (key) {
                    case "고유URL":
                      content = person.활성화 ? person[key] : '숨김';
                      break;
                    case "활성화":
                      content = (
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
                      );
                      break;
                    default:
                      content = String(person[key as keyof IndividualSalesData]);
                      break;
                  }

                  return <TableCell align="center" key={key}>{content}</TableCell>;
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

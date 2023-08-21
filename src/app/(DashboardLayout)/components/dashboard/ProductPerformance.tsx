import React from "react";
import { SalesData } from '../../../../store/companySlice'
import Link from 'next/link';

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import { Company } from "@/store/companySlice";


interface ProductPerfomanceProps {
  data: {[key:string]:any}[]
  tab: string
}


const ProductPerfomance = (props:ProductPerfomanceProps) => {


  
  const {data, tab} = props
  const dataArr = data && data.map((item) => Object.values(item)) || null
  const salesHeader = ["관리번호","팀","전체신청","상담전","상담완료","상담거절","성공","실패","대출","연구소","벤처","메인","경정","총매출",]


  const handleClickTeam = () => {
    console.log("click");
  }


  
  return (
    <BaseCard title="매출 내역">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              {salesHeader.map((item,index) => (
                <TableCell key={index}>
                  <Typography color="textSecondary" variant="h6">
                    {item}
                  </Typography>
                </TableCell>
                ))}
            </TableRow>
          </TableHead>
            <TableBody>
              {data && dataArr.map((item,index) => (
                <TableRow key={index}>
                  {item.map((item,index) => (
                    <TableCell key={index}>
                      <Typography variant="h6">{item}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}

          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default ProductPerfomance;

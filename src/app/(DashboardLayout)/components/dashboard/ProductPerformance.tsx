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

const products = [
  {
    id: "1",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
  },
  {
    id: "2",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
  },
  {
    id: "3",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    id: "4",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

interface ProductPerfomanceProps {
  data: SalesData[]
  tab: string
}


const ProductPerfomance = (props:ProductPerfomanceProps) => {

  const {data, tab} = props

    const salesDataSample: SalesData = {
      관리번호: 0,
      팀: 0,
      전체신청: 0,
      상담전: 0,
      상담완료: 0,
      상담거절: 0,
      성공: 0,
      실패: 0,
      대출: 0,
      연구소: 0,
      벤처: 0,
      메인: 0,
      경정: 0,
      총매출: 0,
  };



  
  const salesData = data?.length ? data[0] : salesDataSample;
  const salesDataKeys = Object.keys(salesDataSample);
  



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
                {salesDataKeys.map((item,index) => (
                <TableCell key={index}>
                  <Typography color="textSecondary" variant="h6">
                    {item}
                  </Typography>
                </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((company, companyIndex) => (
              <TableRow key={companyIndex}>
                {Object.values(company).map((item, index) => (
                  <TableCell key={index}>
                    <Link href={`/company/${tab}/${company.팀}`}>  
                        <Typography color="textSecondary" variant="h6">
                          {item}
                        </Typography>
                    </Link>
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

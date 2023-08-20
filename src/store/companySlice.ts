// src/slices/companySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Company = {
  value: string;
  label: string;
};

type Employee = {
  id: string;
  name: string;
};

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
};

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
};

interface CompanyState {
  companies: { label: string; value: string }[];
  teamLeadersByCompany: { [key: string]: TeamLeader[] };
  employees: Employee[];
  salesData: { [key: string]: SalesData[] };
}

const initialState: CompanyState = {
  companies: [
    { value: '1', label: '한화' },
    { value: '2', label: '동아쏘시오홀딩스' },
    { value: '3', label: '삼일회계' },
    { value: '4', label: '삼성전자' },
    { value: '5', label: '김앤장' },
  ],
  employees: [],
  teamLeadersByCompany: {
    한화: [
      {
        관리번호: '1',
        팀: '1',
        팀장: '홍길동',
        번호: '010-1234-5678',
        도메인: 'example.com',
        서브도메인수: '5',
        회원수: '100',
        아이디: 'user001',
        비밀번호: 'pass001',
      },
      {
        관리번호: '2',
        팀: '2',
        팀장: '이동규',
        번호: '010-2222-2222',
        도메인: 'example.com',
        서브도메인수: '5',
        회원수: '100',
        아이디: 'user001',
        비밀번호: 'pass001',
      },
      {
        관리번호: '3',
        팀: '3',
        팀장: '김진기',
        번호: '010-3333-3333',
        도메인: 'example.com',
        서브도메인수: '5',
        회원수: '100',
        아이디: 'user001',
        비밀번호: 'pass001',
      },
    ],
    삼일회계: [
      {
        관리번호: '1',
        팀: '1',
        팀장: 'aaa',
        번호: '010-1111-1111',
        도메인: 'example2.com',
        서브도메인수: '10',
        회원수: '124',
        아이디: 'user011',
        비밀번호: 'pass011',
      },
      {
        관리번호: '2',
        팀: '2',
        팀장: 'bbb',
        번호: '010-2222-2222',
        도메인: 'example2.com',
        서브도메인수: '53',
        회원수: '1030',
        아이디: 'user022',
        비밀번호: 'pass022',
      },
    ],
  },

  salesData: {
    한화: [
      {
        관리번호: 1,
        팀: 1,
        전체신청: 2980,
        상담전: 7500,
        상담완료: 2400,
        상담거절: 3500,
        성공: 1600,
        실패: 2100,
        대출: 1400,
        연구소: 500,
        벤처: 500,
        메인: 400,
        경정: 200,
        총매출: 100,
      },
    ],
    삼일회계: [
      {
        관리번호: 2,
        팀: 1,
        전체신청: 5180,
        상담전: 75120,
        상담완료: 2273,
        상담거절: 734,
        성공: 116,
        실패: 2567,
        대출: 2475,
        연구소: 545,
        벤처: 534,
        메인: 424,
        경정: 200,
        총매출: 100,
      },
    ],
  },
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (
      state,
      action: PayloadAction<{ label: string; value: string }>
    ) => {
      state.companies.push(action.payload);
      state.teamLeadersByCompany[action.payload.value] = []; // 회사의 value를 기반으로 초기 팀장 배열 설정
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    addTeamLeader: (
      state,
      action: PayloadAction<{ companyValue: string; leader: TeamLeader }>
    ) => {
      const companyValue = action.payload.companyValue;
      if (!state.teamLeadersByCompany[companyValue]) {
        state.teamLeadersByCompany[companyValue] = [];
      }
      state.teamLeadersByCompany[companyValue].push(action.payload.leader);
    },
  },
});

export const selectCompanies = (state: { company: CompanyState }) =>
  state.company;
export const { addCompany, addEmployee, addTeamLeader } = companySlice.actions;
export type { Company, Employee, TeamLeader, SalesData };
export default companySlice.reducer;

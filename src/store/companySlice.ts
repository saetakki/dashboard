// src/slices/companySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Company = {
  value: string;
  label: string;
};

type Employee = {
  company: string;
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

type IndividualSalesData = {
  팀: number;
  최근신청: string;
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
};

interface CompanyState {
  companies: { label: string; value: string }[];
  teamLeadersByCompany: { [key: string]: TeamLeader[] };
  employees: { [key: string]: IndividualSalesData[] };
  salesData: { [key: string]: SalesData[] };
}

// 더미 데이터 초기 설정
const initialState: CompanyState = {
  // 더미 데이터 초기 회사 목록
  companies: [
    { value: '1', label: '한화' },
    { value: '2', label: '동아쏘시오홀딩스' },
    { value: '3', label: '삼일회계' },
    { value: '4', label: '삼성전자' },
    { value: '5', label: '김앤장' },
  ],

  //더미 데이터 회사별 초기 사원 목록
  employees: {
    한화: [
      {
        팀: 1,
        최근신청: '07.31. 12:34:56',
        관리번호: 1,
        이름: '이한솔',
        총신청: 500,
        상담전: 200,
        상담완료: 400,
        상담거절: 240,
        성공: 208,
        실패: 22,
        대출: 429,
        연구소: 5,
        벤처: 5,
        메인: 10,
        경정: 35,
        총매출: 10,
        고유URL: 'test.com',
        활성화: true,
      },
      {
        팀: 1,
        최근신청: '07.31. 13:45:12',
        관리번호: 2,
        이름: 'test',
        총신청: 300,
        상담전: 250,
        상담완료: 300,
        상담거절: 100,
        성공: 228,
        실패: 59,
        대출: 239,
        연구소: 9,
        벤처: 4,
        메인: 9,
        경정: 40,
        총매출: 20,
        고유URL: 'test2.com',
        활성화: true,
      },
      {
        팀: 1,
        최근신청: '08.05. 23:12:54',
        관리번호: 3,
        이름: 'test2',
        총신청: 50,
        상담전: 30,
        상담완료: 20,
        상담거절: 5,
        성공: 15,
        실패: 5,
        대출: 100000,
        연구소: 200000,
        벤처: 150000,
        메인: 175000,
        경정: 25000,
        총매출: 650000,
        고유URL: 'https://example.com/1',
        활성화: true,
      },
    ],
    삼일회계: [
      {
        팀: 1,
        최근신청: '08.15. 13:12:54',
        관리번호: 1,
        이름: '김영희',
        총신청: 80,
        상담전: 55,
        상담완료: 25,
        상담거절: 7,
        성공: 18,
        실패: 7,
        대출: 140000,
        연구소: 280000,
        벤처: 160000,
        메인: 185000,
        경정: 28000,
        총매출: 701000,
        고유URL: 'https://example.com/younghee',
        활성화: true,
      },
      {
        팀: 2,
        최근신청: '08.18. 12:12:54',
        관리번호: 2,
        이름: '이철수',
        총신청: 75,
        상담전: 50,
        상담완료: 25,
        상담거절: 6,
        성공: 19,
        실패: 6,
        대출: 130000,
        연구소: 270000,
        벤처: 155000,
        메인: 175000,
        경정: 26000,
        총매출: 688000,
        고유URL: 'https://example.com/cheolsu',
        활성화: false,
      },
    ],
  },

  //더미 데이터 회사별 초기 팀장 목록
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
        아이디: 'user002',
        비밀번호: 'pass002',
      },
      {
        관리번호: '3',
        팀: '3',
        팀장: '김진기',
        번호: '010-3333-3333',
        도메인: 'example.com',
        서브도메인수: '5',
        회원수: '100',
        아이디: 'user003',
        비밀번호: 'pass003',
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

  //더미 데이터 회사 및 팀별 초기 매출 목록
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
        총매출: 30000,
      },
      {
        관리번호: 2,
        팀: 2,
        전체신청: 2156,
        상담전: 3621,
        상담완료: 2632,
        상담거절: 3346,
        성공: 1256,
        실패: 2152,
        대출: 1356,
        연구소: 534,
        벤처: 235,
        메인: 564,
        경정: 213,
        총매출: 25012,
      },
      {
        관리번호: 3,
        팀: 3,
        전체신청: 5123,
        상담전: 5802,
        상담완료: 2356,
        상담거절: 1253,
        성공: 4322,
        실패: 1233,
        대출: 2356,
        연구소: 759,
        벤처: 350,
        메인: 930,
        경정: 301,
        총매출: 69012,
      },
    ],
    삼일회계: [
      {
        관리번호: 1,
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
      {
        관리번호: 2,
        팀: 2,
        전체신청: 2156,
        상담전: 3621,
        상담완료: 2632,
        상담거절: 3346,
        성공: 1256,
        실패: 2152,
        대출: 1356,
        연구소: 534,
        벤처: 235,
        메인: 564,
        경정: 213,
        총매출: 25012,
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
      const companyKey = action.payload.company;

      if (!state.employees[companyKey]) {
        state.employees[companyKey] = [];
      }

      const newSalesData: IndividualSalesData = {
        팀: 0,
        최근신청: '',
        관리번호: Math.random(), // 임의의 값 - 실제로는 다른 방식으로 관리번호를 할당해야 합니다.
        이름: action.payload.name,
        총신청: 0,
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
        고유URL: '', // 임의의 값
        활성화: true, // 임의의 값
      };

      state.employees[companyKey].push(newSalesData);
    },

    updateIndividualSalesData: (
      state,
      action: PayloadAction<{
        companyKey: string;
        관리번호: number;
        newData: Partial<IndividualSalesData>;
      }>
    ) => {
      const employeeArray = state.employees[action.payload.companyKey];
      const employee = employeeArray.find(
        (e) => e.관리번호 === action.payload.관리번호
      );

      if (employee) {
        Object.assign(employee, action.payload.newData);
      }
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
    updateTeamLeader: (
      state,
      action: PayloadAction<{
        companyValue: string;
        leaderId: string;
        updatedData: TeamLeader;
      }>
    ) => {
      const { companyValue, leaderId, updatedData } = action.payload;
      const index = state.teamLeadersByCompany[companyValue].findIndex(
        (leader) => leader.관리번호 === leaderId
      );

      if (index !== -1) {
        state.teamLeadersByCompany[companyValue][index] = updatedData;
      }
    },

    updateSalesData: (
      state,
      action: PayloadAction<{
        companyValue: string;
        teamNumber: number;
        updatedData: SalesData;
      }>
    ) => {
      const { companyValue, teamNumber, updatedData } = action.payload;
      const index = state.salesData[companyValue].findIndex(
        (data) => data.팀 === teamNumber
      );

      if (index !== -1) {
        state.salesData[companyValue][index] = updatedData;
      }
    },
  },
});

export const selectCompanies = (state: { company: CompanyState }) =>
  state.company;
export const { addCompany, addEmployee, addTeamLeader } = companySlice.actions;
export type { Company, Employee, TeamLeader, SalesData, IndividualSalesData };
export default companySlice.reducer;

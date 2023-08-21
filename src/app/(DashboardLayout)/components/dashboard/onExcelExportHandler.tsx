
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import * as XLSX from 'xlsx';

type OnExcelExportHandlerProps = {
  currentCompany: string;
  teamLeadersByCompany: { [companyName: string]: any[] };
  salesDataByCompany: { [companyName: string]: any[] };
};

export const onExcelExportHandler = ({ currentCompany, teamLeadersByCompany, salesDataByCompany}: OnExcelExportHandlerProps): void => {
  // const teamLeadersByCompany = useSelector((state: RootState) => state.company.teamLeadersByCompany || {});
  // const salesDataByCompany = useSelector((state: RootState) => state.company.salesData || {});

  const wb = XLSX.utils.book_new();

  const titleRow: string[] = [currentCompany];
  const head: string[] = ['관리번호', '팀', '팀장', '번호', '도메인', '서브도메인수', '회원수', '아이디', '비밀번호'];
  const dataRows: (string | number)[][] = teamLeadersByCompany[currentCompany]?.map(obj => Object.values(obj)) || [];

  let sumSubdomain: number = 0;
  let sumMembers: number = 0;

  dataRows.forEach(row => {
    sumSubdomain += Number(row[5]);
    sumMembers += Number(row[6]);
  });

  const summaryRow: (string | number)[] = ['', '합계', '', '', '', sumSubdomain, sumMembers, 0, 0];
  const salesHeader: string[] = ["관리번호","팀","전체신청","상담전","상담완료","상담거절","성공","실패","대출","연구소","벤처","메인","경정","총매출"];
  const salesData: (string | number)[][] = salesDataByCompany[currentCompany]?.map(obj => Object.values(obj)) || [];

  const salesSums: (string | number)[] = salesHeader.map((_, colIdx) => {
    if(colIdx === 0) return '';
    if(colIdx === 1) return '합계';
    return salesData.reduce((acc: number, currRow: (string | number)[]) => acc + (Number(currRow[colIdx]) || 0), 0);
  });

  const allData: (string | number)[][] = [
    titleRow,
    head,
    ...dataRows,
    summaryRow,
    [],
    salesHeader,
    ...salesData,
    salesSums
  ];

  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(allData);

  if (!ws['!merges']) ws['!merges'] = [];
  const lastRowIndexForData: number = titleRow.length + 1 + dataRows.length; 
  console.log(lastRowIndexForData);

  const mergeRange: XLSX.Range = {s: {r: lastRowIndexForData, c: 1}, e: {r: lastRowIndexForData, c: 4}};
  ws['!merges'].push(mergeRange);

  XLSX.utils.book_append_sheet(wb, ws, `${currentCompany}`);
  XLSX.writeFile(wb, `${currentCompany}.xlsx`);
}

export default onExcelExportHandler
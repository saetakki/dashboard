import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';

type Item = string | number;

interface GeneralTabProps {
  arr: Item[];
  children?: (item: Item, idx: number) => JSX.Element;
  style?: React.CSSProperties;
  expandedCellIndex?: number; // 새로운 prop
  expandedWidth?: string; // 새로운 prop
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  arr,
  children,
  style,
  expandedCellIndex, // 새로운 prop
  expandedWidth = '150%', // 기본값 지정
}) => {
  const cellWidth = `${100 / arr.length}%`;

  return (
    <TableRow sx={{ width: '100%', wordBreak: 'break-word', overflow: 'auto' }}>
      {arr.map((item, idx) => {
        const isExpandedCell = expandedCellIndex === idx;
        const res = (children && children(item, idx)) || (
          <TableCell
            className='MuiTableRow-root'
            key={idx}
            sx={{
              fontSize: '18px',
              width: isExpandedCell ? expandedWidth : cellWidth, // 조건부 너비 설정
              textAlign: 'center',
            }}
          >
            {item}
          </TableCell>
        );
        return res;
      })}
    </TableRow>
  );
};

export default GeneralTab;

import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';

type Item = string | number;

interface GeneralTabProps {
  arr: Item[];
  children?: (item: Item, idx: number) => JSX.Element;
  style?: React.CSSProperties;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ arr, children, style }) => {
  const cellWidth = `${100 / arr.length}%`;

  return (
    <TableRow sx={{ width: '100%', wordBreak: 'break-word' }}>
      {arr.map((item, idx) => {
        const res = (children && children(item, idx)) || (
          <TableCell
            className='MuiTableRow-root'
            key={idx}
            sx={{ width: cellWidth, textAlign: 'center' }}
          >
            {item}
          </TableCell>
        );
        // 각 셀의 너비를 설정
        return res;
      })}
    </TableRow>
  );
};

export default GeneralTab;

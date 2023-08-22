import React from 'react';
import {
  TableRow,
  TableCell,
} from '@mui/material';

type Item = string | number;

interface GeneralTabProps {
  arr: Item[];
  children?: (item: Item, idx: number) => JSX.Element;
  style?: React.CSSProperties;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ arr, children, style }) => {
  return (
    <TableRow style={style}>
      {arr.map((item, idx) => {
        const res = children 
        && children(item, idx) 
        || <TableCell key={idx} sx={{textAlign:'center'}}>{item}</TableCell>
        return res;
      })}
    </TableRow>
  );
}

export default GeneralTab;
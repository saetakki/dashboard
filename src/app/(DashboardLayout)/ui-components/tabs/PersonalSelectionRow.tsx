import React, { useState } from 'react';
import { TableCell, Checkbox, Radio, TextField, FormControlLabel, TableRow} from '@mui/material';

const FourthRow: React.FC = () => {
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);
  const checkboxes = ["진행여부", "대출", "연구소", "벤처", "메인", "경정"];
  const [checkedState, setCheckedState] = useState<{ [key: string]: string | null }>({
    진행여부: null,
    대출: null,
    연구소: null,
    벤처: null,
    메인: null,
    경정: null,
  });

  return (
    <TableRow>
      <TableCell /> {/* "고객정보" 셀은 비워둡니다 */}
      
      {["상담전", "상담완료", "상담거절", "성공/실패"].map((item) => (
        <TableCell key={item} align="center">
          <Radio
            checked={selectedConsultation === item}
            onChange={() => setSelectedConsultation(item)}
            value={item}
            name="consultation"
          />
        </TableCell>
      ))}

      {checkboxes.map((item) => (
        <TableCell key={item} align="center">
          
            <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', justifyContent: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState[item] === '진행중'}
                    onChange={() => {
                      setCheckedState(prev => ({ ...prev, [item]: '진행중' }));
                    }}
                  />
                }
                label=""
              />
              <span style={{ fontSize: '12px', marginBottom: '4px' }}>진행중</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedState[item] === '완료'}
                    onChange={() => {
                      setCheckedState(prev => ({ ...prev, [item]: '완료' }));
                    }}
                  />
                }
                label=""
              />
              <span style={{ fontSize: '12px', marginTop: '4px' }}>완료</span>
            </div>
        </TableCell>
      ))}

      <TableCell align="center">
        23989
      </TableCell>
    </TableRow>
  );
}

export default FourthRow;

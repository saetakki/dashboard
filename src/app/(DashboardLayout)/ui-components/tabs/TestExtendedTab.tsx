import React, { useState } from 'react';
import GeneralTab from './GeneralTab';
import { Button, TableCell,TableRow } from '@mui/material';

interface TestExtendedTabProps {
  arr: string[]
}



const TestExtendedTab: React.FC<TestExtendedTabProps> = ({ arr }) => {
  const [data, setData] = useState<string[]>(arr); // 초기 열 데이터

  const addCell = () => {
    // 새로운 데이터 'New'를 추가
    setData(prevArr => [...prevArr, 'New']);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Button onClick={addCell}>Add Cell</Button>  {/* 버튼을 클릭하면 새로운 열을 추가 */}
        </TableCell>
      </TableRow>
      <GeneralTab arr={data}>
        {(item: string, idx: number) => (
          <TableCell key={idx}>
            {item}
          </TableCell>
        )}
      </GeneralTab>
    </>
  );
};

export default TestExtendedTab
'use client';
import * as React from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Checkbox,
  TextField,
  IconButton,
  Input,
  InputAdornment,
} from '@mui/material';
import { AttachFile, GetApp } from '@mui/icons-material';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';
import GeneralTab from '@/app/(DashboardLayout)/ui-components/tabs/GeneralTab';
import { FormControlLabel } from '@mui/material';

interface ReportTableProps {
  customerInfoData: string[];
  onDelete: () => void;
}

const ReportTable = ({ customerInfoData, onDelete }: ReportTableProps) => {
  const [checkedState, setCheckedState] = React.useState<{
    [key: string]: string | null;
  }>({
    진행여부: null,
    대출: null,
    연구소: null,
    벤처: null,
    메인: null,
    경정: null,
  });
  const [selected, setSelected] = React.useState<string | null>('상담전');

  const [date, ...initialCustomerInfo] = customerInfoData;
  const [currentCustomerInfo, setCurrentCustomerInfo] =
    React.useState<string[]>(initialCustomerInfo);

  const [memo, setMemo] = React.useState<string>('');
  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const customerInfoTab = [
    '업체명',
    '업체대표',
    '휴대폰',
    '업태',
    '사업자',
    '업력',
    '연매출',
    '4대보험',
    '인증항목',
    '사업자소유여부',
  ];

  const historyTab = [
    '상담전',
    '상담완료',
    '상담거절',
    '성공',
    '실패',
    '진행여부',
    '대출',
    '연구소',
    '벤처',
    '메인',
    '경정',
    '총 매출\n(천원)',
  ];

  return (
    <Grid item xs={12} sx={{ margin: '1rem' }}>
      <Box>
        <div
          style={{
            margin: '1rem 0',
            fontSize: '20px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <div>접수시각 : {date}</div>
          <div
            style={{
              width: '20%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => setIsEditing(!isEditing)}
            >
              EDIT
            </Button>

            <Button variant='contained' color='secondary' onClick={onDelete}>
              DELETE
            </Button>
          </div>
        </div>
        <BlankCard>
          <div style={{ display: 'flex' }}>
            {selected === '상담전' && (
              <div
                style={{
                  display: 'flex',
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    backgroundColor: '#0bb2fb',
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  신규
                </span>
              </div>
            )}
            <TableContainer component={Paper}>
              {/* 업체 정보 테이블 */}
              <Table>
                <TableHead>
                  <GeneralTab arr={customerInfoTab} />
                </TableHead>
                <TableHead>
                  <TableRow>
                    {isEditing
                      ? currentCustomerInfo.map((info, index) => (
                          <TableCell key={index}>
                            <TextField
                              defaultValue={info}
                              onChange={(e) => {
                                const updatedInfo = [...currentCustomerInfo];
                                updatedInfo[index] = e.target.value;
                                setCurrentCustomerInfo(updatedInfo);
                              }}
                              fullWidth // 전체 폭을 사용하도록 설정
                            />
                          </TableCell>
                        ))
                      : currentCustomerInfo.map((info, index) => (
                          <TableCell key={index}>{info}</TableCell>
                        ))}
                  </TableRow>
                </TableHead>
              </Table>

              {/* 체크박스 테이블 */}
              <Table>
                <TableHead>
                  <GeneralTab arr={historyTab} />
                </TableHead>
                <TableBody>
                  <TableRow>
                    {historyTab.map((item, idx) => {
                      if (idx >= 0 && idx <= 4) {
                        // 체크박스 1개 형태
                        return (
                          <TableCell key={idx} align='center'>
                            <Checkbox
                              color='primary'
                              checked={selected === item}
                              onChange={() => setSelected(item)}
                            />
                          </TableCell>
                        );
                      } else if (idx >= 5 && idx <= 10) {
                        // 체크박스 2개 형태
                        return (
                          <TableCell key={item} align='center'>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column-reverse',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <FormControlLabel
                                sx={{ margin: 'auto' }}
                                control={
                                  <Checkbox
                                    checked={checkedState[item] === '진행중'}
                                    onChange={() => {
                                      setCheckedState((prev) => ({
                                        ...prev,
                                        [item]: !prev[item] ? '진행중' : null,
                                      }));
                                    }}
                                  />
                                }
                                label=''
                              />
                              <span
                                style={{
                                  fontSize: '18px',
                                  marginBottom: '4px',
                                  textAlign: 'left',
                                }}
                              >
                                진행중
                              </span>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '18px',
                                  marginTop: '4px',
                                  textAlign: 'left',
                                }}
                              >
                                완료
                              </span>
                              <FormControlLabel
                                sx={{ margin: 'auto' }}
                                control={
                                  <Checkbox
                                    checked={checkedState[item] === '완료'}
                                    onChange={() => {
                                      setCheckedState((prev) => ({
                                        ...prev,
                                        [item]: !prev[item] ? '완료' : null,
                                      }));
                                    }}
                                  />
                                }
                                label=''
                              />
                            </div>
                          </TableCell>
                        );
                      }
                      return null;
                    })}
                    <TableCell align='center' sx={{ fontSize: '18px' }}>
                      23989
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>메모</TableCell>
                    <TableCell>파일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        variant='outlined'
                        fullWidth
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder='메모를 입력하세요...'
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type='file'
                        onChange={handleFileChange}
                        startAdornment={
                          uploadedFile && (
                            <InputAdornment position='start'>
                              <IconButton
                                onClick={() => {
                                  // 파일 다운로드 로직
                                }}
                              >
                                <GetApp />
                              </IconButton>
                            </InputAdornment>
                          )
                        }
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton>
                              <AttachFile />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {uploadedFile && <span>{uploadedFile.name}</span>}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </BlankCard>
      </Box>
    </Grid>
  );
};

export default ReportTable;

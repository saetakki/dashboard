'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { RootState } from '../../../../store/store';
import { addTeamLeader, TeamLeader } from '../../../../store/companySlice';

type CompanyTabsProps = {
  tabs: string;
  auth: string;
};

const MainboardTeamLeaderTab: React.FC<CompanyTabsProps> = ({ tabs, auth }) => {
  type Leader = {
    [key: string]: string;
    팀명: string;
    리더: string;
    번호: string;
    도메인: string;
    마케터수: string;
    신청자: string;
    아이디: string;
    비밀번호: string;
  };

  const dispatch = useDispatch();
  const initialTeamLeaders = useSelector(
    (state: RootState) => state.company.teamLeadersByCompany[tabs]
  );
  const [localTeamLeaders, setLocalTeamLeaders] = useState<Leader[]>(
    initialTeamLeaders || []
  );
  const [open, setOpen] = useState(false);
  const [newLeader, setNewLeader] = useState<Leader>({
    팀명: '',
    리더: '',
    번호: '',
    도메인: '',
    마케터수: '',
    신청자: '',
    아이디: '',
    비밀번호: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLeader({ ...newLeader, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenConfirmDelete = (index: number) => {
    setDeleteIndex(index);
    setConfirmDeleteOpen(true);
  };

  const handleAddData = () => {
    const leaderData: TeamLeader = {
      ...newLeader,
    };
    dispatch(addTeamLeader({ companyValue: tabs, leader: leaderData }));
    setOpen(false);
  };

  const handleDelete = (index: number) => {
    const updatedTeamLeaders = [...localTeamLeaders];
    updatedTeamLeaders.splice(index, 1);
    setLocalTeamLeaders(updatedTeamLeaders);
    setConfirmDeleteOpen(false);
  };

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const handleEdit = (index: number) => {
    setNewLeader(localTeamLeaders[index]);
    setEditIndex(index);
    setOpen(true);
  };
  const handleAddOrUpdateData = () => {
    if (editIndex !== null) {
      const updatedLeaders = [...localTeamLeaders];
      updatedLeaders[editIndex] = newLeader;
      setLocalTeamLeaders(updatedLeaders);
      setEditIndex(null);
    } else {
      setLocalTeamLeaders([...localTeamLeaders, newLeader]);
    }
    setOpen(false);
  };

  const handleCloseConfirmDelete = () => {
    setDeleteIndex(null);
    setConfirmDeleteOpen(false);
  };

  const headers = [
    '팀명',
    '리더',
    '번호',
    '도메인',
    '마케터수',
    '신청자',
    '아이디',
    '비밀번호',
  ];

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  return (
    <Box mt={1}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Button variant='contained' color='secondary' onClick={handleOpen}>
            팀 리더 추가
          </Button>
          <Table sx={{ width: '100%', marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header} sx={{ textAlign: 'center' }}>
                    {header}
                  </TableCell>
                ))}
                <TableCell sx={{ textAlign: 'center' }}>정보수정</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>삭제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {localTeamLeaders
                ? localTeamLeaders.map((row: any, index: number) => (
                    <TableRow key={index}>
                      {headers.map((header, cellIndex) => (
                        <TableCell key={cellIndex} sx={{ textAlign: 'center' }}>
                          {String(row[header])}
                        </TableCell>
                      ))}
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => handleEdit(index)}
                        >
                          정보 수정
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          variant='contained'
                          color='secondary'
                          onClick={() => handleOpenConfirmDelete(index)}
                        >
                          삭제
                        </Button>
                        <Modal
                          open={confirmDeleteOpen}
                          onClose={handleCloseConfirmDelete}
                          aria-labelledby='confirm-delete-title'
                          aria-describedby='confirm-delete-description'
                        >
                          <Box
                            sx={{
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              position: 'absolute',
                              width: 600,
                              height: 200,
                              bgcolor: 'background.paper',
                              border: '2px solid #000',
                              boxShadow: 24,
                              p: 4,
                            }}
                          >
                            <Typography
                              id='confirm-delete-title'
                              variant='h6'
                              component='h2'
                            >
                              삭제 확인
                            </Typography>
                            <Typography
                              id='confirm-delete-description'
                              variant='body1'
                              sx={{ mt: 2 }}
                            >
                              선택한 데이터를 삭제하시겠습니까?
                            </Typography>
                            <Box
                              sx={{
                                mt: 3,
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Button
                                variant='contained'
                                color='primary'
                                onClick={() =>
                                  handleDelete(deleteIndex as number)
                                }
                              >
                                확인
                              </Button>
                              <Button
                                variant='contained'
                                color='secondary'
                                onClick={handleCloseConfirmDelete}
                              >
                                취소
                              </Button>
                            </Box>
                          </Box>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>

          <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box
              sx={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                팀 리더 추가
              </Typography>
              {headers.map((header) => (
                <TextField
                  key={header}
                  fullWidth
                  margin='dense'
                  name={header}
                  label={header}
                  value={newLeader[header] || ''}
                  onChange={handleInputChange}
                />
              ))}
              <Button
                variant='contained'
                color='primary'
                onClick={handleAddData}
                style={{ marginTop: '20px' }}
              >
                저장
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainboardTeamLeaderTab;

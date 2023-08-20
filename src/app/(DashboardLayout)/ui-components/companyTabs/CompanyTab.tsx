import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Box, Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField, Typography
} from '@mui/material';
import { RootState } from '../../../../store/store';
import { addTeamLeader, TeamLeader } from '../../../../store/companySlice';

type CompanyTabsProps = {
  tabs: string;
  add: boolean
  auth: string;
};

const CompanyTabs: React.FC<CompanyTabsProps> = ({ tabs, add, auth }) => {

  type Leader = {
    [key: string]: string;
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


  const dispatch = useDispatch();
  const teamLeaders = useSelector((state: RootState) => state.company.teamLeadersByCompany[tabs]);
  const [open, setOpen] = useState(false);
  const [newLeader, setNewLeader] = useState<Leader>({
    관리번호: '',
    팀: '',
    팀장: '',
    번호: '',
    도메인: '',
    서브도메인수: '',
    회원수: '',
    아이디: '',
    비밀번호: ''
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewLeader({ ...newLeader, [event.target.name]: event.target.value });
  };
  
  const handleOpen = () => {
    setOpen(!open);
  }

  const newManagingNumber = () => {
    const maxExistingId = teamLeaders?.reduce((maxId, leader) => {
      const currentId = parseInt(leader.관리번호, 10);
      return currentId > maxId ? currentId : maxId;
    }, 0) || 0;
  
    // 최대값에서 1 더한 값을 새로운 팀 리더의 관리번호로 설정
    const newLeaderId = (maxExistingId + 1).toString();
    return newLeaderId;
  }



  const handleAddData = () => {
    const leaderData: TeamLeader = {
      ...newLeader,
    };
    leaderData.관리번호 = newManagingNumber();
    dispatch(addTeamLeader({ companyValue: tabs, leader: leaderData }));
    setOpen(false);
  };

  const headers = ['관리번호', '팀', '팀장', '번호', '도메인', '서브도메인수', '회원수', '아이디', '비밀번호'];

  return (
    <Box mt={1}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          {add ? 
            <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleOpen}>
              팀 리더 추가
            </Button>
            : null
          }

          <Table sx={{ width: '100%', marginTop: '20px' }}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell key={header}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {teamLeaders ? teamLeaders.map((row: any, index: number) => (
              <TableRow key={index}>
                {headers.map((header, cellIndex) => (
                  <TableCell key={cellIndex}>{String(row[header])}</TableCell>
                ))}
              </TableRow>
            )) : null }
          </TableBody>
          </Table>

          <Modal
            open={open}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                팀 리더 추가
              </Typography>
              {headers.map(header => (
                <TextField
                  key={header}
                  fullWidth
                  margin="dense"
                  name={header}
                  label={header}
                  value={newLeader[header] || ''}
                  onChange={handleInputChange}
                />
              ))}
              <Button variant="contained" color="primary" onClick={handleAddData} style={{ marginTop: '20px' }}>
                저장
              </Button>
            </Box>
          </Modal>     
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyTabs;

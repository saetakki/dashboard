'use client'

import { Box, Grid } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import IndividualSalary from './individualSalary';
import TeamLeader from './TeamLeader'
import TeamSalary from './TeamSalary'



interface BaseTableProps {
  company:string
  team:string
}


const BaseTable: React.FC<BaseTableProps> = ({company, team}) => {
  
  return(
    <PageContainer>
    <ParentCard title={`${team}팀 정보`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            <TeamLeader company={company} team={team}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <TeamSalary company={company} team={team}/>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <IndividualSalary company={company} team={team}/>
          </Box>
        </Grid>
      </Grid>    
    </ParentCard>
  </PageContainer>
  )
};

export default BaseTable;

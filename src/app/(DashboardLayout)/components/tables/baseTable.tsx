'use client'

import { Box, Grid } from '@mui/material';

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import Table2 from '@/app/(DashboardLayout)/components/tables/Table2';
import Table3 from '@/app/(DashboardLayout)/components/tables/Table3';
import Table1 from '@/app/(DashboardLayout)/components/tables/Table1';
import Table4 from '@/app/(DashboardLayout)/components/tables/Table4';
import Table5 from '@/app/(DashboardLayout)/components/tables/Table5';
import TeamLeader from './teamLeader';
import TeamSalary from './teamSalary';
import IndividualSalary from './individualSalary';



interface BaseTableProps {
  company:string
  team:string
}




const BaseTable: React.FC<BaseTableProps> = ({company, team}) => {

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: `${company}`,
    },
  ];

  return(
  <PageContainer title="Basic Table" description="this is Basic Table">
    {/* breadcrumb */}
    {/* <Breadcrumb title={`${company}`} items={BCrumb} /> */}
    {/* end breadcrumb */}
    <ParentCard title={`${team}팀 정보`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box>
            <TeamLeader company={company} team={team}/>
          </Box>
          <Box>
            <TeamSalary company={company} team={team}/>
          </Box>
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

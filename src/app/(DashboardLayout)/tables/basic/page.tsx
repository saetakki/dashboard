'use client'

import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import ParentCard from '@/app/(DashboardLayout)/components/shared/ParentCard';
import UserTable from '@/app/(DashboardLayout)/components/tables/UserTable';
import { selectCompanies } from '@/store/companySlice';









interface TableFrameProps {
  tab: string;
  team: number;
}

const TableFrame = (props:TableFrameProps) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);
  const team = props.team?.toString() || '1'

  const tab = props.tab?.toString() || companies[0].label
  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: `${tab}`,
    },
  ];
  const targetLeaderData = useSelector(selectCompanies).teamLeadersByCompany[tab][Number(team) - 1]



  return (
        <PageContainer description="this is Basic Table">
          {/* breadcrumb */}
          <Breadcrumb title={`${tab} 현황`} items={BCrumb} />
          {/* end breadcrumb */}
          <ParentCard title={`${tab} ${team}팀 현황`}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box>
                  <UserTable data={targetLeaderData}/>
                </Box>
              </Grid>
            </Grid>
          </ParentCard>
        </PageContainer>
    )
}

export default TableFrame;

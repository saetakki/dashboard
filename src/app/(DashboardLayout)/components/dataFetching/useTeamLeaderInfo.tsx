import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface useTeamLeaderInfoProps {
  tabs: string;
}

const useTeamLeaderInfo = (tabs: string) => {
  return useSelector((state: RootState) => state.company.teamLeadersByCompany[tabs]);
}

export default useTeamLeaderInfo;

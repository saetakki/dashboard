import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface useValidUserProps {
  name: string;
}

const useValidUser = (name: string) => {
  console.log(useSelector((state: RootState) => state.company));
}

export default useValidUser;

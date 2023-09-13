import {
  IconHome,
  IconUser,
  IconProgressCheck,
  IconBuilding,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: '메인화면',
    icon: IconHome,
    href: '/',
  },
  {
    id: uniqueId(),
    title: '기업별 보기',
    icon: IconBuilding,
    href: '/companies',
  },
  {
    id: uniqueId(),
    title: '직속 FC',
    icon: IconUser,
    href: '/fc',
  },
  {
    id: uniqueId(),
    title: '영업 현황',
    icon: IconProgressCheck,
    href: '/report/username',
  },
];

export default Menuitems;

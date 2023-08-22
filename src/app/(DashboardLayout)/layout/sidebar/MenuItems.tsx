import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser,IconProgressCheck
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "메인화면",
    icon: IconHome,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "기업별 보기",
    icon: IconHome,
    href: "/companies"
  },
  {
    id: uniqueId(),
    title: "영업 현황",
    icon: IconProgressCheck,
    href: "/report/username",
  },
  
];

export default Menuitems;

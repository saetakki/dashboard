import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser
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
    title: "기업별 자세히보기",
    icon: IconHome,
    href: "/companies/",
  },
  
  {
    id: uniqueId(),
    title: "Forms",
    icon: IconTable,
    href: "/ui-components/forms",
  },
  {
    id: uniqueId(),
    title: "Alerts",
    icon: IconInfoCircle,
    href: "/ui-components/alerts",
  },
  {
    id: uniqueId(),
    title: "Ratings",
    icon: IconStar,
    href: "/ui-components/ratings",
  },
  {
    id: uniqueId(),
    title: "Images",
    icon: IconPhoto,
    href: "/ui-components/images",
  },
  {
    id: uniqueId(),
    title: "Pagination",
    icon: IconUser,
    href: "/ui-components/pagination",
  },
  {
    id: uniqueId(),
    title: "Tables",
    icon: IconLayoutGrid,
    href: "/ui-components/table",
  },
];

export default Menuitems;

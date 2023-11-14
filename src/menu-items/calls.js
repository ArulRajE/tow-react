// assets
import { LoginOutlined, IdcardOutlined, ScheduleOutlined } from '@ant-design/icons';
import { IconPhoneOff } from '@tabler/icons-react';

// icons
const icons = {
  LoginOutlined,
  IdcardOutlined,
  ScheduleOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'calls',
  title: 'Calls',
  type: 'group',
  children: [
    {
      id: 'callmanagement',
      title: 'Management',
      type: 'item',
      url: '/call',
      icon: icons.IdcardOutlined,
      target: false
    },
    {
      id: 'schedule',
      title: 'Rejected cals ',
      type: 'item',
      url: '/rejected-job',
      icon: IconPhoneOff,
      target: false
    }
  ]
};

export default pages;

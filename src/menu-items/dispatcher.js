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
  id: 'authentication',
  title: 'Dispatcher',
  type: 'group',
  children: [
    {
      id: 'dispatcher',
      title: 'Management',
      type: 'item',
      url: '/dispatcher',
      icon: icons.IdcardOutlined,
      target: false
    },
    {
      id: 'schedule',
      title: 'Rejected Job ',
      type: 'item',
      url: '/rejected-job',
      icon: IconPhoneOff,
      target: false
    }
  ]
};

export default pages;

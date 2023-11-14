// assets
import { LoginOutlined, IdcardOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  IdcardOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Drivers',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Management',
      type: 'item',
      url: '/driver',
      icon: icons.IdcardOutlined,
      target: false
    }
  ]
};

export default pages;

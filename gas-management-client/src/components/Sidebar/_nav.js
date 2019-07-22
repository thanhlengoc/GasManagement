export default {
  items: [
    {
      name: 'Lịch',
      url: '/plugins/calendar',
      icon: 'icon-calendar',
    },
    {
      title: true,
      name: 'QL Nhân Viên',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',           // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Nhân viên',
      url: '/staff',
      icon: 'fa fa-circle text-success',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'QL Khách Hàng',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: 'Khách hàng',
      url: '/customer',
      icon: 'fa fa-circle text-success',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'QL Kho Hàng',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: 'Nhập xuất kho',
      url: '/warehouse',
      icon: 'fa fa-circle text-success',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'QL Thu/Chi',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: 'Thu/chi',
      url: '/bill/invoice',
      icon: 'fa fa-circle text-success',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Tiện ích',
      wrapper: {
        element: '',
        attributes: {}
      },
      class: ''
    },
    {
      name: 'Google Maps',
      url: '/google-maps',
      icon: 'icon-map',
    },
    {
      name: 'Thống kê',
      url: '/charts',
      icon: 'icon-pie-chart',
    },
    {
      divider: true,
      class: 'm-2'
    },
  ]
};

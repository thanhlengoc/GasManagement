export default {
  items: [
    {
      name: 'QUẢN LÍ GAS',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Quản Lí Nhân Viên',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '',           // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Nhân viên',
      url: '/staff-management',
      icon: 'icon-pencil',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Quản Lí Khách Hàng',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Khách hàng',
      url: '/customer-management',
      icon: 'icon-pencil',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Quản Lí Kho Hàng',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Nhập xuất kho',
      url: '/warehouse-management',
      icon: 'icon-pencil',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Quản Lí Thu/Chi',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Thu/chi',
      url: '/bill-management/invoice',
      icon: 'icon-pencil',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Báo Cáo',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Thống kê',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Tiện ích',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''
    },
    {
      name: 'Lịch',
      url: '/plugins/calendar',
      icon: 'icon-calendar'
    },
    {
      name: 'Google Maps',
      url: '/google-maps',
      icon: 'icon-map',
    },
    // {
    //   divider: true,
    //   class: 'm-5'
    // },
    //
    //
    // {
    //   title: true,
    //   name: 'Components',
    //   wrapper: {
    //     element: '',
    //     attributes: {}
    //   },
    // },
    // {
    //   name: 'Base',
    //   url: '/base',
    //   icon: 'icon-puzzle',
    //   children: [
    //     {
    //       name: 'Switches',
    //       url: '/base/switches',
    //       icon: 'icon-puzzle'
    //     },
    //     {
    //       name: 'Tabs',
    //       url: '/base/tabs',
    //       icon: 'icon-puzzle'
    //     }
    //   ]
    // },
    // {
    //   name: 'Charts',
    //   url: '/charts',
    //   icon: 'icon-pie-chart'
    // },
    // {
    //   name: 'Editors',
    //   url: '/editors',
    //   icon: 'fa fa-code',
    //   children: [
    //     {
    //       name: 'Text Editors',
    //       url: '/editors/text-editors',
    //       icon: 'icon-note'
    //     },
    //     {
    //       name: 'Code Editors',
    //       url: '/editors/code-editors',
    //       icon: 'fa fa-code'
    //     }
    //   ]
    // },
    // {
    //   name: 'Forms',
    //   url: '/forms',
    //   icon: 'icon-note',
    //   children: [
    //     {
    //       name: 'Basic Forms',
    //       url: '/forms/basic-forms',
    //       icon: 'icon-note'
    //     },
    //     {
    //       name: 'Advanced Forms',
    //       url: '/forms/advanced-forms',
    //       icon: 'icon-note'
    //     },
    //   ]
    // },
    // {
    //   name: 'Google Maps',
    //   url: '/google-maps',
    //   icon: 'icon-map',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   name: 'Notifications',
    //   url: '/notifications',
    //   icon: 'icon-bell',
    //   children: [
    //     {
    //       name: 'Alerts',
    //       url: '/notifications/alerts',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Badges',
    //       url: '/notifications/badges',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Modals',
    //       url: '/notifications/modals',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Toastr',
    //       url: '/notifications/toastr',
    //       icon: 'icon-bell'
    //     }
    //   ]
    // },
    // {
    //   name: 'Plugins',
    //   url: '/plugins',
    //   icon: 'icon-energy',
    //   children: [
    //     {
    //       name: 'Calendar',
    //       url: '/plugins/calendar',
    //       icon: 'icon-calendar'
    //     },
    //     {
    //       name: 'Spinners',
    //       url: '/plugins/spinners',
    //       icon: 'fa fa-spinner'
    //     }
    //   ]
    // },
    // {
    //   divider: true
    // },
    // {
    //   title: true,
    //   name: 'Extras'
    // },
    // {
    //   name: 'Pages',
    //   url: '/pages',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Login',
    //       url: '/login',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Register',
    //       url: '/register',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 404',
    //       url: '/404',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Error 500',
    //       url: '/500',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    {
      divider: true,
      class: 'm-2'
    },
    {
      title: true,
      name: 'Labels'
    },
    {
      name: 'Label danger',
      url: '',
      icon: 'fa fa-circle text-danger',
      label: {
        variant: 'danger'
      },
    },
    {
      name: 'Label info',
      url: '',
      icon: 'fa fa-circle text-info',
      label: {
        variant: 'info'
      }
    },
    {
      name: 'Label warning',
      url: '',
      icon: 'fa fa-circle text-warning',
      label: {
        variant: 'warning'
      }
    },
  ]
};

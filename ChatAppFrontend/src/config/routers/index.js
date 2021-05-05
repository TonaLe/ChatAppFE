export const routersNotAuth = [
  {
    title: 'Login Page',
    component: 'login',
    path: '/login',
    isProtected: false,
  },
  {
    title: 'Register Page',
    component: 'register',
    path: '/register',
    isProtected: false,
  },
];

export const routersAuth = [
  {
    title: 'Message Page',
    component: 'message',
    path: '/message',
    isProtected: false,
  },
  {
    title: 'Home Page',
    component: 'home',
    path: '/home',
    isProtected: false,
  },
];

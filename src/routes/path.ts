export const RouterPath = {
  root: '/',
  home: '/',
  mail: '/mail',
  terms: '/terms',
  privacy: '/privacy',
  contact: '/contact',
  login: '/login',
  mypage: '/mypage',
  auth: '/auth',
  notFound: '*',
};

export const getDynamicPath = {
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
};

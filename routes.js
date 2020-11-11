module.exports = [
  // INDEX
  { method: 'GET', url: '/', controller: 'index.index' },

  // AUTH
  {
    url: '/auth',
    children: [
      // SIGN-UP
      { method: 'POST', url: '/sign-up', controller: 'auth.signUp' },
      // // SIGN-IN
      { method: 'POST', url: '/sign-in', controller: 'auth.signIn' },
    ],
  },
];

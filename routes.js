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

  // ME
  {
    url: '/me',
    middleware: 'auth',
    children: [
      // POST
      {
        url: '/post',
        children: [
          // CREATE
          {
            method: 'POST',
            url: '/',
            controller: 'me/post.create',
          },
          // DELETE
          {
            method: 'DELETE',
            url: '/:id',
            controller: 'me/post.delete',
          },
        ],
      },
    ],
  },

  // POST
  {
    url: '/post',
    children: [
      // INDEX
      { method: 'GET', url: '/', controller: 'post.index' },
      // SHOW
      { method: 'GET', url: '/:id', controller: 'post.show' },
    ],
  },

  // // THEMES-INDEX
  // { url: '/themes', method: 'GET', controller: 'theme.index' },

  // // TAGS
  // {
  //   url: '/tags',
  //   children: [
  //     // CREATE
  //     { method: 'POST', url: '/', controller: 'tag.create' },
  //     // INDEX
  //     { method: 'GET', url: '/', controller: 'tag.delete' },
  //   ],
  // },
];

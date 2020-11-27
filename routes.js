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
      // SHOW
      { method: 'GET', url: '/', controller: 'me.show' },
      // UPDATE
      { method: 'PUT', url: '/', controller: 'me.update' },
    ],
  },

  // POST
  {
    url: '/posts',
    children: [
      // CREATE
      {
        method: 'POST',
        url: '/',
        middleware: 'auth',
        controller: 'post.create',
      },
      // INDEX
      { method: 'GET', url: '/', controller: 'post.index' },
      // SHOW
      { method: 'GET', url: '/:id', controller: 'post.show' },
      // DELETE
      {
        method: 'DELETE',
        url: '/:id',
        middleware: 'auth',
        controller: 'post.delete',
      },
    ],
  },

  // THEMES-INDEX
  { url: '/themes', method: 'GET', controller: 'theme.index' },

  // TAGS
  {
    url: '/tags',
    children: [
      // CREATE
      {
        method: 'POST',
        url: '/',
        middleware: 'auth',
        controller: 'tag.create',
      },
      // INDEX
      { method: 'GET', url: '/', controller: 'tag.index' },
      // SHOW
      {
        method: 'GET',
        url: '/:id',
        middleware: 'auth',
        controller: 'tag.show',
      },
    ],
  },
];

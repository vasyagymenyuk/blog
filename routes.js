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
      // SHOW ME
      { method: 'GET', url: '/', controller: 'me/me.show' },
    ],
  },

  // POST
  {
    url: '/post',
    children: [
      // CREATE
      {
        method: 'POST',
        url: '/',
        middleware: 'auth',
        controller: 'post.create',
      },
      // DELETE
      {
        method: 'DELETE',
        url: '/:id',
        middleware: 'auth',
        controller: 'post.delete',
      },
      // INDEX
      { method: 'GET', url: '/', controller: 'post.index' },
      // SHOW
      { method: 'GET', url: '/:id', controller: 'post.show' },
    ],
  },

  // THEMES-INDEX
  { url: '/themes', method: 'GET', controller: 'theme.index' },

  // TAGS
  {
    url: '/tags',
    children: [
      // INDEX-ALL-TAGS
      { method: 'GET', url: '/', controller: 'tag.index' },

      // SHOW-USER-TAGS
      {
        method: 'GET',
        url: '/show-my-tags',
        middleware: 'auth',
        controller: 'tag.showUserTags',
      },
    ],
  },
];

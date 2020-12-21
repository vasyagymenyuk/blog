module.exports = [
  // INDEX
  { method: "GET", url: "/", controller: "index.index" },

  // AUTH
  {
    url: "/auth",
    children: [
      // SIGN-UP
      { method: "POST", url: "/sign-up", controller: "auth.signUp" },
      // // SIGN-IN
      { method: "POST", url: "/sign-in", controller: "auth.signIn" },
    ],
  },

  // ME
  {
    url: "/me",
    middleware: "auth",
    children: [
      // SHOW
      { method: "GET", url: "/", controller: "me.show" },
      // UPDATE
      { method: "PUT", url: "/", controller: "me.update" },
      // AVATAR
      {
        url: "/avatar",
        children: [
          // ADD/UPDATE
          {
            method: "POST",
            url: "/add-update",
            middleware: "uploads/avatar",
            controller: "me.addUpdateAvatar",
          },
          // DELETE
          {
            method: "DELETE",
            url: "/delete",
            controller: "me.deleteAvatar",
          },
        ],
      },
    ],
  },

  // POST
  {
    url: "/posts",
    children: [
      // CREATE
      {
        method: "POST",
        url: "/",
        middleware: "auth",
        controller: "post.create",
      },
      // ADD-IMAGES
      {
        method: "POST",
        url: "/:id/add-images",
        middleware: ["auth", "uploads/postImages"],
        controller: "post.addImages",
      },
      // INDEX
      { method: "GET", url: "/", controller: "post.index" },
      // SHOW
      { method: "GET", url: "/:id", controller: "post.show" },
      // UPDATE
      { method: "PUT", url: "/:id/update", controller: "post.update" },
      // DELETE
      {
        method: "DELETE",
        url: "/:id",
        middleware: "auth",
        controller: "post.delete",
      },
    ],
  },

  // THEMES-INDEX
  { url: "/themes", method: "GET", controller: "theme.index" },

  // TAGS
  {
    url: "/tags",
    children: [
      // CREATE
      {
        method: "POST",
        url: "/",
        middleware: "auth",
        controller: "tag.create",
      },
      // INDEX
      { method: "GET", url: "/", controller: "tag.index" },
      // SHOW
      {
        method: "GET",
        url: "/:id",
        middleware: "auth",
        controller: "tag.show",
      },
    ],
  },
];

// configure your app here.
//
// this config is passed to the main AppView
module.exports = {
  /*
   Router config
   */
  router: {
    home:"page1",
    routes: {
      "page1":"page1", // router-id : href
      "page2":"page2",
      "page3":"page3",
    }
  },

  /*
    Sidepanel config
   */
  sidepanel: {
    id: 'sidepanel',
    width: 225
  },


  /*
    Page content
   */
  pages: {
    id: 'pages',
    pages: [
      {
        id:'page1',         // id of the instance; coupled to routing
        content: {          // some data for the Page.jade template
          author: 'John Lubbock',
          content: 'A day of worry is more exhausting than a week of work.'
        }
      },{
        id:'page2',
        content: {
          content: 'It\'s not what you look at that matters, it\'s what you see.',
          author: 'Henry Thoreau'
        }
      },{
        id: 'page3',
        content: {
          content: 'The only true wisdom in knowing is that you know nothing.',
          author: 'Socrates'
        }
      }
    ]
  }
};
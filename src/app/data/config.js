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
    Menu config
   */
  menu: {

  },

  /*
    Page config
   */
  pages: [
    {
      id:'page1',         // id of the instance; coupled to routing
      content: {          // some data for the Page.jade template
        title: 'Page 1',
        content: '...'
      }
    },{
      id:'page2',
      content: {
        title: 'Page 2',
        content: '...'
      }
    },{
      id: 'page3',
      content: {
        title: 'Page 3',
        content: '...'
      }
    }
  ]

};
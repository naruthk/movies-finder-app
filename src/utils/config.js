export default {
  metaData : {
    title: 'Movies Finder',
    description: 'Discover and look up information about your favorite movie and TV show. This app utilizes multiple third parties such as YouTube, Twitter, and The Movie Databases to make sure you have everything in front of you in one place.',
    keyword: 'movies, tv shows, find, search, discover, imdb, ratings'
  },
  developerWebsite: 'https://www.naruthk.com',
  site : {
    navigation: [
      {
        name: 'Home',
        path: '/'
      },
      {
        name: 'About',
        path: '/about'
      },
      {
        name: 'FAQ',
        path: '/faq'
      }
    ],
    features : {
      'Easy Content Lookup' : 'Designed to make searching for your favorite content easier than ever', 
      'Multiple Sources' : 'Search for movies and shows from The Movie Database (TMDb), Twitter, YouTube, and Google', 
      'Trending Movies' : 'Never miss the latest and upcoming movies anymore',
      'Entertainment News' : 'Latest news from the entertainment industry',
      'Open Source' : `This is a project for that invites people to collaborate.`
    },
    faq: [
      {
        title: `What is this site?`,
        content: `<p>Discover and look up information about your favorite movie and TV show. This app utilizes multiple third parties such as YouTube, Twitter, and The Movie Databases to make sure you have everything in front of you in one place.</p>` // copied from siteDescription
      },
      {
        title: `Can I trust the information on this website?`,
        content: `<p>This site strives to bring the latest updates and information for your favorite movies and TV shows. But this site utilizes sources from other parties like IMDB, Google News, and etc. This ultimately means that this site is not responsible for any correct or incorrect information you may receive.</p><p>For most accurate and reliable information, the user should visit the publishing company's website.</p>`
      },
      {
        title: `Donation / Support`,
        content: `<p>Running this project requires a bit of money on my own. By supporting this project, this site can continue to run without ads and subscription fees. Nobody likes that.</p><p>Donation will be open soon.</p>`
      },
      {
        title: `Collaboration`,
        content: `<p>If you are interested in working with me to improve and add more features to this site, please send me an <a href="mailto:nkongurai@gmail.com">email</a> explaining who you are, your background, and why you want to work with me.</p>`
      }
    ]
  }
}
exports.courseSources = [{
    params: {
        "x-algolia-agent": "Algolia%20for%20vanilla%20JavaScript%20(lite)%203.30.0%3Breact-instantsearch%205.2.3%3BJS%20Helper%202.26.1",
        "x-algolia-application-id": "LUA9B20G37",
        "x-algolia-api-key": "dcc55281ffd7ba6f24c3a9b18288499b" 
    },
    data: {
            "requests": [
                {
                    "indexName": "prod_all_launched_products_term_optimization",
                    "params": "query=javascript&hitsPerPage=12&page=0"
                }
            ]  
    },
    url: "https://lua9b20g37-3.algolianet.com/1/indexes/*/queries",
    courseUrl: "https://coursera.org",
    source: "coursera"
},{
    params: {
        "x-algolia-agent": "Algolia for JavaScript (4.9.0); Browser (lite)",
        "x-algolia-application-id": "IGSYV1Z1XI",
        "x-algolia-api-key": "448c9e20c867b4a3f602687b5ec33890" 
    },
    data: {
            "requests": [
                {
                    "indexName": "product",
                    "params": "query=python&hitsPerPage=12"
                }
            ]  
    },
    url: "https://igsyv1z1xi-1.algolianet.com/1/indexes/*/queries",
    source: "edx"
},{
    params: {
        "page_size": 12,
        "q": "python",
    },
    url: "https://www.udemy.com/api-2.0/search-courses",
    courseUrl: "https://udemy.com",
    source: "udemy",
    headers: {
        "Referer": "https://www.udemy.com/courses/search/"
    }
}]


exports.defaultCourseSchema = {
  name: "",
  description: "",  
  duration: 0,
  difficulty: "",
  countEnrolled: 0,
  courseGivenBy: "",
  language: "",
  isPaid: false,
  url: "",
  imageUrl: ""
}
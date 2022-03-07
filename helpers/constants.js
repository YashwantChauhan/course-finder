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
    source: "edx"
}]


exports.defaultCourseSchema = {
  name: "",
  description: "",  
  duration: 0,
  difficulty: "",
  countEnrolled: 0,
  courseGivenBy: "",
  language: "",
  isPaid: "",
  url: "",
  imageUrl: ""
}
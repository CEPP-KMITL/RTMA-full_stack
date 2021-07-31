from TwintClass import TwintSearch
API_ENDPOINT = "http://node-app:3000/api/v1/incidentsRaw/postIncident"
username_target = ["GMMTV", "js100radio"]
search_string = []

scraping = TwintSearch(10, username_target, search_string, API_ENDPOINT)

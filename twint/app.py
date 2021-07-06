from TwintClass import TwintSearch
API_ENDPOINT = "http://pastebin.com/api/api_post.php"
username_target = ["GMMTV","js100radio"]
search_string = []

scraping = TwintSearch(10, username_target, search_string,API_ENDPOINT)

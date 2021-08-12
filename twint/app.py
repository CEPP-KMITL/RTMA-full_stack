from TwintClass import TwintSearch
API_ENDPOINT = "http://node-app:3000/api/v1/incidentsRaw/postIncident"
username_target = ["js100radio", "traffic_1197", "fm91trafficpro"]
search_string = ["รถชน", "ไฟไหม้", "อุบัติเหตุ", "ชนกัน",
                 "เพลิงไหม้", "ชนกับ", "ไฟไหม้", "เสียหลัก", "พุ่งชน"]
#search_string = []

scraping = TwintSearch(100, username_target, search_string, API_ENDPOINT)

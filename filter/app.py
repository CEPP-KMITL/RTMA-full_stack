# import pandas as pd             #?-----
import time
from time import mktime
from datetime import date
from datetime import datetime
import json                        #?-----
import requests
import urllib.parse
import math
import copy
import schedule


timeformat = [".", ":"]
number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
allMonth = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.",
            "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
provinceInTH = {
    'Kamphaeng Phet' : 	'จ.กำแพงเพชร',
    'Chiang Rai' : 	'จ.เชียงราย',
    'Chiang Mai' : 	'จ.เชียงใหม่',
    'Tak' : 	'จ.ตาก',
    'Nakhon Sawan' : 	'จ.นครสวรรค์',
    'Nan' : 	'จ.น่าน',
    'Phichit' : 	'จ.พิจิตร',
    'Phitsanulok' : 	'จ.พิษณุโลก',
    'Phetchabun' : 	'จ.เพชรบูรณ์',
    'Phrae' : 	'จ.แพร่',
    'Mae Hong Son' : 	'จ.แม่ฮ่องสอน',
    'Lampang' : 	'จ.ลำปาง',
    'Lamphun' : 	'จ.ลำพูน',
    'Sukhothai' : 	'จ.สุโขทัย',
    'Uttaradit' : 	'จ.อุตรดิตถ์',
    'Uthai Thani' : 	'จ.อุทัยธานี',
    'Phayao' : 	'จ.พะเยา',

    'Krung Thep Maha Nakhon' : 	'จ.กรุงเทพมหานคร',
    'Bangkok' : 'จ.กรุงเทพมหานคร',
    'Kanchanaburi' : 	'จ.กาญจนบุรี',
    'Chanthaburi' : 	'จ.จันทบุรี',
    'Chachoengsao' : 	'จ.ฉะเชิงเทรา',
    'Chon Buri' : 	'จ.ชลบุรี',
    'Chai Nat' : 	'จ.ชัยนาท',
    'Trat' : 	'จ.ตราด',
    'Nakhon Nayok' : 	'จ.นครนายก',
    'Nakhon Pathom' : 	'จ.นครปฐม',
    'จ.นคาปฐม' : 'จ.นครปฐม',
    'Nonthaburi' : 	'จ.นนทบุรี',
    'Pathum Thani' : 	'จ.ปทุมธานี',
    'Prachuap Khiri Khan' : 	'จ.ประจวบคีรีขันธ์',
    'Prachin Buri' : 	'จ.ปราจีนบุรี',
    'Phra Nakhon Si Ayutthaya' : 	'จ.พระนครศรีอยุธยา',
    'Phetchaburi' : 	'จ.เพชรบุรี',
    'Rayong' : 	'จ.ระยอง',
    'Ratchaburi' : 	'จ.ราชบุรี',
    'Lop Buri' : 	'จ.ลพบุรี',
    'Samut Prakan' : 	'จ.สมุทรปราการ',
    'Samut Songkhram' : 	'จ.สมุทรสงคราม',
    'Samut Sakhon' : 	'จ.สมุทรสาคร',
    'Saraburi' : 	'จ.สระบุรี',
    'Sing Buri' : 	'จ.สิงห์บุรี',
    'Suphan Buri' : 	'จ.สุพรรณบุรี',
    'Ang Thong' : 	'จ.อ่างทอง',
    'Sa Kaeo' : 	'จ.สระแก้ว',

    'Kalasin' : 	'จ.กาฬสินธุ์',
    'Khon Kaen' : 	'จ.ขอนแก่น',
    'Chaiyaphum' : 	'จ.ชัยภูมิ',
    'Yasothon' : 	'จ.ยโสธร',
    'Nakhon Phanom' : 	'จ.นครพนม',
    'Nakhon Ratchasima' : 	'จ.นครราชสีมา',
    'Buri Ram' : 	'จ.บุรีรัมย์',
    'Maha Sarakham' : 	'จ.มหาสารคาม',
    'Roi Et' : 	'จ.ร้อยเอ็ด',
    'Loei' : 	'จ.เลย',
    'Si Sa Ket' : 	'จ.ศรีสะเกษ',
    'Sakon Nakhon' : 	'จ.สกลนคร',
    'Surin' : 	'จ.สุรินทร์',
    'Nong Khai' : 	'จ.หนองคาย',
    'Udon Thani' : 	'จ.อุดรธานี',
    'Ubon Ratchathani' : 	'จ.อุบลราชธานี',
    'Mukdahan' : 	'จ.มุกดาหาร',
    'Amnat Charoen' : 	'จ.อำนาจเจริญ',
    'Nong Bua Lam Phu' : 	'จ.หนองบัวลำภู',
    'Bueng Kan' : 'จ.บึงกาฬ',

    'Krabi' : 	'จ.กระบี่',
    'Chumphon' : 	'จ.ชุมพร',
    'Trang' : 	'จ.ตรัง',
    'Nakhon Si Thammarat' : 	'จ.นครศรีธรรมราช',
    'Narathiwat' : 	'จ.นราธิวาส',
    'Pattani' : 	'จ.ปัตตานี',
    'Phangnga' : 	'จ.พังงา',
    'Phatthalung' : 	'จ.พัทลุง',
    'Phuket' : 	'จ.ภูเก็ต',
    'Yala' : 	'จ.ยะลา',
    'Ranong' : 	'จ.ระนอง',
    'Songkhla' : 	'จ.สงขลา',
    'Satun' : 	'จ.สตูล',
    'Surat Thani' : 	'จ.สุราษฎร์ธานี'

    }
placeStartKeyword = ["ถนน", "ช่วง", "บริเวณ", "ขาเข้า",
                     "ขาออก", "ฝั่ง", "แถว", "จ.", "จังหวัด", "ภายใน"]
placeStopKeyword = ["รถ", "#", "จึง", "ทะเบียน"]


# *---------- ใช้ 3 funtion นี้ในการหาเวลาของ Twitter -------------
def getDateTime(sentence, dotIndex,date):
    hour = sentence[dotIndex-2:dotIndex]
    minute = sentence[dotIndex+1:dotIndex+3]

    YMD = date.split(" ")[0]

    try:
        timeStr = YMD+" "+hour+":"+minute+":00"
        # timeStr = day+"/"+month+"/"+year+" "+hour+":"+minute
        print("time->", timeStr)
        # print("->",timeStr)
        LocalTime = datetime.strptime(timeStr, "%Y-%m-%d %H:%M:%S")
        EpochSecond = mktime(LocalTime.timetuple())
        utcTime = datetime.utcfromtimestamp(EpochSecond).isoformat()
        print("utcTime getDateTime -->",utcTime)
        return utcTime
    except:
        return "not found"

def getDateTimeTwitter(date):
    LocalTime = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
    EpochSecond = mktime(LocalTime.timetuple())
    utcTime = datetime.utcfromtimestamp(EpochSecond).isoformat()
    print("utcTime getDateTimeTwitter -->",utcTime)
    return utcTime

def findTimeInText(text,date):
    time = "not found"
    sentences = text.split(" ")
    for sentence in sentences:
        dotCheck = sentence.find(timeformat[0])
        colonCheck = sentence.find(timeformat[1])
        sizeOfSentence = len(sentence)
        if time == "not found" and dotCheck != -1 and dotCheck+1 < sizeOfSentence and sentence[dotCheck+1] in number and sentence[dotCheck-1] in number:
            time = getDateTime(sentence, dotCheck,date)
            return time

        elif time == "not found" and colonCheck != -1 and colonCheck+1 < sizeOfSentence and sentence[colonCheck+1] in number:
            time = getDateTime(sentence, colonCheck,date)
            return time

    if time == "not found":
        time = getDateTimeTwitter(date)
    return time

def getDateNow():
    # -------- timezone +0 --------------
    LocalTime = datetime.now()
    EpochSecond = mktime(LocalTime.timetuple())
    utcTime = datetime.utcfromtimestamp(EpochSecond).isoformat()
    return utcTime

# *------------------------------------------------



# * ---------------------- ใช้ 2 funtion นี้ในการหาเวลาของ thairath ----------------------------

#! ใช้เวลาที่มาจาก ["date"] ไม่ใช่เวลาเกิดเหตุแต่เป็นเวลาลงข่าว
def getDateTimeThairuth(sentences):
    sentence = sentences.split(" ")

    colonCheck = sentence[3].find(":")
    hour = sentence[3][colonCheck-2:colonCheck]
    minute = sentence[3][colonCheck+1:colonCheck+3]

    day = sentence[0]
    month = str(allMonth.index(sentence[1])+1)
    year = str(int(sentence[2])-543)

    timeStr = year+"-"+month+"-"+day+" "+hour+":"+minute+":00"
    LocalTime = datetime.strptime(timeStr,"%Y-%m-%d %H:%M:%S")
    EpochSecond = mktime(LocalTime.timetuple())
    utcTime = datetime.utcfromtimestamp(EpochSecond).isoformat()
    print("time->",utcTime)
    return utcTime

def getDateAndTimeThairuth(text,dateSentence):

    #! ใช้วันเวลาอันแรกที่มีในข่าว

    sentences = text.split(" ")
    day,month,year,hour,minute = "01","01","1000","00","00"
    # print(sentences)

    for index in range (len(sentences)):
        if sentences[index].find("เมื่อเวลา")!= -1 and minute =="00" and hour=="00":
            dotCheck = sentences[index+1].find(".")
            hour = sentences[index+1][dotCheck-2:dotCheck]
            minute = sentences[index+1][dotCheck+1:dotCheck+3]

        if sentences[index].find("วันที่")!= -1 and year=="1000":
            # print(sentences)
            day = sentences[index+1]
            month = allMonth.index(sentences[index+2][:4])+1
            if month<10:
                month = "0"+str(month)
            else:
                month = str(month)
            today = date.today()
            year = today.strftime("%Y")

    try:
        if day=="01" and month=="01" and year=="1000" and hour =="00" and minute =="00":
            return getDateTimeThairuth(dateSentence)
        else:
            timeStr = year+"-"+month+"-"+day+" "+hour+":"+minute+":00"
            # timeStr = day+"/"+month+"/"+year+" "+hour+":"+minute
            print("time->" ,timeStr)
            # print("->",timeStr)
            LocalTime = datetime.strptime(timeStr,"%Y-%m-%d %H:%M:%S")
            EpochSecond = mktime(LocalTime.timetuple())
            utcTime = datetime.utcfromtimestamp(EpochSecond).isoformat()

            return utcTime
    except:
        return getDateTimeThairuth(dateSentence)

# *------------------------------------------------




# * ---------------------- ใช้หาสถานที่ในข่าว ----------------------------
def checkPlaceStartKeyword(sentence):
    for keyword in placeStartKeyword:
        if sentence.find(keyword) != -1:
            # print(keyword,sentence,sentence.find(keyword))
            return True
    return False

def checkPlaceStopKeyword(sentence):
    for keyword in placeStopKeyword:
        if sentence.find(keyword) != -1:
            return True
    return False

def getDataFormGoogleAPI(place):
    countRequestFail = 0
    status = "REQUEST_DENIED"
    try:
        while status == "REQUEST_DENIED" and countRequestFail <3:
            # ! get lat lon from google api
            url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + urllib.parse.quote(place) +'&key=AIzaSyDVCjXv1DAZgVwRCTkq3kNsrP-xhU4LVKs'
            response = requests.get(url)
            resp_json_payload = response.json()
            status = resp_json_payload['status']
            # print(url)
            # print(resp_json_payload)
            countRequestFail+=1

        if resp_json_payload['status'] == "OK":
            location = resp_json_payload['results'][0]['geometry']['location']
            formatted_address = resp_json_payload['results'][0]['formatted_address']

            for component in  resp_json_payload['results'][0]['address_components']:
                if component['types'] == [ "administrative_area_level_1", "political" ]:
                    province = component['short_name']
                    if province in provinceInTH.keys():
                        province = provinceInTH[province]
                    return [formatted_address,location,province]
        else:
            return "This is not place"
    except:
        print("can't get from google API")
        return "This is not place"

    try:
        countRequestFail2 = 0
        status2 = "REQUEST_DENIED"

        lat = str(location['lat'])
        lng = str(location['lng'])
        locationstr = lat+","+lng

        while status2 == "REQUEST_DENIED" and countRequestFail2 <3:
            # ! get province from google api
            newurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + urllib.parse.quote(locationstr) +'&result_type=administrative_area_level_1&key=AIzaSyDVCjXv1DAZgVwRCTkq3kNsrP-xhU4LVKs'
            newRespons = requests.get(newurl)
            new_resp_json_payload = newRespons.json()
            status = new_resp_json_payload['status']
            # print(resp_json_payload)
            # resp_json_payload['results'][0]['formatted_address']
            countRequestFail2+=1
            # print(new_resp_json_payload)
        if resp_json_payload['status'] == "OK":
            province = new_resp_json_payload['results'][0]['address_components'][0]['short_name']
            if province in provinceInTH.keys():
                province = provinceInTH[province]
            return [formatted_address,location,province]
        else:
            return "This is not place"

    except:
        print("can't get from google API")
        return "This is not place"

def getplace(text,tag=""):
    place="not found"
    placeIsStart = False
    placeIsEnd = False

    sentences = text.split(" ")
    # print(sentences)
    for sentence in sentences:
        if (not placeIsStart) and (not placeIsEnd) and checkPlaceStartKeyword(sentence):
            # print("start")
            placeIsStart = True
            place=""

        elif placeIsStart and checkPlaceStopKeyword(sentence):
            # print("stop")
            placeIsStart = False
            placeIsEnd = True

            print("---> สถานที่เกิดเหตุคือ",place)
            response = getDataFormGoogleAPI(place)
            print("---> response",response)
            if response == "This is not place" :
                place="not found"
                placeIsStart = False
                placeIsEnd = False
            else:
                return response

        if placeIsStart:
            # print("continue")
            place+=sentence
        # if place!="ไม่ระบุ":
    if tag != "":
        response = getDataFormGoogleAPI(tag)
    else:
        # response = getDataFormGoogleAPI("ลาดกระบัง")
        response = "This is not place"

    if response == "This is not place" :
        return ["not found","not found","not found"]
    else:
        return response

# *--------------------------------------------------------------------------

#! RUN: docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -V node-app filter

# *-------------------- GET / POST Data ----------------------------

def getData():
    url = 'http://178.128.89.207/api/v1/incidentsRaw/getAllIncidents'
    #! local url
    # url = 'http://node-app:3000/api/v1/incidentsRaw/getAllIncidents'
    # url ='http://localhost:8000/api/v1/incidentsRaw/getAllIncidents'
    # try:
    response = requests.get(url)
    resp_json_payload = response.json()
    # print(resp_json_payload)
    if resp_json_payload['message'] == "Get all current incidents successfully.":
        return resp_json_payload
    return {'message': 'Error', 'results': 0, 'getIncidents': []}
    # except:
        # return {'message': "Error can't get data", 'results': 0, 'getIncidents': []}

def postTargetobj(myobj):

    # * -------------------- post new data ----------------------
    url = 'http://178.128.89.207/api/v1/incidents/postIncident'
    # ! local url
    # url = 'http://node-app:3000/api/v1/incidentsRaw/postIncident'
    # url = 'http://localhost:8000/api/v1/incidents/postIncident'
    try:
        fail = 0
        while fail < 3:
            response = requests.post(url,myobj)
            resp_json_payload = response.json()
            if resp_json_payload['message'] == "Create incident successfully.":
                print(resp_json_payload['message'])
                break
            else:
                print(resp_json_payload['message'])
                fail+=1

    except:
        print("Post obj fail")


def mainLoop():

    print("mainLoop")
    data = getData()
    print(data['message'])
    try:
        if data['results'] > 0:
            for incident in data['getIncidents']:
                location,time = "not found","not found"
                if  incident['from'] == "TWITTER":
                    time = findTimeInText(incident['body'],incident['date'])
                    formatted_address,location,province = getplace(incident['body'])
                elif incident['from'] == "THAIRAT":
                    time = getDateAndTimeThairuth(incident["body"],incident['date'])
                    if 'tag' in incident.keys():
                        formatted_address,location,province = getplace(incident["body"],incident['tag'])
                    else:
                        formatted_address,location,province = getplace(incident["body"])
                print("location->", formatted_address,location,province)

                if location != "not found" and time != "not found":

                    obj = {}
                    obj['type'] = incident['type']
                    obj['formatted_address'] = formatted_address
                    obj['content'] = incident['body']
                    obj['link'] = incident['link']
                    obj['date'] = time
                    obj['from'] = incident['from']
                    obj['Latitude'] = copy.copy(location['lat'])
                    obj['Longitude'] = copy.copy(location['lng'])
                    obj['province'] = province
                    obj['create_at'] = getDateNow()

                    print(obj)

                    postTargetobj(obj)
    except:
        print("getplace or postTargetobj Error")
    finally:
        print("\n\n")


print("start")
mainLoop()
schedule.every(5).seconds.do(mainLoop)
while True:
    print("inloop")
    schedule.run_pending()
    time.sleep(1)


# ? ---------------------- note ----------------------------


# ! thairuth กับ twitter ต่างกันแค่ตอน getTime


# response = requests.get('https://maps.googleapis.com/maps/api/geocode/json?address=ถนนกิ่งแก้ว&key=AIzaSyDVCjXv1DAZgVwRCTkq3kNsrP-xhU4LVKs')

# resp_json_payload = response.json()

# print(resp_json_payload)

# {'results': [{'address_components': [{'long_name': 'Thanon King Kaeo', 'short_name': 'Thanon King Kaeo', 'types': ['route']},
#                                      {'long_name': 'Thailand', 'short_name': 'TH', 'types': ['country', 'political']}],
#  *             'formatted_address': 'Thanon King Kaeo, Thailand',
#               'geometry': {'bounds': {'northeast': {'lat': 13.7256722, 'lng': 100.7436084}, 'southwest': {'lat': 13.6341051, 'lng': 100.7083777}},
#  *                          'location': {'lat': 13.6792373, 'lng': 100.7237136},
#                            'location_type': 'GEOMETRIC_CENTER',
#                            'viewport': {'northeast': {'lat': 13.7256722, 'lng': 100.7436084},
#                                         'southwest': {'lat': 13.6341051, 'lng': 100.7083777}}},
#              'place_id': 'ChIJQUrlxvVdHTERXbf8jMehXUc', 'types': ['route']
#              }
#              ],
# ! 'status': 'OK'}

# {'results': [{'address_components': [{'long_name': 'ทางหลวงพิเศษห
# มายเลข 7', 'short_name': 'ทางหลวงพิเศษหมายเลข 7', 'types': ['rout
# e']}, {'long_name': 'Thailand', 'short_name': 'TH', 'types': ['country', 'political']}], 'formatted_address': 'ทางหลวงพิเศษหมายเลข
#  7 Thailand', 'geometry': {'bounds': {'northeast': {'lat': 13.7536743, 'lng': 101.1390878}, 'southwest': {'lat': 12.6850689, 'lng': 100.6196553}}, 'location': {'lat': 13.3374549, 'lng': 101.0232797}, 'location_type': 'GEOMETRIC_CENTER', 'viewport': {'northeast': {'lat': 13.7484856, 'lng': 101.4343104}, 'southwest': {'lat':
# 12.9264242, 'lng': 100.612249}}}, 'partial_match': True, 'place_id': 'ChIJvU0S_8dhHTERZOd6c0sZIs4', 'types': ['route']}], 'status': 'OK'}
# บนถนนมอเตอร์เวย์กม.ที่47+600ขาเข้าชลบุรีหมู่5ต.รทุกถังบรรจุปูนผง


# ?--------------------------------------------------------------------------------------------------
# *path to get province data['results'][0]['address_components'][0]['short_name']
# {
#     "plus_code": {
#         "compound_code": "82PF+X8 Nong Ri, Chon Buri District, Chon Buri, Thailand",
#         "global_code": "7P5382PF+X8"
#     },
#     "results": [
#         {
#             "address_components": [
#                 {
#                     "long_name": "Chon Buri",
#                     "short_name": "จ.ชลบุรี",
#                     "types": [
#                         "administrative_area_level_1",
#                         "political"
#                     ]
#                 },
#                 {
#                     "long_name": "Thailand",
#                     "short_name": "TH",
#                     "types": [
#                         "country",
#                         "political"
#                     ]
#                 }
#             ],
#             "formatted_address": "Chon Buri, Thailand",
#             "geometry": {
#                 "bounds": {
#                     "northeast": {
#                         "lat": 13.5893563,
#                         "lng": 101.7168862
#                     },
#                     "southwest": {
#                         "lat": 12.5086232,
#                         "lng": 100.6470747
#                     }
#                 },
#                 "location": {
#                     "lat": 13.3611431,
#                     "lng": 100.9846717
#                 },
#                 "location_type": "APPROXIMATE",
#                 "viewport": {
#                     "northeast": {
#                         "lat": 13.5893563,
#                         "lng": 101.7168862
#                     },
#                     "southwest": {
#                         "lat": 12.5086232,
#                         "lng": 100.6470747
#                     }
#                 }
#             },
#             "place_id": "ChIJPxDrgxewAjERH_3dUV-RDik",
#             "types": [
#                 "administrative_area_level_1",
#                 "political"
#             ]
#         }
#     ],
#     "status": "OK"
# }


# {
#     "plus_code": {
#         "compound_code": "MPHF+MF Racha Thewa, Bang Phli District, Samut Prakan, Thailand",
#         "global_code": "7P52MPHF+MF"
#     },
#     "results": [
#         {
#             "address_components": [
#                 {
#                     "long_name": "Samut Prakan",
#                     "short_name": "จ.สมุทรปราการ",
#                     "types": [
#                         "administrative_area_level_1",
#                         "political"
#                     ]
#                 },
#                 {
#                     "long_name": "Thailand",
#                     "short_name": "TH",
#                     "types": [
#                         "country",
#                         "political"
#                     ]
#                 }
#             ],
#             "formatted_address": "Samut Prakan, Thailand",
#             "geometry": {
#                 "bounds": {
#                     "northeast": {
#                         "lat": 13.7169169,
#                         "lng": 100.9639206
#                     },
#                     "southwest": {
#                         "lat": 13.4785244,
#                         "lng": 100.4444578
#                     }
#                 },
#                 "location": {
#                     "lat": 13.5990961,
#                     "lng": 100.5998319
#                 },
#                 "location_type": "APPROXIMATE",
#                 "viewport": {
#                     "northeast": {
#                         "lat": 13.7169169,
#                         "lng": 100.9639206
#                     },
#                     "southwest": {
#                         "lat": 13.4785244,
#                         "lng": 100.4444578
#                     }
#                 }
#             },
#             "place_id": "ChIJWV8GL4-h4jARCvzY7dWvlUE",
#             "types": [
#                 "administrative_area_level_1",
#                 "political"
#             ]
#         }
#     ],
#     "status": "OK"
# }

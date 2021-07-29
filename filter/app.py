# import pandas as pd             #?-----
import time
from time import mktime
from datetime import date
from datetime import datetime
import json  # ?-----
import requests
import urllib.parse
import math
import copy


timeformat = [".", ":"]
number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
allMonth = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.",
            "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]

placeStartKeyword = ["ถนน", "ช่วง", "บริเวณ", "ขาเข้า",
                     "ขาออก", "ฝั่ง", "แถว", "จ.", "จังหวัด", "ภายใน"]
placeStopKeyword = ["รถ", "#", "จึง", "ทะเบียน"]
allPlace = []
newData = []
targetJson = {}

# * --------------- open file ---------------------
# df = pd.read_csv(r"C:\Users\ADMIN\Desktop\RTMA\\testData.csv", encoding="cp874")
# print(df)

# with open('news.json', encoding='utf-8') as f:
#     data = json.loads(f.read())


#! ต่างจากไทยรัฐเพราะไม่ระบุวันในข่าวระบุแต่เวลา
def getDateTime(sentence, dotIndex):
    hour = sentence[dotIndex-2:dotIndex]
    minute = sentence[dotIndex+1:dotIndex+3]
    today = date.today()
    day = today.strftime("%d")
    month = today.strftime("%m")
    year = today.strftime("%Y")

    try:
        timeStr = year+"-"+month+"-"+day+" "+hour+":"+minute+":00"
        # timeStr = day+"/"+month+"/"+year+" "+hour+":"+minute
        print("time->", timeStr)
        # print("->",timeStr)
        LocalTime = datetime.strptime(timeStr, "%Y-%m-%d %H:%M:%S")
        EpochSecond = mktime(LocalTime.timetuple())
        utcTime = datetime.utcfromtimestamp(EpochSecond).isoformat()

        return utcTime
    except:
        return "not found"


def findTimeInText(text):
    time = "ไม่ระบุ"
    sentences = text.split(" ")
    for sentence in sentences:
        dotCheck = sentence.find(timeformat[0])
        colonCheck = sentence.find(timeformat[1])
        sizeOfSentence = len(sentence)
        if time == "ไม่ระบุ" and dotCheck != -1 and dotCheck+1 < sizeOfSentence and sentence[dotCheck+1] in number and sentence[dotCheck-1] in number:
            time = getDateTime(sentence, dotCheck)

        elif time == "ไม่ระบุ" and colonCheck != -1 and colonCheck+1 < sizeOfSentence and sentence[colonCheck+1] in number:
            time = getDateTime(sentence, colonCheck)

    if time == "ไม่ระบุ":
        day, month, year, hour, minute = "01", "01", "1000", "00", "00"
        timeStr = day+"/"+month+"/"+year+" "+hour+":"+minute
        time = datetime.strptime(timeStr, "%d/%m/%Y %H:%M")
    return time


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


# ? ---------------------- thairath ----------------------------

#! ใช้ไม่ได้เวลาที่มาจาก ["date"] ไม่ใช่เวลาเกิดเหตุแต่เป็นเวลาลงข่าว
def getDateTimeThairuth(sentences):
    sentence = sentences.split(" ")

    colonCheck = sentence[3].find(":")
    hour = sentence[3][colonCheck-2:colonCheck]
    minute = sentence[3][colonCheck+1:colonCheck+3]

    day = sentence[0]
    month = str(allMonth.index(sentence[1])+1)
    year = str(int(sentence[2])-543)

    timeStr = day+"/"+month+"/"+year+" "+hour+":"+minute
    time = datetime.strptime(timeStr, "%d/%m/%Y %H:%M")
    return time


def getDateAndTimeThairuth(text):

    #! ใช้วันเวลาอันแรกที่มีในข่าว

    sentences = text.split(" ")
    day, month, year, hour, minute = "01", "01", "1000", "00", "00"
    # print(sentences)

    for index in range(len(sentences)):
        if sentences[index].find("เมื่อเวลา") != -1 and minute == "00" and hour == "00":
            dotCheck = sentences[index+1].find(".")
            hour = sentences[index+1][dotCheck-2:dotCheck]
            minute = sentences[index+1][dotCheck+1:dotCheck+3]

        if sentences[index].find("วันที่") != -1 and year == "1000":
            day = sentences[index+1]
            month = allMonth.index(sentences[index+2][:5])+1
            if month < 10:
                month = "0"+str(month)
            else:
                month = str(month)
            today = date.today()
            year = today.strftime("%Y")

    try:
        timeStr = year+"-"+month+"-"+day+" "+hour+":"+minute+":00"
        # timeStr = day+"/"+month+"/"+year+" "+hour+":"+minute
        print("time->", timeStr)
        # print("->",timeStr)
        LocalTime = datetime.strptime(timeStr, "%Y-%m-%d %H:%M:%S")
        EpochSecond = mktime(LocalTime.timetuple())
        utcTime = datetime.utcfromtimestamp(EpochSecond).isoformat()

        return utcTime
    except:
        return "not found"


def getplace(text):
    place = "ไม่ระบุ"
    placeIsStart = False
    placeIsEnd = False

    sentences = text.split(" ")
    # print(sentences)
    for sentence in sentences:
        if (not placeIsStart) and (not placeIsEnd) and checkPlaceStartKeyword(sentence):
            # print("start")
            placeIsStart = True
            place = ""

        elif placeIsStart and checkPlaceStopKeyword(sentence):
            # print("stop")
            placeIsStart = False
            placeIsEnd = True

        if placeIsStart:
            # print("continue")
            place += sentence
        # if place!="ไม่ระบุ":

    print("---> สถานที่เกิดเหตุคือ", place)

    countRequestFail = 0
    status = "REQUEST_DENIED"
    while status == "REQUEST_DENIED" and countRequestFail < 3:
        url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + \
            urllib.parse.quote(place) + \
            '&key=AIzaSyDVCjXv1DAZgVwRCTkq3kNsrP-xhU4LVKs'
        response = requests.get(url)
        resp_json_payload = response.json()
        status = resp_json_payload['status']
        # print(resp_json_payload)
        # resp_json_payload['results'][0]['formatted_address']
        countRequestFail += 1

    try:
        return [resp_json_payload['results'][0]['geometry']['location'], place, resp_json_payload['results'][0]]
    except:
        return ["notFound", "notFound", resp_json_payload]


def rad(x):
    return x * math.pi / 180


def getDistance(p1, p2):
    R = 6378137
    dLat = rad(p2['Latitude'] - p1['Latitude'])
    dLong = rad(p2['Longitude'] - p1['Longitude'])
    a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.cos(rad(p1['Latitude'])) * math.cos(
        rad(p2['Latitude'])) * math.sin(dLong / 2) * math.sin(dLong / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = R * c
    return d

# def isDuplicate(location,time):
#     for i in allPlace:
#         # print("DEBUG!!:",getDistance(location,i))
#         if getDistance(location,i)<100:
#             for t in i['time']:
#                 timeDelta = t-time
#                 totalSeconds = timeDelta.total_seconds()
#                 if totalSeconds < 3600:
#                     return "same"
#             return allPlace.index(i)
#     return "different"


def getData():
    url = 'http://localhost:8000/api/v1/incidents/getAllIncidents'
    response = requests.get(url)
    resp_json_payload = response.json()
    print(resp_json_payload)


def postTargetobj(myobj):
    url = 'https://www.w3schools.com/python/demopage.php'

    x = requests.post(url, data=myobj)

    print(x.text)


time.sleep(10)
getData()

# ? ---------------------- twitter loop ----------------------------

# for i, row in df.iterrows():
#     print(">>",i,row['text'])
#     print("---------------------------")

#     time = findTimeInText(row['text'])
#     location,nonformatAddress,targetJson = getplace(row['text'])

#     print("\n---> เวลาเกิดเหตุคือ",time)
#     print("---> สถานที่เกิดเหตุคือ",nonformatAddress)
#     print("===========================\n\n")

# ? ---------------------- thairath loop ----------------------------

# for i in data['data']:

# print(i)

# location,nonformatAddress,targetJson = getplace(i["body"])
# time = getDateAndTimeThairuth(i["body"])

# if location != "notFound" and time != "notFound":
#     # isDup = isDuplicate(location, time)

#     # if isDup == "different":
#     obj = {}
#     # obj['type'] =
#     obj['formatted_address'] = targetJson['formatted_address']
#     # obj['content'] = i
#     # obj['link'] =
#     obj['date'] = time
#     # obj['image'] =
#     # obj['from'] =
#     obj['Latitude'] = copy.copy(location['lat'])
#     obj['Longitude'] = copy.copy(location['lng'])
#     # print("->",targetJson)

#     allPlace.append(obj)
#     newData.append(targetJson)
#     # elif isDup != "same":
#     #     allPlace[isDup]['time'].append(time)
#     #     newData.append(targetJson)

#     print(location,nonformatAddress)
#     print(time)
#     # print(isDup)

#     print(allPlace[-1])
#     # print(allPlace)
#     print("\n\n")

# else:
#     print(targetJson)
#     print("\n\n")


# f.close()


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

import pandas as pd 
from datetime import date
from datetime import datetime

#? use with twiter only
#! now it not work because directory problem
#* in production we use json we have to change now I'm fixing it

#!----------------------------------------------------

df = pd.read_csv(r"../filter/testData.csv", encoding="cp874")


print(df)

timeformat = [".",":"]
number = ["0","1","2","3","4","5","6","7","8","9"]

placeStartKeyword=["ถนน","ช่วง","บริเวณ","ขาเข้า","ขาออก","ฝั่ง","แถว","จ.","จังหวัด"]
placeStopKeyword=["รถ","#"]

def getDateTime(sentence,dotIndex):
    hour = sentence[dotIndex-2:dotIndex]
    minute = sentence[dotIndex+1:dotIndex+3]
    today = date.today()
    day = today.strftime("%d")
    month = today.strftime("%m")
    year = today.strftime("%Y")
    timeStr = day+"/"+month+"/"+year+" "+hour+":"+minute
    time = datetime.strptime(timeStr,"%d/%m/%Y %H:%M")
    return time

def checkPlaceStartKeyword(sentence):
    for keyword in placeStartKeyword:
        # print(keyword,sentence,sentence.find(keyword))
        if sentence.find(keyword) != -1:
            return True
    return False

def checkPlaceStopKeyword(sentence):
    for keyword in placeStopKeyword:
        if sentence.find(keyword) != -1:
            return True
    return False

for index, row in df.iterrows():
    print(">>",index,row['text'])
    print("---------------------------")
    sentences = row['text'].split(" ")
    # print(sentences)

    time ="ไม่มี"
    place="ไม่ระบุ"

    placeIsStart = False

    for sentence in sentences:
        dotCheck = sentence.find(timeformat[0]) 
        colonCheck = sentence.find(timeformat[1]) 
        sizeOfSentence = len(sentence)
        if time =="ไม่มี" and dotCheck!= -1 and dotCheck+1<sizeOfSentence and sentence[dotCheck+1] in number and sentence[dotCheck-1] in number:
            time = getDateTime(sentence,dotCheck)

        elif time =="ไม่มี" and colonCheck != -1 and colonCheck+1<sizeOfSentence and sentence[colonCheck+1] in number:
            time = getDateTime(sentence,colonCheck)
        
        if (not placeIsStart) and checkPlaceStartKeyword(sentence):
            # print("start")
            placeIsStart = True
            place=""
        
        elif placeIsStart and checkPlaceStopKeyword(sentence):
            # print("stop")
            placeIsStart = False
        
        if placeIsStart:
            # print("continue")
            place+=sentence

  

    print("\n---> เวลาเกิดเหตุคือ",time)
    print("---> สถานที่เกิดเหตุคือ",place)
    print("===========================\n\n")
   


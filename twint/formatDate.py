import datetime


def split(word):
    return [char for char in word]


def formatTwintTimeNow():
    pythonTimeNow = datetime.datetime.now()
    yearNow = pythonTimeNow.strftime("%Y")
    monthNow = split(pythonTimeNow.strftime("%m"))
    if monthNow[0] == "0":
        monthNow.pop(0)
    monthNow = ' '.join([str(elem) for elem in monthNow])
    dayNow = split(pythonTimeNow.strftime("%d"))
    if dayNow[0] == "0":
        dayNow.pop(0)
    dayNow = ' '.join([str(elem) for elem in dayNow])
    timeNow = pythonTimeNow.strftime("%X")
    twintDateSince = yearNow + "-" + monthNow + "-" + dayNow + " " + timeNow
    print("Now the time is : " + twintDateSince)
    return twintDateSince

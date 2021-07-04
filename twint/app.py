from schedule import runTwint
import sched
import time
from formatDate import formatTwintTimeNow

delaySec = 600
twintTwitterPriority = 1
schedulerNumber = 0
twitterUsernameTarget = "GMMTV"
twitterSearch = "อุบัติเหตุ"

since = formatTwintTimeNow()
s = sched.scheduler(time.time, time.sleep)
s.enter(delaySec, twintTwitterPriority, runTwint, (
    s, delaySec, schedulerNumber, twintTwitterPriority, twitterUsernameTarget, twitterSearch, since,))
s.run()

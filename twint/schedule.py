from twintFunction import searchTwint
import sched
import time
from formatDate import formatTwintTimeNow


def runTwint(s, delaySec, identifier, twintPriority, usernameTarget, search, since):
    identifier = identifier+1
    print("Twint Schedule Number : " + str(identifier))
    print("Search Since : " + str(since))
    searchTwint(usernameTarget, search,
                str(usernameTarget) + ".json", since)
    since = formatTwintTimeNow()
    print("Set Time Now : " + str(since))
    # do your stuff
    s.enter(delaySec, twintPriority, runTwint, (s, delaySec,
                                                identifier, twintPriority, usernameTarget, search, since,))

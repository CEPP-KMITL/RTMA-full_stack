import sched
import datetime
import twint
import time


class TwintSearch:

    def __init__(self, delay: int, username_target: list, search_string: list):
        self.sched_object = sched.scheduler(time.time, time.sleep)
        self.__delay: int = delay
        self.__number_of_search_string: int = len(search_string)
        self.last_since: str = self.format_twint_time_now(self)
        self.sched_number: int = 0
        self.username_target = username_target
        if len(search_string) == 0:
            search_string = [""]
        self.search_string = search_string

        self.is_valid = self.__is_valid()
        if not self.is_valid:
            raise TypeError("This TwintSearch Object Is Not Properly Instantiated")
        else:
            self.add_schedule()
            self.sched_object.run()

    def __is_valid(self):
        if self.__delay < 1:
            return False
        return True

    def add_schedule(self):
        for username in self.username_target:
            for tag in self.search_string:
                priority = self.username_target.index(username) + 1
                self.sched_object.enter(self.__delay, priority, self.run_twint, (
                    self.sched_object, self.sched_number, username, tag, priority,
                    self.last_since,))

    def run_twint(self, sched_object, round_identifier: int, username_target: str, search_string: str,
                  twint_priority: int, since_time: str):
        round_identifier = round_identifier + 1
        print("Twint Schedule Number : " + str(round_identifier) + " - " + "Search Since : " + str(
            since_time) + " - " + "Search For : " + str(search_string) + " - " + "From : " + str(
            username_target) + " - " + "With Priority : " + str(
            twint_priority))
        self.search_twint(username_target, search_string, str(username_target) + ".json", since_time)
        since_time = self.format_twint_time_now(self)
        print("Next Search Will Be Conduct From : " + since_time)
        sched_object.enter(self.__delay, twint_priority, self.run_twint,
                           (sched_object, round_identifier, username_target,
                            search_string, twint_priority, since_time,))

    def search_twint(self, username_target: str, search_target: str, output_target: str, since_time: str):
        # Configure
        search_engine = twint.Config()
        search_engine.Username = username_target
        if search_target != "":
            search_engine.Search = search_target
        search_engine.Output = output_target
        search_engine.Store_json = True
        search_engine.Links = "include"
        search_engine.Since = since_time
        #search_engine.Since = "2021-7-3 20:30:15"
        # Run
        twint.run.Search(search_engine)

    @staticmethod
    def split(word):
        return [char for char in word]

    @staticmethod
    def format_twint_time_now(self):
        python_time_now = datetime.datetime.now()
        year_now = python_time_now.strftime("%Y")
        month_now = self.split(python_time_now.strftime("%m"))
        if month_now[0] == "0":
            month_now.pop(0)
        month_now = ' '.join([str(elem) for elem in month_now])
        day_now = self.split(python_time_now.strftime("%d"))
        if day_now[0] == "0":
            day_now.pop(0)
        day_now = ' '.join([str(elem) for elem in day_now])
        time_now = python_time_now.strftime("%X")
        twint_date_since = year_now + "-" + month_now + "-" + day_now + " " + time_now
        return twint_date_since

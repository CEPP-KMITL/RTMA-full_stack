import twint


# # Configure
# js100 = twint.Config()
# js100.Username = "js100radio"
# js100.Search = "อุบัติเหตุ"
# js100.Output = "js100tweets.json"
# js100.Store_json = True
# js100.Links = "include"


def searchTwint(username_target, search_target, output_target, since_time):
    # Configure
    js100 = twint.Config()
    js100.Username = username_target
    #js100.Search = search_target
    js100.Output = output_target
    js100.Store_json = True
    js100.Links = "include"
    js100.Since = since_time
    # Run
    twint.run.Search(js100)

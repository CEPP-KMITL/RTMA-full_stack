import twint

# Configure
c = twint.Config()
c.Username = "js100radio"
c.Search = "อุบัติเหตุ"
c.Output = "tweets.csv"
c.Store_csv = True
c.Links = "include"

# Run
twint.run.Search(c)

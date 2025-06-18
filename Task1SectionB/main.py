import os
import pandas as pd
from datetime import datetime
from ReadCSV_Process import *
from validation_and_meanHour import *

import time

df=pd.read_csv("time_series.csv")
# print(df.head())

# start= time.time()
# validation(df)
# MeanHourDay(df)
# end= time.time()
# print(end-start)
if __name__ == "__main__":
    start= time.time()
    validation(df)
    file_paths=SpliteCSVFile(df)
    final_df=ProssecessReadFile(file_paths)
    print(final_df)
    end= time.time()
    print(end-start)




import os
import pandas as pd
from datetime import datetime
from ReadCSV_Process import *
from validation_and_meanHour import *

import time
# chunk_size=100
# toyota_chunk_reader = pd.read_csv("time_series.csv",chunksize=chunk_size)
# for toyota_chunk in toyota_chunk_reader:
#     print(toyota_chunk.head())

#parquet לניקוי נתונים אני משתמשת בסיומת 
# df = pd.read_parquet("time_series.parquet")

# df = pd.read_csv("time_series.csv")


# start= time.time()
# print(validation(df))
# print(MeanHourDay(df))
# end= time.time()
# print(end-start)


if __name__ == "__main__":
    start= time.time()
    # df=validation(df)
    file_path="time_series.csv"
    file_paths=SpliteCSVFileByChunks(file_path, chunksize=10000)

    final_df=ProssecessReadFile(file_paths)
    print(final_df)
    end= time.time()
    print(end-start)




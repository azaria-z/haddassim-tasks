import multiprocessing as mp
import os
import pandas as pd
from concurrent.futures import ProcessPoolExecutor, as_completed
from validation_and_meanHour import *

def SpliteCSVFile(df):
    os.makedirs("daily_chunks", exist_ok=True)
    file_paths = []  # שלב 1: רשימה ריקה לשמירת הנתיבים

# חלוקה לפי יום ושמירה לכל קובץ
    for day, group in df.groupby(df['timestamp'].dt.date):
        file_name = f"daily_chunks/data_{day}.csv"
        group.to_csv(file_name, index=False)
        file_paths.append(file_name)
    return file_paths



# אני יוצרת בריכה של תהליכים
def ProssecessReadFile(file_paths):
     # זיכרון משותף בין התהליכים
     results =[]
     with ProcessPoolExecutor() as executor:
        # שליחה של כל קובץ לתהליכון
        futures = {executor.submit(MeanHour, path): path for path in file_paths}
        for future in as_completed(futures):
            result = future.result()
            if result is not None and not result.empty:
                results.append(result)
            else:
                print(f" File {futures[future]} did not return data")
     print(f"Found {len(results)} valid tables for processing")
     final_df = pd.concat(results, ignore_index=True)
     return final_df


def MeanHour(file_path):
    try:
       print(f"Processing {file_path}")
       df = pd.read_csv(file_path)
       hour_avg=MeanHourDay(df)
       return hour_avg
    #    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')# הופך לאוביקט של תאריך
    #    df['hour'] = df['timestamp'].dt.hour
    #    # חישוב ממוצע לפי שעה
    #    hour_avg = df.groupby('hour')['value'].mean().reset_index()
    #    print(f"i finished {file_path}")
    #    return hour_avg
    except Exception as e:
        print(f"Error in process {file_path}: {e}")
        return None

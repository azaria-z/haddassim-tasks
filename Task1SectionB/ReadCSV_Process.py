import multiprocessing as mp
import os
import pandas as pd
from concurrent.futures import ProcessPoolExecutor, as_completed
from validation_and_meanHour import *

def SpliteCSVFileByChunks(file_path, chunksize=10000):
    os.makedirs("daily_chunks", exist_ok=True)
    file_paths = set()  # שימוש בסט כדי למנוע כפילויות

    # file_paths = []  # שלב 1: רשימה ריקה לשמירת הנתיבים
    for chunk in pd.read_csv(file_path,
    chunksize=chunksize,
    parse_dates=['timestamp'],
    date_format="%m/%d/%Y %H:%M"):
        validation(chunk)

# חלוקה לפי יום ושמירה לכל קובץ
        for day, group in chunk.groupby(chunk['timestamp'].dt.date):
            file_name = f"daily_chunks/data_{day}.csv"
            write_mode = 'a' if os.path.exists(file_name) else 'w'
            header = not os.path.exists(file_name)
            group.to_csv(file_name, index=False, mode=write_mode, header=header)

            file_paths.add(file_name)
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
    #  print(f"Found {len(results)} valid tables for processing")
     final_df = pd.concat(results, ignore_index=True)
     return final_df


def MeanHour(file_path):
    try:
    #    print(f"Processing {file_path}")
       df = pd.read_csv(file_path)
       df['timestamp'] = pd.to_datetime(df['timestamp'], format='mixed',errors='coerce')# תיקון הפורמט של המחרוזות
       hour_avg=MeanHourDay(df)
       return hour_avg

    except Exception as e:
        print(f"Error in process {file_path}: {e}")
        return None















    #    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')# הופך לאוביקט של תאריך
    #    df['hour'] = df['timestamp'].dt.hour
    #    # חישוב ממוצע לפי שעה
    #    hour_avg = df.groupby('hour')['value'].mean().reset_index()
    #    print(f"i finished {file_path}")
    #    return hour_avg
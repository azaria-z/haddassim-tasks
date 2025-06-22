import multiprocessing as mp
import os
import pandas as pd
from concurrent.futures import ProcessPoolExecutor, as_completed
from validation_and_meanHour import *
from OpenFile import *
import glob



def SpliteCSVFileByChunks(file_path, chunksize=10000):
    os.makedirs("daily_chunks", exist_ok=True)
    file_paths = set()  # שימוש בסט כדי למנוע כפילויות
    file_ext = os.path.splitext(file_path)[1].lower()
# מחיקת קבצים ישנים מהפיצול הקודם
    for f in glob.glob("daily_chunks/data_*.csv"):
        os.remove(f)


    def save_grouped_by_day(df):
        df = validation(df)
        for day, group in df.groupby(df['timestamp'].dt.date):
            file_name = f"daily_chunks/data_{day}.csv"
            write_mode = 'a' if os.path.exists(file_name) else 'w'
            header = not os.path.exists(file_name)
            group.to_csv(file_name, index=False, mode=write_mode, header=header)
            file_paths.add(file_name)

    if file_ext == '.csv':
        # file_paths = []  # שלב 1: רשימה ריקה לשמירת הנתיבים
           
            for chunk in  pd.read_csv(
                    file_path,
                    chunksize=chunksize,
                    names=["timestamp", "value"],
                    # header=None,
                    # skiprows=1,
                    low_memory=False,
                    parse_dates=['timestamp'],

                ):
                save_grouped_by_day(chunk)

    elif file_ext in ('.parquet', '.pq'):
         df = pd.read_parquet(file_path, columns=["timestamp", "value"], engine="fastparquet")

         df.columns = ["timestamp", "value"]  # אם אין כותרות
         save_grouped_by_day(df)
    else:
        raise ValueError(f" format is not supported: {file_ext}")

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



# פונקציה זו מחלקת לפי הזמנים ביום
# כל תהליכון עושה את הפונקציה הזו
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
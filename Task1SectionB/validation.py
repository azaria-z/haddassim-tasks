
import pandas as pd
from datetime import datetime

df=pd.read_csv(r"D:\temp\Documents\haddasim_tesk\Task1SectionB\time_series.csv")
print(df.head())




def validation(df):


    df['timestamp'] = pd.to_datetime(df['timestamp'], format='mixed')# תיקון הפורמט של המחרוזות
    df.dropna(subset=['timestamp'], inplace=True)# מחיקת השורות שאין להן תאריך
    x = df["value"].mean()# מילוי הערכים החסרים בממוצע
    df.fillna({"value": x}, inplace=True)
    df = df.drop_duplicates(subset=['timestamp'])#- א" שיקרה 2 דברים באותו תאריך מחיקת כפילויות





# def is_valid_datetime(s):
#     try:
#         datetime.strptime(s, "%H:%M:%S %Y-%m-%d")
#         return True
#     except ValueError:
#         return False
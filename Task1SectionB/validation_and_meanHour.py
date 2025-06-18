import pandas as pd


# הפונקציות של סעיף א

def validation(df):
    df['timestamp'] = pd.to_datetime(df['timestamp'], format='mixed',errors='coerce')# תיקון הפורמט של המחרוזות
    df.dropna(subset=['timestamp'], inplace=True)# מחיקת השורות שאין להן תאריך
    df["value"] = pd.to_numeric(df["value"], errors='coerce')#המרה למספרים נומרים
    x = df["value"].mean()# מילוי הערכים החסרים בממוצע
    df.fillna({"value": x}, inplace=True)
    df = df.drop_duplicates(subset=['timestamp'])#- א" שיקרה 2 דברים באותו תאריך מחיקת כפילויות
    print(df)


def MeanHourDay(df):
    new_df = df.copy()
    new_df['start_time'] = new_df['timestamp'].dt.floor('H')  # לדוגמה: 2025-06-10 06:43 ➝ 2025-06-10 06:00
    # חישוב ממוצע לפי שעה
    result = new_df.groupby('start_time')['value'].mean().reset_index()
    result.columns = ['start time', 'average']
    print(result)



# def is_valid_datetime(s):
#     try:
#         datetime.strptime(s, "%H:%M:%S %Y-%m-%d")
#         return True
#     except ValueError:
#         return False
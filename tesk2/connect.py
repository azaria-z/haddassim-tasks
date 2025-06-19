import sqlite3
import pandas as pd

conn = sqlite3.connect('family.db')
cursor = conn.cursor()

# # הטבלה של נתוני המשפחה
# cursor.execute('''
#     CREATE TABLE IF NOT EXISTS People (
#         Person_Id TEXT PRIMARY KEY,
#         Personal_Name TEXT NOT NULL,
#         Family_Name TEXT NOT NULL,
#         Gender TEXT CHECK(gender IN ('Male', 'Female')),
#         Father_Id TEXT,
#         Mother_Id TEXT,
#         Spouse_Id TEXT,
#         FOREIGN KEY(father_id) REFERENCES People(Person_Id),
#         FOREIGN KEY(mother_id) REFERENCES People(Person_Id),
#         FOREIGN KEY(spouse_id) REFERENCES People(Person_Id)
#     )
# ''')

# # נתוני אנשים: (תעודת זהות, שם פרטי, שם משפחה, מין, אב, אם, בן זוג)
# People = [
#         ("123456782", "Yaakov", "Levi", "Male", None, None, "128765492"),
#         ("128765492", "Rachel", "Levi", "Female", None, None, "123456782"),
#         ("379983349", "Uri", "Levi", "Male", "123456782", "128765492", None),
#         ("567783223", "Tamar", "Levi", "Female", "123456782", "128765492", None),
#         ("348955683", "David", "Cohen", "Male", None, None, "123687759"),
#         ("123687759", "Michal", "Cohen", "Female", None, None, "567783223"),
#         ("318973336", "Noam", "Cohen", "Male", "567783223", "123687759", None),
# ]

# for p in People:
#     cursor.execute('''
#         INSERT INTO people (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
#         VALUES (?, ?, ?, ?, ?, ?, ?)
#     ''', p)

# conn.commit()


cursor.execute("DROP VIEW IF EXISTS family")

# יש לקצר את הטבלה הזו
cursor.execute(''' 
               CREATE VIEW family AS
                SELECT
                    Person_id ,
                    father_id AS Relative_id,
                    CASE
                        WHEN gender = 'Male' THEN 'son'
                        ELSE 'daughter'
                    END AS relationship_type
                FROM People
                WHERE father_id IS NOT NULL
                UNION ALL
                SELECT
                    person_id,
                    mother_id AS relative_id,
                    CASE
                        WHEN gender = 'Male' THEN 'son'
                        ELSE 'daughter'
                    END AS relationship_type
                FROM People
                WHERE mother_id IS NOT NULL
               UNION ALL
                SELECT
                    person_id,
                    Spouse_Id AS relative_id,
                    CASE
                        WHEN gender = 'Male' THEN 'husband'
                        ELSE 'wife'
                    END AS relationship_type
                FROM People
                WHERE Spouse_Id IS NOT NULL;
               

''')


df = pd.read_sql_query("SELECT * FROM family", conn)
print("\nView: family\n")
print(df.to_string(index=False))


# cursor.execute('SELECT * FROM family')
# rows = cursor.fetchall()

# print("The context menu from the View:\n")
# for row in rows:
#     print(f"Child ID: {row[0]}, Parent ID: {row[1]}, Relationship: {row[2]}")

conn.close()

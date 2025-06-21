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
#         ("567783223", "Tamar", "Levi", "Female", "123456782", "128765492", None)
#         # ("348955683", "David", "Cohen", "Male", None, None, "123687759"),
#         # ("123687759", "Michal", "Cohen", "Female", None, None, "567783223"),
#         # ("318973336", "Noam", "Cohen", "Male", "567783223", "123687759", None),
# ]

# for p in People:
#     cursor.execute('''
#         INSERT INTO people (Person_Id, Personal_Name, Family_Name, Gender, Father_Id, Mother_Id, Spouse_Id)
#         VALUES (?, ?, ?, ?, ?, ?, ?)
#     ''', p)

# conn.commit()


cursor.execute("DROP VIEW IF EXISTS Family_Relations")

cursor.execute(''' 
               CREATE VIEW Family_Relations AS
                -- אב
                SELECT Person_Id, Father_Id AS Relative_Id, 'father' AS Connection_Type
                FROM People
                WHERE Father_Id IS NOT NULL
                UNION ALL
                -- אם
                SELECT Person_Id, Mother_Id AS Relative_Id, 'mother' AS Connection_Type
                FROM People
                WHERE Mother_Id IS NOT NULL
               UNION ALL
               --בן או בת זוג
                SELECT
                    Person_Id,
                    Spouse_Id AS Relative_Id,
                    CASE
                        WHEN gender = 'Male' THEN 'husband'
                        ELSE 'wife'
                    END AS Connection_Type
                FROM People
                WHERE Spouse_Id IS NOT NULL
               --בן או בת
                UNION ALL
                SELECT P1.Person_Id,
                P2.Person_Id AS Relative_Id,
                    CASE
                        WHEN P2.gender = 'Male' THEN 'son'
                        ELSE 'daughter'
                    END AS Connection_Type
                FROM People P1 join People P2
                on (P2.Father_Id=P1.Person_Id OR P2.Mother_Id=P1.Person_Id)
                --אח אחות
                UNION ALL
                SELECT P1.Person_Id,
                P2.Person_Id AS Relative_Id,
                    CASE
                        WHEN P2.gender = 'Male' THEN 'brother'
                        ELSE 'sister'
                    END AS Connection_Type
                FROM People P1 join People P2
                on  p1.Person_Id != p2.Person_Id AND
                    (
                        p1.Father_Id = p2.Father_Id OR p1.Mother_Id = p2.Mother_Id
                    );
                ''')



df = pd.read_sql_query("SELECT * FROM Family_Relations", conn)
print("\nView: Family_Relations\n")
print(df.to_string(index=False))

conn.close()

























































#לא צריך בינתיים
# cursor.execute('SELECT * FROM family')
# rows = cursor.fetchall()

# print("The context menu from the View:\n")
# for row in rows:
#     print(f"Child ID: {row[0]}, Parent ID: {row[1]}, Relationship: {row[2]}")

conn.close()






















# # יש לקצר את הטבלה הזו
# cursor.execute(''' 
#                CREATE VIEW family AS
#                 SELECT
#                     Person_id ,
#                     father_id AS Relative_id,
#                     CASE
#                         WHEN gender = 'Male' THEN 'son'
#                         ELSE 'daughter'
#                     END AS relationship_type
#                 FROM People
#                 WHERE father_id IS NOT NULL
#                 UNION ALL
#                 SELECT
#                     person_id,
#                     mother_id AS relative_id,
#                     CASE
#                         WHEN gender = 'Male' THEN 'son'
#                         ELSE 'daughter'
#                     END AS relationship_type
#                 FROM People
#                 WHERE mother_id IS NOT NULL
#                UNION ALL
#                 SELECT
#                     person_id,
#                     Spouse_Id AS relative_id,
#                     CASE
#                         WHEN gender = 'Male' THEN 'husband'
#                         ELSE 'wife'
#                     END AS relationship_type
#                 FROM People
#                 WHERE Spouse_Id IS NOT NULL;
               

# ''')

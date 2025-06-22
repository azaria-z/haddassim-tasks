import sqlite3
import pandas as pd


conn = sqlite3.connect('family.db')
cursor = conn.cursor()

cursor.execute('''
UPDATE People
SET Spouse_Id = (
    # SELECT P2.Person_Id
    # FROM People AS P2
    # WHERE P2.Spouse_Id = People.Person_Id
)
WHERE Spouse_Id IS NULL
  AND EXISTS (
      SELECT 1
      FROM People AS P2
      WHERE P2.Spouse_Id = People.Person_Id
);
''')




df = pd.read_sql_query("SELECT * FROM People", conn)
print("\nView: Family_Relations\n")
print(df.to_string(index=False))


# cursor.execute('''
# UPDATE Peaple
# SET Spouse_Id = (
#     SELECT P2.Person_Id
#     FROM Peaple AS P2
#     WHERE P2.Spouse_Id = Peaple.Person_Id
# )
# WHERE Spouse_Id IS NULL
#   AND EXISTS (
#       SELECT 1
#       FROM Peaple AS P2
#       WHERE P2.Spouse_Id = Peaple.Person_Id
# );
# ''')




# cursor.execute('''UPDATE People
#      SET spouse_id = (
#     SELECT p1.id
#     FROM people AS p1
#     WHERE p1.spouse_id = people.id
#                )
# WHERE spouse_id IS NULL
#   AND EXISTS (
#       SELECT 1
#       FROM people AS p2
#       WHERE p2.spouse_id = people.id
#   );
#     ''')
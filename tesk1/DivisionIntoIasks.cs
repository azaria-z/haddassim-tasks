using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace tesk1
{
    public class DivisionIntoIasks
    {


        async public static Task<Dictionary<string, int>> N_MAX_ERROR(string filePath, int N)
        {


            //חלוקת הקובץ לקבצים
            List<string> l1 = ReadFiles.DividIintoFiles(filePath);

            //חלוקה למשימות

            List<Task<Dictionary<string, int>>> tasks = new List<Task<Dictionary<string, int>>>(); // רשימה של מילונים

            for (int i = 0; i < l1.Count; i++)
            {
                int localIndex = i;

                tasks.Add(Task.Run(() =>
            {
                return ReadFiles.ReadFile(l1[localIndex]);
            }));
            }
            await Task.WhenAll(tasks);
            Dictionary<string, int> finalErrors = new Dictionary<string, int>();
            foreach (var task in tasks)
            {
                var result = task.Result;
                foreach (var kvp in result)
                {
                    if (finalErrors.ContainsKey(kvp.Key))
                        finalErrors[kvp.Key] += kvp.Value;
                    else
                        finalErrors[kvp.Key] = kvp.Value;
                }
            }


            Dictionary<string, int> topErrors = finalErrors
                .OrderByDescending(kvp => kvp.Value)
                .Take(N).ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
            return topErrors;




        }







    }
}

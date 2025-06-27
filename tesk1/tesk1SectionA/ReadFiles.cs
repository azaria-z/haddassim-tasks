using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tesk1
{
    public class ReadFiles
    {

        public static Dictionary<string, int> ReadFile(string file)
        {
            Dictionary<string, int> errors = new Dictionary<string, int>();

            using (var reader = new StreamReader(file))
            {
                string line;
                int lineNumber = 0;

                while ((line = reader.ReadLine()) != null)
                {
                    int index = line.IndexOf("Error:");
                    if (index >= 0)
                    {
                        string nameError = line.Substring(index + "Error:".Length).Trim();// מחלץ את האינדקס  ההתחלה עד הסוף

                        if (errors.ContainsKey(nameError))
                            errors[nameError]++;
                        else
                            errors[nameError] = 1;
                    }

                }
                return errors;

            }


        }

        // פונקציה שמחלקת את הקובץ לקבצים כמספר הליבות

        public static List<string> DividIintoFiles(string filePath)
        {


            int coreCount = Environment.ProcessorCount;//מס הליבות
                                                       //Console.WriteLine("the number of line: " + lineCount + " the number of core: " + coreCount);


            var Files = new List<string>();//שומר את הניתובים של הקבצים


            //שימוש עם STREAM כדי לא לטעון את כולו לזיכרון ישר
            int lineCount = 0;
            using (var reader = new StreamReader(filePath))
            {
                while (reader.ReadLine() != null)
                {
                    lineCount++;
                }

            }

            //מחלק את החלק לכל תהליכון
            int lineForTread = lineCount / coreCount;
            int rest = lineCount % coreCount;

            // שלב 3 – יצירת תיקיה חדשה לשמירת הקבצים
            string originalFileName = Path.GetFileNameWithoutExtension(filePath);
            string folder = Path.Combine(Path.GetDirectoryName(filePath), originalFileName + "_parts");

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder); // אם התיקיה לא קיימת – ניצור אותה

            using (var reader = new StreamReader(filePath))
            {
                for (int i = 0; i < coreCount; i++)
                {
                    string nameFile = Path.Combine(folder, $"{originalFileName}_part{i}.txt");

                    int currentLines = lineForTread + (i < rest ? 1 : 0);// מחלק את השארית בצורה שיויונית

                    // אני כותבת פה לקבצים
                    using (var writer = new StreamWriter(nameFile))
                    {
                        for (int j = 0; j < currentLines; j++)
                        {
                            string line = reader.ReadLine();
                            if (line == null)
                                break;
                            writer.WriteLine(line);
                        }
                    }
                    Files.Add(nameFile);
                    //Console.WriteLine($"File created: {nameFile} with {lineForTread} lines");


                }

            }
            return Files;
        }
    }
}

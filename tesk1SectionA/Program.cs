using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using tesk1;
using System.Diagnostics;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;
using File = System.IO.File;
using System.Security.Cryptography;


class Program
{
    static async Task Main(string[] args)
    {
        try
        {
            string filePath = @"D:\temp\Documents\haddasim_tesk\tesk1\logs1.txt";
            int N = 3;
            if (!File.Exists(filePath))
            {
                Console.WriteLine("File not found!");
                return;
            }
            Dictionary<string, int> topErrors = await DivisionIntoIasks.N_MAX_ERROR(filePath, N);

            topErrors.ToList();
            foreach (var error in topErrors)
            {
                Console.WriteLine("name error " + error.Key + "number " + error.Value);
            }


        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }



        Console.ReadLine();

    }


    
}





     

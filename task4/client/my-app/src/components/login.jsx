import React, { useState } from 'react';
import { login } from '../api/api';

const LoginPage = ({ onLogin }) => {
  const [emailUser, setEmailUser] = useState('');
  const [password, setPassword] = useState('');

  // מה קורה כאשר הטופס מתמלא
 const handleLogin = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await login(emailUser, password);
      console.log('שרת החזיר (תגובה מלאה):', response);

      if (!response) {
        console.error("שגיאה: פונקציית ה-login החזירה ערך ריק (undefined/null).");
        alert("שגיאה בהתחברות: לא התקבלה תגובה תקפה מהשרת.");
        return; // עצירת ביצוע אם התגובה ריקה
      }

      const responseData = response.data || response; // מזהה את אובייקט הנתונים הנכון

      // שימו לב: שורות ה-console.log כאן תוקנו כדי לגשת ל-responseData
      console.log("responseData.user:", responseData.user);
      // בדיקה בטוחה של type of role באמצעות optional chaining, לפני שאנו בטוחים ש-user קיים
      console.log('סוג של responseData.user.role (אם קיים):', typeof responseData.user?.role);
      console.log("111 - המשך תהליך.");

      // בדיקה האם responseData תקין ומכיל את אובייקט ה-'user'
      if (!responseData || typeof responseData !== 'object' || !responseData.user) {
        console.error("שגיאה: מבנה התגובה מהשרת אינו תקין או שדה 'user' חסר.");
        console.error("תגובה מלאה (למטרת איתור באגים - responseData):", responseData); // הודעה יותר ברורה
        alert("שגיאה בהתחברות: פורמט תגובת השרת אינו תקין או פרטי משתמש חסרים.");
        return; // עצירת ביצוע אם אובייקט המשתמש חסר
      }

      // כאן אנו יודעים ש-responseData.user קיים ותקין
      const user = responseData.user; // המשתנה user מכיל כעת את אובייקט המשתמש
      console.log("222 - אובייקט המשתמש נוצר בהצלחה.");

      if (user.role) { // בדיקה האם ל-user יש מאפיין role
        console.log("222 - התחברות מוצלחת!");
        console.log('סוג של user.role:', typeof user.role); // עכשיו user מוגדר, אז אפשר לבדוק את ה-type שלו
        onLogin(user); // העבר את אובייקט המשתמש כולו לפונקציית onLogin
      } else {
        // אם user קיים אבל user.role חסר או ריק
        alert(`שגיאה בהתחברות: לא נמצא תפקיד משתמש.`);
      }
    } catch (error) {
      console.error("שגיאה כללית בהתחברות:", error);
      alert(`שגיאה בהתחברות: ${error.message || 'אירעה שגיאה בלתי צפויה.'}`);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <input value={emailUser} onChange={(e) => setEmailUser(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">התחבר</button>
    </form>
  );
};

export default LoginPage;



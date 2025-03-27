document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // נעילת כפתור השליחה והצגת סטטוס
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'שולח...';
        submitButton.disabled = true;
        
        // איסוף הנתונים מהטופס
        const formData = new FormData(form);
        const data = {
          name: formData.get('name'),
          phone: formData.get('phone'),
          calendar: formData.get('calendar'),
          business: formData.get('business')
        };
        
        try {
          console.log('Sending data:', data); // לוג של הנתונים שנשלחים
          
          const response = await fetch('https://script.google.com/macros/s/AKfycbzqCrvMXdvOzTOC68k0SvT7In3UVl7R0Lw4rESSxhNwUsLuAHdhH9skvjHqxC8luEfM/exec', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors' // הוספת mode: 'cors'
          });
          
          console.log('Response status:', response.status); // לוג של סטטוס התגובה
          
          const result = await response.json();
          console.log('Response data:', result); // לוג של התגובה עצמה
          
          if (result.result === 'success') {
            // איפוס הטופס והצגת הודעת הצלחה
            form.reset();
            alert('תודה רבה! הפרטים שלך נשלחו בהצלחה ונציג יצור איתך קשר בהקדם.');
          } else {
            throw new Error(result.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Detailed error:', error); // לוג מפורט של השגיאה
          alert('אירעה שגיאה בשליחת הטופס. אנא נסי שוב מאוחר יותר.');
        } finally {
          // שחרור כפתור השליחה בכל מקרה
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        }
      });
    } else {
      console.error('Form element not found! Looking for ID: contact-form');
    }
  });
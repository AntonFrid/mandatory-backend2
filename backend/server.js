const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

let cards;

// app.use(express.json());

app.use((req, res, next) => {
  if(!req.is('application/json')) {
    next();
  }
  else {
    let jsonString = '';

    req.on('data', c => {
      jsonString += c.toString();
    });

    req.on('end', () => {
      try {
        req.body = JSON.parse(jsonString);

        next();
      } catch(err) {
        res.status(400).send('Requires Content-type: application/json');
      }
    });
  }
})

app.use((req, res, next) => {
  const init = process.hrtime()

  res.on('finish', () => {
    const ms = getDurationInMS(init);

    console.log(
      `\n-REQUEST FROM CLIENT-\n
      Method: ${req.method}\n
      Path: ${req.path}\n
      Status: ${res.statusCode}\n
      Duration: ${ms} ms`
    );
  });

  next();
})

try {
  cards = JSON.parse(fs.readFileSync('./database/cards.json'));

} catch (err) {
  console.log(err);
}

const getDurationInMS = (init) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(init)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

const writeToDB = () => {
  fs.writeFile(`./database/cards.json`, JSON.stringify(cards), err => {
    if (err) console.log(err);
  });
}

app.get('/cards', (req, res) => {
  res.status(200).send(JSON.stringify(cards));
});

app.post('/cards/card', (req, res) => {
  let obj = req.body;

  obj.content = [];
  obj.id = uuidv4();

  cards.push(obj);
  writeToDB();

  res.status(201).send(JSON.stringify(cards));
}),

app.post('/cards/:cardID/todo', (req, res) => {
  let index = cards.findIndex(x => x.id === req.params.cardID );
  let obj = req.body;

  obj.id = uuidv4();

  cards[index].content.push(obj);
  writeToDB();

  res.status(201).send(JSON.stringify(cards));
});

app.put('/cards/:oldCardID/todos/:todoID/cards/:newCardID', (req, res) => {
  let oldCardIndex = cards.findIndex(x => x.id === req.params.oldCardID);
  let newCardIndex = cards.findIndex(x => x.id === req.params.newCardID);
  let todos = cards[oldCardIndex].content;
  let todoIndex = todos.findIndex(x => x.id === req.params.todoID);

  let obj = cards[oldCardIndex].content[todoIndex];

  cards[newCardIndex].content.push(obj)
  cards[oldCardIndex].content.splice(todoIndex, 1);
  writeToDB();

  res.status(204).end();
});

app.patch('/cards/:cardID/todos/:todoID', (req, res) => {
  let cardIndex = cards.findIndex(x => x.id === req.params.cardID);
  let todos = cards[cardIndex].content;
  let todoIndex = todos.findIndex(x => x.id === req.params.todoID);

  cards[cardIndex].content[todoIndex] = req.body;
  writeToDB();

  res.status(204).end();
});

app.delete('/cards/:cardID/todos/:todoID', (req, res) => {
  let cardIndex = cards.findIndex(x => x.id === req.params.cardID);
  let todos = cards[cardIndex].content;
  let todoIndex = todos.findIndex(x => x.id === req.params.todoID);

  cards[cardIndex].content.splice(todoIndex, 1);
  writeToDB();

  res.status(204).end();
});

app.delete('/cards/:cardID', (req, res) => {
  let index = cards.findIndex(x => x.id === req.params.cardID);

  cards.splice(index, 1);
  writeToDB();

  res.status(204).end();
})

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

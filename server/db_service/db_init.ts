import sqlite3 from 'sqlite3';
import fs from 'fs';

const DATABASE_NAME = 'my_library.db';
const DATABASE_ADDRESS = `./db/${DATABASE_NAME}`;

const handleErr = (err: Error) => {
  console.log('Error Occurred - ', err.message);
};

const formatStringDataForValues = (str: string) => {
  const lines = str.split(/\r?\n/);
  lines.splice(0, 1);
  return lines

    .map(line => {
      const patchLine = line.split('');

      let isQuoted = false;

      for (let x = 0; x < patchLine.length; x++) {
        // eslint-disable-next-line quotes
        if (patchLine[x] === "'") {
          // eslint-disable-next-line quotes
          patchLine.splice(x, 1, "''");
        }
        if (patchLine[x] === '"') {
          isQuoted = !isQuoted;
          patchLine.splice(x, 1, '');
        }
        if (patchLine[x] === ',' && !isQuoted) {
          // eslint-disable-next-line quotes
          patchLine.splice(x, 1, "','");
        }
      }
      const result = `('${patchLine.join('')}'), `;
      return result;
    })
    .join('')
    .slice(0, -2);
};

type loadDataCb = (values: string) => void;

const readFromCsvAndLoadToDb = async (cb: loadDataCb) => {
  await fs.readFile('./db/books.csv', 'utf-8', (err, data) => {
    if (err) {
      handleErr(err);
    } else {
      const values = formatStringDataForValues(data);
      cb(values);
    }
  });
};

const loadDataToDb = async (db: sqlite3.Database) => {
  const loaderCbInsert = (valuesData: string) => {
    const insertValues = `INSERT INTO collection (title, author, genre, height, publisher) VALUES ${valuesData};`;
    // console.log(insertValues);
    db.all('SELECT * FROM collection;', (err, row) => {
      console.log(`found ${row.length} records in collection table`);
      if (!row.length) {
        db.exec(insertValues, err => {
          if (err) {
            handleErr(err);
          } else {
            console.log(
              `added records to 'collection' table in ${DATABASE_NAME}`
            );
          }
        });
      }
    });
  };

  const loaderCb: loadDataCb = (data: string) => {
    db.exec(
      `
      CREATE TABLE IF NOT EXISTS collection(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          author TEXT,
          height INT,
          genre TEXT,
          publisher TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
      CREATE TABLE IF NOT EXISTS members(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT,
          phone TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS checkouts(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INT NOT NULL,
          book INT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
          due_date DATETIME NOT NULL
      );
      `,
      err => {
        if (err) {
          handleErr(err);
        } else {
          console.log(
            `'collection', 'members' and 'checkouts' tables available in ${DATABASE_NAME} database.`
          );
          loaderCbInsert(data);
        }
      }
    );
  };

  await readFromCsvAndLoadToDb(loaderCb);
};

export const initializeDb = () => {
  const db = new sqlite3.Database(
    DATABASE_ADDRESS,
    sqlite3.OPEN_READWRITE,
    err => {
      if (err) {
        handleErr(err);
      } else {
        console.log('DataBase Connected');
      }
      loadDataToDb(db);
    }
  );

  return db;
};

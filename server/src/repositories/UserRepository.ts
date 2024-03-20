import connection from "../db";
import User from "../models/User";
import { RowDataPacket, OkPacket } from 'mysql2';

interface IUserRepository {
  create(user: User): Promise<User>;
  findOne(criteria: { [key: string]: string }): Promise<User | null>;
  delete(userId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository { 

      create(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [user.name, user.email, user.password],
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                const userId = String(res.insertId); // Cast insertId to string
                this.findOne({ id: userId })
                  .then((user) => resolve(user!))
                  .catch(reject);
              }
            }
          );
        });
      }
      
      
      findOne(criteria: { [key: string]: string }): Promise<User | null> {
        const field = Object.keys(criteria)[0];
        const value = criteria[field];
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT * FROM users WHERE ?? = ?`,
            [field, value],
            (error, results: RowDataPacket[]) => { // Explicitly type results as RowDataPacket[]
              if (error) {
                reject(error);
              } else {
                const user = results[0] as User; // Assuming User is an interface or type
                resolve(user || null);
              }
            }
          );
        });
      }
      

      delete(userId: number): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>(
            "DELETE FROM users WHERE id = ?",
            [userId],
            (err, res) => {
              if (err) reject(err);
              else resolve(res.affectedRows);
            }
          );
        });
      }
      

      deleteAll(): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>("DELETE FROM users", (err, res) => {
            if (err) reject(err);
            else resolve(res.affectedRows);
          });
        });
      }
}

export default new UserRepository();

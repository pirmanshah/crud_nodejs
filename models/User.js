const db = require('../database');

module.exports = class User {
    constructor(name) {
        this.name = name;
    }
    save(){
        return db.execute(`
            INSERT INTO users
            (name) VALUES (?)
        `,[
            this.name
        ]);
    }
    static getAll(){
        return db.execute(`
            SELECT *
            FROM users
            ORDER BY name ASC
        `);
    }
    static getById(id){
        return db.execute(`
            SELECT * 
            FROM users
            WHERE id = ?
        `, [
            id
        ]);
    }
    static update(name, id){
        return db.execute(`
            UPDATE users
            SET name = ?
            WHERE id = ?
        `, [
            name, 
            id
        ]);
    }
    static delete(id){
        return db.execute(`
            DELETE
            FROM users
            WHERE id = ?
        `, [
            id
        ])
    }
}
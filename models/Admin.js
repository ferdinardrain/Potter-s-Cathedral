const pool = require('../config/database');

class Admin {
    static async findByUsername(username) {
        const query = 'SELECT * FROM admins WHERE username = ?';
        try {
            const [rows] = await pool.execute(query, [username]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        const query = 'SELECT * FROM admins WHERE id = ?';
        try {
            const [rows] = await pool.execute(query, [id]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    static async create(adminData) {
        const { username, password, email, role } = adminData;
        const query = `
      INSERT INTO admins (username, password, email, role, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, NOW(), NOW())
    `;
        const params = [username, password, email || null, role || 'admin'];

        try {
            const [result] = await pool.execute(query, params);
            return { id: result.insertId, username, email, role };
        } catch (error) {
            throw error;
        }
    }

    static async updatePassword(id, newPassword) {
        const query = 'UPDATE admins SET password = ?, updatedAt = NOW() WHERE id = ?';
        try {
            const [result] = await pool.execute(query, [newPassword, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Admin;

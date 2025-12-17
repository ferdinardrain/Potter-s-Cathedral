const pool = require('../config/database');
const crypto = require('crypto');

class PasswordReset {
    // Generate a secure random token
    static generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    // Create a password reset token for a username
    static async createResetToken(username) {
        const token = this.generateToken();
        // Token expires in 1 hour
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        const query = `
            INSERT INTO password_resets (username, token, expiresAt)
            VALUES (?, ?, ?)
        `;

        try {
            await pool.execute(query, [username, token, expiresAt]);
            return { token, expiresAt };
        } catch (error) {
            throw error;
        }
    }

    // Find a password reset by token
    static async findByToken(token) {
        const query = `
            SELECT * FROM password_resets 
            WHERE token = ? AND expiresAt > NOW()
        `;

        try {
            const [rows] = await pool.execute(query, [token]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Delete a password reset token
    static async deleteToken(token) {
        const query = 'DELETE FROM password_resets WHERE token = ?';

        try {
            const [result] = await pool.execute(query, [token]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Delete all tokens for a username
    static async deleteByUsername(username) {
        const query = 'DELETE FROM password_resets WHERE username = ?';

        try {
            await pool.execute(query, [username]);
        } catch (error) {
            throw error;
        }
    }

    // Clean up expired tokens (utility function)
    static async cleanupExpiredTokens() {
        const query = 'DELETE FROM password_resets WHERE expiresAt <= NOW()';

        try {
            const [result] = await pool.execute(query);
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PasswordReset;

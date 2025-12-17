const pool = require('../config/database');

class Member {
  static async create(memberData) {
    const {
      fullName, age, dob, residence, gpsAddress, phoneNumber, altPhoneNumber,
      nationality, maritalStatus, joiningDate, avatar
    } = memberData;

    const query = `
      INSERT INTO members (fullName, age, dob, residence, gpsAddress, phoneNumber, altPhoneNumber, nationality, maritalStatus, joiningDate, avatar, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const params = [fullName, age, dob, residence, gpsAddress, phoneNumber, altPhoneNumber, nationality, maritalStatus, joiningDate, avatar];

    try {
      const [result] = await pool.execute(query, params);
      return { id: result.insertId, ...memberData };
    } catch (error) {
      throw error;
    }
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM members';
    const params = [];

    if (filters.search || filters.maritalStatus) {
      query += ' WHERE';
      const conditions = [];
      if (filters.search) {
        conditions.push('(fullName LIKE ? OR phoneNumber LIKE ? OR residence LIKE ?)');
        params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
      }
      if (filters.maritalStatus) {
        conditions.push('maritalStatus = ?');
        params.push(filters.maritalStatus);
      }
      query += ' ' + conditions.join(' AND ');
    }

    query += ' ORDER BY createdAt DESC';

    try {
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM members WHERE id = ?';
    try {
      const [rows] = await pool.execute(query, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, memberData) {
    const {
      fullName, age, dob, residence, gpsAddress, phoneNumber, altPhoneNumber,
      nationality, maritalStatus, joiningDate, avatar
    } = memberData;

    const query = `
      UPDATE members SET
        fullName = ?, age = ?, dob = ?, residence = ?, gpsAddress = ?, phoneNumber = ?,
        altPhoneNumber = ?, nationality = ?, maritalStatus = ?, joiningDate = ?, avatar = ?,
        updatedAt = NOW()
      WHERE id = ?
    `;
    const params = [fullName, age, dob, residence, gpsAddress, phoneNumber, altPhoneNumber, nationality, maritalStatus, joiningDate, avatar, id];

    try {
      const [result] = await pool.execute(query, params);
      if (result.affectedRows === 0) {
        return null;
      }
      return { id, ...memberData };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM members WHERE id = ?';
    try {
      const [result] = await pool.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Member;

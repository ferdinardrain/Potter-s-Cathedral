const AuthService = require('./services/authService');
const Admin = require('./models/Admin');
const pool = require('./config/database');

async function debugFlow() {
    try {
        console.log('--- Starting Debug Flow ---');
        const username = 'admin';
        const newPassword = 'newpass123';

        // 1. Check if admin exists
        console.log(`1. Finding admin: ${username}`);
        const admin = await Admin.findByUsername(username);
        if (!admin) {
            console.error('Admin not found!');
            process.exit(1);
        }
        console.log('Admin found:', admin.id);

        // 2. Request Password Reset
        console.log('2. Requesting password reset...');
        const requestResult = await AuthService.requestPasswordReset(username);
        if (!requestResult.success) {
            console.error('Request failed:', requestResult.error);
            process.exit(1);
        }
        const token = requestResult.token;
        console.log('Token generated:', token);

        // 3. Reset Password
        console.log(`3. Reseting password to: ${newPassword}`);
        const resetResult = await AuthService.resetPassword(token, newPassword);
        if (!resetResult.success) {
            console.error('Reset failed:', resetResult.error);
            process.exit(1);
        }
        console.log('Password reset successful.');

        // 4. Verify Database Update (Check hash)
        const updatedAdmin = await Admin.findByUsername(username);
        console.log('Updated Admin check. Password hash starts with:', updatedAdmin.password.substring(0, 10));

        // 5. Try Login
        console.log('5. Attempting login with new password...');
        const loginResult = await AuthService.login(username, newPassword);

        if (loginResult.success) {
            console.log('✅ LOGIN SUCCESSFUL!');
        } else {
            console.error('❌ LOGIN FAILED:', loginResult.error);
            // Debug: Check why fail
            const isMatch = await AuthService.comparePassword(newPassword, updatedAdmin.password);
            console.log('Direct hash comparison result:', isMatch);
        }

    } catch (error) {
        console.error('Unexpected error:', error);
    } finally {
        // process.exit(0); 
        // Use pool.end() to exit cleanly if needed, or just let node finish
        // but since pool is persistent...
        process.exit(0);
    }
}

debugFlow();

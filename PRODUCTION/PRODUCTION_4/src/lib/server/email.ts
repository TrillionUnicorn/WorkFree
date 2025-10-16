import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import { PUBLIC_APP_URL } from '$env/static/public';

if (!RESEND_API_KEY) {
	console.warn('RESEND_API_KEY is not set - emails will not be sent');
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const FROM_EMAIL = 'WorkFree <noreply@workfree.com>';

export async function sendEmail(to: string, subject: string, html: string) {
	if (!resend) {
		console.log('Email would be sent to:', to);
		console.log('Subject:', subject);
		console.log('HTML:', html);
		return { success: false, message: 'Email service not configured' };
	}

	try {
		const { data, error } = await resend.emails.send({
			from: FROM_EMAIL,
			to,
			subject,
			html
		});

		if (error) {
			console.error('Email error:', error);
			return { success: false, message: error.message };
		}

		return { success: true, data };
	} catch (error) {
		console.error('Email error:', error);
		return { success: false, message: 'Failed to send email' };
	}
}

export async function sendVerificationEmail(email: string, token: string) {
	const verificationUrl = `${PUBLIC_APP_URL}/verify-email?token=${token}`;

	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Verify Your Email</title>
		</head>
		<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
			<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
				<h1 style="color: white; margin: 0; font-size: 28px;">WorkFree</h1>
			</div>
			<div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
				<h2 style="color: #1f2937; margin-top: 0;">Verify Your Email Address</h2>
				<p style="color: #4b5563; font-size: 16px;">
					Thank you for signing up for WorkFree! Please verify your email address by clicking the button below:
				</p>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${verificationUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
						Verify Email Address
					</a>
				</div>
				<p style="color: #6b7280; font-size: 14px;">
					Or copy and paste this link into your browser:<br>
					<a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
				</p>
				<p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
					This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
				</p>
			</div>
			<div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
				<p>© 2025 WorkFree. All rights reserved.</p>
			</div>
		</body>
		</html>
	`;

	return sendEmail(email, 'Verify Your Email - WorkFree', html);
}

export async function sendPasswordResetEmail(email: string, token: string) {
	const resetUrl = `${PUBLIC_APP_URL}/reset-password?token=${token}`;

	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Reset Your Password</title>
		</head>
		<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
			<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
				<h1 style="color: white; margin: 0; font-size: 28px;">WorkFree</h1>
			</div>
			<div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
				<h2 style="color: #1f2937; margin-top: 0;">Reset Your Password</h2>
				<p style="color: #4b5563; font-size: 16px;">
					We received a request to reset your password. Click the button below to create a new password:
				</p>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
						Reset Password
					</a>
				</div>
				<p style="color: #6b7280; font-size: 14px;">
					Or copy and paste this link into your browser:<br>
					<a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
				</p>
				<p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
					This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
				</p>
			</div>
			<div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
				<p>© 2025 WorkFree. All rights reserved.</p>
			</div>
		</body>
		</html>
	`;

	return sendEmail(email, 'Reset Your Password - WorkFree', html);
}

export async function sendWelcomeEmail(email: string, name: string) {
	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Welcome to WorkFree</title>
		</head>
		<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
			<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
				<h1 style="color: white; margin: 0; font-size: 28px;">Welcome to WorkFree!</h1>
			</div>
			<div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
				<h2 style="color: #1f2937; margin-top: 0;">Hi ${name}! 👋</h2>
				<p style="color: #4b5563; font-size: 16px;">
					Welcome to WorkFree - the future of VR training! We're excited to have you on board.
				</p>
				<p style="color: #4b5563; font-size: 16px;">
					Here's what you can do to get started:
				</p>
				<ul style="color: #4b5563; font-size: 16px;">
					<li>Browse our quest catalog</li>
					<li>Complete your first quest</li>
					<li>Unlock achievements</li>
					<li>Climb the leaderboard</li>
				</ul>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${PUBLIC_APP_URL}/quests" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
						Start Learning
					</a>
				</div>
				<p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
					Need help? Reply to this email or visit our help center.
				</p>
			</div>
			<div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
				<p>© 2025 WorkFree. All rights reserved.</p>
			</div>
		</body>
		</html>
	`;

	return sendEmail(email, 'Welcome to WorkFree! 🎉', html);
}

export async function sendAchievementEmail(email: string, achievementName: string) {
	const html = `
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Achievement Unlocked!</title>
		</head>
		<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
			<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
				<h1 style="color: white; margin: 0; font-size: 28px;">🏆 Achievement Unlocked!</h1>
			</div>
			<div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
				<h2 style="color: #1f2937; margin-top: 0; text-align: center;">${achievementName}</h2>
				<p style="color: #4b5563; font-size: 16px; text-align: center;">
					Congratulations! You've unlocked a new achievement. Keep up the great work!
				</p>
				<div style="text-align: center; margin: 30px 0;">
					<a href="${PUBLIC_APP_URL}/achievements" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
						View All Achievements
					</a>
				</div>
			</div>
			<div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
				<p>© 2025 WorkFree. All rights reserved.</p>
			</div>
		</body>
		</html>
	`;

	return sendEmail(email, `Achievement Unlocked: ${achievementName}! 🏆`, html);
}


export const emailVerificationTemplate = (username, verificationLink) => {
  return `
<div style="margin: 0; padding: 0; background-color: #f4f7fb; font-family: 'Segoe UI', Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f7fb; padding: 30px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 660px; border-collapse: separate;">
          <tr>
            <td style="padding: 0 0 12px 0; text-align: center;">
              <span style="display: inline-block; border: 1px solid #d5deee; border-radius: 999px; padding: 7px 14px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #5b6b86; background-color: #eef3fb;">
                Perplexity Account Security
              </span>
            </td>
          </tr>

          <tr>
            <td style="border-radius: 22px; overflow: hidden; border: 1px solid #dce5f3; background-color: #ffffff; box-shadow: 0 14px 42px rgba(31, 55, 112, 0.1);">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding: 34px 30px 26px 30px; background: radial-gradient(circle at 14% 8%, #d9f8f3 0%, #ecf6ff 40%, #f9fbff 100%); border-bottom: 1px solid #e8eef8;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="84" valign="top" style="padding-right: 14px;">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILd_ishBQH4jU2uilXTkVEh6HRzF5NYIlLw&s"
                            alt="Perplexity Logo"
                            height="72"
                            style="display: block; border-radius: 16px; border: 1px solid #d7e6f4;"
                          />
                        </td>
                        </tr>
                        <tr>
                        <td valign="middle">
                          <h1 style="margin: 0; color: #0f1f3d; font-size: 30px; line-height: 1.2; font-weight: 700; letter-spacing: -0.02em;">Verify your email</h1>
                          <p style="margin: 8px 0 0 0; color: #4d5f7d; font-size: 14px; line-height: 1.7;">
                            One secure step to unlock your full Perplexity experience.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 30px 30px 22px 30px; color: #273750;">
                    <p style="margin: 0 0 14px 0; font-size: 16px; line-height: 1.7;">Hi ${username},</p>
                    <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.9; color: #4a5b77;">
                      Welcome aboard. Please verify your email address so we can keep your account protected and personalize your experience from the very first session.
                    </p>

                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 22px 0;">
                      <tr>
                        <td align="center" style="border-radius: 12px; background: linear-gradient(135deg, #1f365e 0%, #2f7b73 100%); box-shadow: 0 8px 20px rgba(20, 50, 95, 0.24);">
                          <a
                            href="${verificationLink}"
                            style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; border-radius: 12px; letter-spacing: 0.01em;"
                          >
                            Confirm Email Address
                          </a>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 18px 0; border: 1px dashed #cfdbec; border-radius: 12px; background-color: #f8fbff;">
                      <tr>
                        <td style="padding: 14px 16px;">
                          <p style="margin: 0 0 7px 0; font-size: 12px; line-height: 1.5; color: #66789a; text-transform: uppercase; letter-spacing: 0.08em;">Alternative Verification Link</p>
                          <p style="margin: 0; word-break: break-word; font-size: 13px; line-height: 1.7; color: #2554a3;">${verificationLink}</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0; font-size: 13px; line-height: 1.8; color: #75839b;">
                      Did not sign up? You can safely ignore this email. No changes will be made to your inbox or data.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 18px 30px 26px 30px; border-top: 1px solid #e9eef7; text-align: center; background-color: #fcfdff;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #7a8ca8;">Designed and developed by</p>
                    <p style="margin: 0; font-size: 13px; color: #1d2f4d; font-weight: 600;">
                      <a href="https://www.devaditya.dev" style="color: #2f7b73; text-decoration: none;">Aditya Gupta</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</div>
`;
};

export const emailVerifiedTemplate = (username) => {
          const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7fb;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;   
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 14px 42px rgba(31, 55, 112, 0.1);
            padding: 30px;
            text-align: center;
        }
        .logo {
            height: 72px;
            border-radius: 16px;
            border: 1px solid #d7e6f4;
            margin-bottom: 20px;
        }
        h1 {
            color: #0f1f3d;
            font-size: 28px;
            margin-bottom: 10px;
        }
        p {
            color: #4d5f7d; 
            font-size: 16px;
            line-height: 1.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILd_ishBQH4jU2uilXTkVEh6HRzF5NYIlLw&s" alt="Perplexity Logo" class="logo">
        <h1>Email Verified Successfully!</h1>
        <p>Thank you, ${username}! Your email has been verified. You can now log in to your Perplexity account and start exploring.</p>
        <a href="http://localhost:3000/login" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #1f365e; color: #ffffff; text-decoration: none; border-radius: 8px;">Go to Login</a>
    </div>
</body>
</html>`;
  return htmlContent;
}
export const emailAlreadyVerifiedTemplate = (username) => {
          const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7fb;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;   
            margin: 50px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 14px 42px rgba(31, 55, 112, 0.1);
            padding: 30px;
            text-align: center;
        }
        .logo {
            height: 72px;
            border-radius: 16px;
            border: 1px solid #d7e6f4;
            margin-bottom: 20px;
        }
        h1 {
            color: #0f1f3d;
            font-size: 28px;
            margin-bottom: 10px;
        }
        p {
            color: #4d5f7d; 
            font-size: 16px;
            line-height: 1.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILd_ishBQH4jU2uilXTkVEh6HRzF5NYIlLw&s" alt="Perplexity Logo" class="logo">
        <h1>Your email is already verified.</h1>
        <p>Thank you, ${username}! Your email has been verified. You can now log in to your Perplexity account and start exploring.</p>
        <a href="http://localhost:3000/login" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #1f365e; color: #ffffff; text-decoration: none; border-radius: 8px;">Go to Login</a>
    </div>
</body>
</html>`;
  return htmlContent;
}


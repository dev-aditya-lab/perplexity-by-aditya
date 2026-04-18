export const accountLoginMailTemplate = (username) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Login Alert</title>
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
<body>  <div class="container">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILd_ishBQH4jU2uilXTkVEh6HRzF5NYIlLw&s" alt="Logo" class="logo">
        <h1>New Login Detected</h1>
        <p> Hello <b>${username}</b>,</p>
        <p>We noticed a new login to your account. If this was you, you can safely ignore this email. If you did not log in, please secure your account immediately by changing your password.</p>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <p>Best regards,<br>The Perplexity Team</p>
      </div>
    </body>
</html>`;
};
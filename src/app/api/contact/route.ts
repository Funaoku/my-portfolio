// app/api/contact/route.ts
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 環境変数で SMTP 設定を隠す
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,                    // 465 の場合 true
      auth: {
        user: process.env.SMTP_USER,   // 例: Gmail の場合は Gmail アドレス
        pass: process.env.SMTP_PASS,   // アプリ パスワード推奨
      },
    });

    await transport.sendMail({
      from: `"${name}" <${email}>`,    // 送信者
      to: process.env.CONTACT_TO,      // あなた（受信者）
      subject: `お問い合わせ: ${name}`,
      text: message,
      replyTo: email,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('メール送信失敗', err);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}

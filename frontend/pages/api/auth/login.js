import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {

        try {
            const resApi = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: req.body.email,
                    password: req.body.password
                })
            });

            const data = await resApi.json();

            if (resApi.ok) {
                res.setHeader('Set-Cookie', cookie.serialize('token', data.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    path: '/'
                }));

                res.status(200).json({ user: data.user })
            } else {
                res.status(resApi.status).json({ message: data })
            }
        } catch (e) {
            res.status(500).json({ message: { 'err': ['Server Error'] } })
        }

    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
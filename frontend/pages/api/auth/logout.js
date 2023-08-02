import cookie from 'cookie'

export default async function handler(req, res) {
    if (req.method === 'POST') {

        try {
            const resApi = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${req.cookies.token}`
                }
            });

            const data = await resApi.json();

            console.log(data);

            if (resApi.ok) {
                res.setHeader('Set-Cookie', cookie.serialize('token', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    expires: new Date(0),
                    path: '/'
                }));

                res.status(200).json({ message: 'Success' })
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
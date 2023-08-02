import { toast } from "react-toastify";
import { useEffect } from "react";

const Posts = ({ posts, error }) => {
    useEffect(() => {
        error && toast.error(error)
    }, [error]);

    return (
        <div className="container mt-5">
            <div className="row g-3">
                {posts && posts.map(post => (
                    <div key={post.id} className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts;

export async function getServerSideProps({ req }) {
    try {
        const resApi = await fetch('http://localhost:8000/api/posts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${req.cookies.token}`
            }
        });
        const data = await resApi.json();

        if (resApi.ok) {
            return {
                props: {
                    posts: data.posts,
                    error: null
                }
            }
        } else {
            return {
                props: {
                    posts: null,
                    error: data
                }
            }
        }

    } catch (e) {
        return {
            props: {
                posts: null,
                error: 'Server Error'
            }
        }
    }
}
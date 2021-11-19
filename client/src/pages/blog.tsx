import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import UserContext from '../contexts/user';
import IBlog from '../interfaces/blog';
import IPageProps from '../interfaces/page';
import config from '../config/config';
import LoadingComponent, { Loading } from '../components/LoadingComponent';
import { Button, Container, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Navigation from '../components/Navigation';
import ErrorText from '../components/ErrorText';
import Header from '../components/Header';
import IUser from '../interfaces/user';
import { Link } from 'react-router-dom';

const BlogPage: React.FC<IPageProps> = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    const [_id, setId] = useState<string>('');
    const [blog, setBlog] = useState<IBlog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const [modal, setModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);

    const { user } = useContext(UserContext).userState;

    useEffect(() => {
        let blogID = params.blogID;

        if (blogID) {
            setId(blogID);
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (_id !== '') getBlog();
    }, [_id]);

    const getBlog = async () => {
        try {
            const response = await axios.get(`${config.server.url}/blogs/read/${_id}`);

            if (response.status === 200 || response.status === 304) {
                setBlog(response.data.blog);
            } else {
                setError(`Unable to retrieve blog ${_id}`);
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const deleteBlog = async () => {
        setDeleting(true);
        try {
            const response = await axios.delete(`${config.server.url}/blogs/${_id}`);

            if (response.status === 200) {
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setError(`Unable to delete blog ${_id}`);
                setDeleting(false);
            }
        } catch (error) {
            setError((error as Error).message);
            setDeleting(false);
        }
    };

    if (loading) return <LoadingComponent>Loading Blog ...</LoadingComponent>;

    if (blog) {
        return (
            <Container fluid className="p-0">
                <Navigation />
                <Modal isOpen={modal}>
                    <ModalHeader>Delete</ModalHeader>
                    <ModalBody>
                        {deleting ? <Loading /> : 'Are you sure want to delete this blog?'}
                        <ErrorText error={error} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="danger" onClick={deleteBlog}>
                            Delete Permanently
                        </Button>

                        <Button color="secondary" onClick={() => setModal(false)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

                <Header image={blog.picture || undefined} headline={blog.headline} title={blog.title}>
                    <p className="text-white">
                        Posted by {(blog.author as IUser).name} on {new Date(blog.createdAt).toLocaleString()}
                    </p>
                </Header>

                <Container className="mt-5">
                    {user._id === (blog.author as IUser)._id && (
                        <Container fluid className="p-0">
                            <Button color="info" className="mr-2" tag={Link} to={`/edit/${blog._id}`}>
                                <i className="fas fa-edit"></i>
                            </Button>

                            <Button color="danger" onClick={() => setModal(true)}>
                                <i className="far fa-trash-alt mr-2"></i> Delete
                            </Button>

                            <hr />
                        </Container>
                    )}

                    <ErrorText error={error} />

                    <div
                        dangerouslySetInnerHTML={{
                            __html: blog.content
                        }}
                    />
                </Container>
            </Container>
        );
    } else {
        return <Navigate to="/" />;
    }
};

export default BlogPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

export interface IBLogPreviewProps {
    _id: string;
    title: string;
    author: string;
    headline: string;
    createdAt: string;
    updatedAt: string;
}

const BlogPreview: React.FC<IBLogPreviewProps> = (props) => {
    const { _id, title, author, headline, createdAt, updatedAt, children } = props;

    return (
        <Card className="border-0">
            <CardBody className="p-0">
                <Link to={`/blogs/:${_id}`} style={{ textDecoration: 'none' }} className="text-primary">
                    <h1>
                        <strong>{title}</strong>
                    </h1>

                    <h3>{headline}</h3>
                    <br />
                </Link>

                {createdAt !== updatedAt ? (
                    <p>
                        Updated by {author} as {new Date(updatedAt).toLocaleString()}
                    </p>
                ) : (
                    <p>
                        Posted by {author} as {new Date(createdAt).toLocaleString()}
                    </p>
                )}

                {children}
            </CardBody>{' '}
        </Card>
    );
};

export default BlogPreview;

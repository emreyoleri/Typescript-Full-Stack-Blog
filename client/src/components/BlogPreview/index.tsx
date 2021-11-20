import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

export interface IBLogPreviewProps {
    _id: string;
    title: string;
    author: string;
    picture?: string | null;
    headline: string;
    createdAt: string;
    updatedAt: string;
}

const BlogPreview: React.FC<IBLogPreviewProps> = (props) => {
    const { _id, title, author, headline, createdAt, updatedAt, picture, children } = props;

    return (
        <Card className="border-2 p-3">
            {picture && <CardImg src={picture} alt="" />}
            <CardBody>
                <CardTitle tag="h1">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h3">
                    {headline}
                </CardSubtitle>
                <CardText>{createdAt !== updatedAt ? `Updated by ${author} as ${new Date(createdAt).toLocaleString()}` : `Posted by ${author} as ${new Date(createdAt).toLocaleString()}`}</CardText>
                <Button tag={Link} to={`/blogs/${_id}`} color="success">
                    Preview
                </Button>
            </CardBody>
            {children}
        </Card>
    );
};

export default BlogPreview;

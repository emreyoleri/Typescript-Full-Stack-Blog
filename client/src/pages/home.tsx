import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import IPageProps from '../interfaces/page';

const HomePage: React.FC<IPageProps> = (props) => {
    return (
        <Container fluid className="p-0">
            <Navigation />
            <Header title="A Emre Blog Website" headline="Check out what people have to say!" />

            <Container className="mt-5">Blog stuff here ....</Container>
        </Container>
    );
};

export default HomePage;

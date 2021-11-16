import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavbarBrand, NavbarText } from 'reactstrap';
import UserContext, { initialUserState } from '../../contexts/user';
import CenterPiece from '../CenterPiece';

export interface INavigationProps {}

const Navigation: React.FC<INavigationProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const userContext = useContext(UserContext);
    const { user } = userContext.userState;

    const Logout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 800);

        setTimeout(() => {
            userContext.userDispatch({ type: 'logout', payload: initialUserState });
        }, 1200);
    };
    return (
        <>
            <Navbar color="light" light sticky="top" expand="md">
                <Container>
                    <NavbarBrand tag={Link} to="/">
                        📝
                    </NavbarBrand>
                    <Nav className="mr-auto" navbar />
                    {user._id === '' ? (
                        /* this will not be visible */
                        <div>
                            <NavbarText tag={Link} to="/login">
                                Login
                            </NavbarText>

                            <NavbarText className="mr-2 ml-2">|</NavbarText>

                            <NavbarText tag={Link} to="/register">
                                Sign Up
                            </NavbarText>
                        </div>
                    ) : (
                        <div>
                            <Button outline tag={Link} to="/edit">
                                Post a Blog
                            </Button>
                            <NavbarText className="mr-2 ml-2">|</NavbarText>
                            <Button color="danger" outline onClick={Logout}>
                                Logout
                            </Button>
                        </div>
                    )}
                </Container>
            </Navbar>
            {loading ? (
                <CenterPiece>
                    <div className="text-center" style={{ width: '300px' }}>
                        <div className="stage">
                            <div className="dot-bricks" />
                        </div>
                    </div>
                </CenterPiece>
            ) : null}
        </>
    );
};

export default Navigation;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import history from '~/services/history';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile, LinkMenu } from './styles';
import logo from '~/assets/fastfeet-logo.png';

export default function Header() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user.profile);
    function handleSignOut() {
        dispatch(signOut());
    }
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="Fastfeet" />
                    <LinkMenu
                        to="/delivery"
                        activelabel={(
                            history.location.pathname === '/delivery'
                        ).toString()}
                    >
                        ENCOMENDAS
                    </LinkMenu>
                    <LinkMenu
                        to="/deliveryman"
                        activelabel={(
                            history.location.pathname === '/deliveryman'
                        ).toString()}
                    >
                        ENTREGADORES
                    </LinkMenu>
                    <LinkMenu
                        to="/recipient"
                        activelabel={(
                            history.location.pathname === '/recipient'
                        ).toString()}
                    >
                        DESTINATARIOS
                    </LinkMenu>
                    <LinkMenu
                        to="/problem"
                        activelabel={(
                            history.location.pathname === '/problem'
                        ).toString()}
                    >
                        PROBLEMAS
                    </LinkMenu>
                </nav>
                <aside>
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <button type="button" onClick={handleSignOut}>
                                Sair
                            </button>
                        </div>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}

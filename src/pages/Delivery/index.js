import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Container, Title, HeaderActions } from './styles';
import SearchInput from '~/components/SearchInput';

export default function Delivery() {
    return (
        <Container>
            <Title>Gerenciando Encomendas</Title>
            <HeaderActions>
                <SearchInput placeholder="Buscar por Encomendas" />
                <button type="button">
                    <FaPlus />
                    Cadastrar
                </button>
            </HeaderActions>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Destinatário</th>
                        <th>Entregador</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#01</td>
                        <td>Erick NIlson Souza</td>
                        <td>Marcelo Silva</td>
                        <td>Salvador</td>
                        <td>Bahia</td>
                        <td>ENTREGUE</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>Erick NIlson Souza</td>
                        <td>Marcelo Silva</td>
                        <td>Salvador</td>
                        <td>Bahia</td>
                        <td>ENTREGUE</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>Erick NIlson Souza</td>
                        <td>Marcelo Silva</td>
                        <td>Salvador</td>
                        <td>Bahia</td>
                        <td>ENTREGUE</td>
                        <td>...</td>
                    </tr>
                    <tr>
                        <td>#01</td>
                        <td>Erick NIlson Souza</td>
                        <td>Marcelo Silva</td>
                        <td>Salvador</td>
                        <td>Bahia</td>
                        <td>ENTREGUE</td>
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    );
}

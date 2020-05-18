import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Container, Title, HeaderActions } from './styles';
import history from '~/services/history';
import SearchInput from '~/components/SearchInput';
import Initials from '~/components/Initials';
import Actions from '~/components/Actions';
import Pagination from '~/components/Pagination';
import Table from '~/components/Table';
import api from '~/services/api';

export default function Deliveryman() {
    const [deliverymans, setDeliverymans] = useState([]);
    const [deliverymansTotal, setDeliverymansTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(3);

    const listDeliverymans = async (
        name = null,
        pageInformed = null,
        perPageInformed = null
    ) => {
        let pageSelected = page;
        if (pageInformed) {
            pageSelected = pageInformed;
            setPage(pageInformed);
        }
        let perPageSelected = perPage;
        if (perPageInformed) {
            perPageSelected = perPageInformed;
            setPerPage(perPageInformed);
        }
        const route = name
            ? `deliverymans?page=${pageSelected}&perPage=${perPageSelected}&q=${name}`
            : `deliverymans?page=${pageSelected}&perPage=${perPageSelected}`;
        const { data } = await api.get(route);
        const { count, rows } = data;

        setDeliverymansTotal(count);
        setDeliverymans(rows);
    };

    useEffect(() => {
        listDeliverymans();
    }, []);

    const handleSearch = (value) => {
        if (value.length > 2) {
            listDeliverymans(value);
        } else {
            listDeliverymans();
        }
    };

    const handleCreate = async () => {
        history.push('/deliveryman/store');
    };

    const handleUpdate = (id) => {
        history.push(`/deliveryman/${id}`);
    };
    const handleRemove = async (id) => {
        await api.delete(`/deliverymans/${id}`);
        listDeliverymans();
    };
    return (
        <Container>
            <Title>Gerenciando Entregadores</Title>
            <HeaderActions>
                <SearchInput
                    placeholder="Buscar por Entregador"
                    onchange={handleSearch}
                />
                <button type="button" onClick={handleCreate}>
                    <FaPlus />
                    Cadastrar
                </button>
            </HeaderActions>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {deliverymans.map((d) => (
                        <tr key={d.id}>
                            <td>#{d.id}</td>
                            <td>
                                <Initials
                                    name={d.name}
                                    image={d?.avatar?.url}
                                />
                            </td>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>
                                <Actions
                                    id={d.id}
                                    update={handleUpdate}
                                    remove={handleRemove}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                listfunction={listDeliverymans}
                page={page}
                perpage={parseInt(perPage, 10)}
                totalregisters={deliverymansTotal}
            />
        </Container>
    );
}

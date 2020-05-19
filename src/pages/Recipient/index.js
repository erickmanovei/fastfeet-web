import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Container, Title, HeaderActions } from './styles';
import history from '~/services/history';
import SearchInput from '~/components/SearchInput';
import Actions from '~/components/Actions';
import Pagination from '~/components/Pagination';
import Table from '~/components/Table';
import api from '~/services/api';

export default function Recipient() {
    const [recipients, setRecipients] = useState([]);
    const [recipientsTotal, setRecipientsTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(3);

    const listRecipients = async (
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
            ? `recipients?page=${pageSelected}&perPage=${perPageSelected}&q=${name}`
            : `recipients?page=${pageSelected}&perPage=${perPageSelected}`;
        const { data } = await api.get(route);
        const { count, rows } = data;

        setRecipientsTotal(count);
        setRecipients(rows);
    };

    useEffect(() => {
        listRecipients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (value) => {
        if (value.length > 2) {
            listRecipients(value);
        } else {
            listRecipients();
        }
    };

    const handleCreate = async () => {
        history.push('/recipient/store');
    };

    const handleUpdate = (id) => {
        history.push(`/recipient/${id}`);
    };
    const handleRemove = async (id) => {
        await api.delete(`/recipients/${id}`);
        listRecipients();
    };
    return (
        <Container>
            <Title>Gerenciando Destinatários</Title>
            <HeaderActions>
                <SearchInput
                    placeholder="Buscar por Destinatário"
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
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {recipients.length === 0 ? (
                        <tr>
                            <td colSpan={4} align="center">
                                Não existem registros.
                            </td>
                        </tr>
                    ) : null}
                    {recipients.map((d) => (
                        <tr key={d.id}>
                            <td>#{d.id}</td>
                            <td>{d.name}</td>
                            <td>
                                {d.address}, {d.address_number}, {d.district} -{' '}
                                {d.city}
                            </td>
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
                listfunction={listRecipients}
                page={page}
                perpage={parseInt(perPage, 10)}
                totalregisters={recipientsTotal}
            />
        </Container>
    );
}

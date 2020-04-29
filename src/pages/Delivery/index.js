import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Container, Title, HeaderActions, Name } from './styles';
import SearchInput from '~/components/SearchInput';
import Badge from '~/components/Badge';
import Initials from '~/components/Initials';
import Actions from '~/components/Actions';
import Pagination from '~/components/Pagination';
import Table from '~/components/Table';
import api from '~/services/api';

export default function Delivery() {
    const [deliveries, setDeliveries] = useState([]);
    const [deliveriesTotal, setDeliveriesTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(3);

    const listDeliveries = async (
        product = null,
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
        const route = product
            ? `deliveries?page=${pageSelected}&perPage=${perPageSelected}&q=${product}`
            : `deliveries?page=${pageSelected}&perPage=${perPageSelected}`;
        const { data } = await api.get(route);
        const { count, rows } = data;

        const dataWithStatus = rows.map((d) => {
            if (d.canceled_at) {
                return { ...d, status: 'CANCELADA' };
            }
            if (d.start_date === null) {
                return { ...d, status: 'PENDENTE' };
            }
            if (d.end_date === null) {
                return { ...d, status: 'RETIRADA' };
            }
            return { ...d, status: 'ENTREGUE' };
        });
        setDeliveriesTotal(count);
        setDeliveries(dataWithStatus);
    };

    useEffect(() => {
        listDeliveries();
    }, []);

    const handleSearch = (value) => {
        if (value.length > 2) {
            listDeliveries(value);
        } else {
            listDeliveries();
        }
    };

    return (
        <Container>
            <Title>Gerenciando Encomendas</Title>
            <HeaderActions>
                <SearchInput
                    placeholder="Buscar por Encomendas"
                    onchange={handleSearch}
                />
                <button type="button">
                    <FaPlus />
                    Cadastrar
                </button>
            </HeaderActions>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Destinatário</th>
                        <th>Entregador</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((d) => (
                        <tr key={d.id}>
                            <td>#{d.id}</td>
                            <td>{d.product}</td>
                            <td>
                                <Name>
                                    <Initials name={d.recipient.name} />
                                    {d.recipient.name}
                                </Name>
                            </td>
                            <td>{d.deliveryman.name}</td>
                            <td>{d.recipient.city}</td>
                            <td>{d.recipient.state}</td>
                            <td>
                                <Badge label={d.status} />
                            </td>
                            <td>
                                <Actions id={d.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                listfunction={listDeliveries}
                page={page}
                perpage={perPage}
                totalregisters={deliveriesTotal}
            />
        </Container>
    );
}

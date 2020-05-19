import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-awesome-modal';
import { Container, Title, HeaderActions, Name, ModalContent } from './styles';
import history from '~/services/history';
import SearchInput from '~/components/SearchInput';
import Badge from '~/components/Badge';
import Initials from '~/components/Initials';
import Actions from '~/components/Actions';
import Pagination from '~/components/Pagination';
import Table from '~/components/Table';
import api from '~/services/api';

export default function Delivery() {
    const [deliveries, setDeliveries] = useState([]);
    const [delivery, setDelivery] = useState(null);
    const [deliveriesTotal, setDeliveriesTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [showModal, setShowModal] = useState(false);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (value) => {
        if (value.length > 2) {
            listDeliveries(value);
        } else {
            listDeliveries();
        }
    };

    const handleCreate = async () => {
        history.push('/delivery/store');
    };
    const handleShow = async (id) => {
        const { data } = await api.get(`/deliveries/${id}`);
        setDelivery(data);
        setShowModal(true);
    };
    const handleUpdate = (id) => {
        history.push(`/delivery/${id}`);
    };
    const handleRemove = async (id) => {
        await api.delete(`/deliveries/${id}`);
        listDeliveries();
    };
    return (
        <Container>
            <Title>Gerenciando Encomendas</Title>
            <HeaderActions>
                <SearchInput
                    placeholder="Buscar por Encomendas"
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
                    {deliveries.length === 0 ? (
                        <tr>
                            <td colSpan={8} align="center">
                                Não existem registros.
                            </td>
                        </tr>
                    ) : null}
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
                                <Actions
                                    id={d.id}
                                    show={handleShow}
                                    update={handleUpdate}
                                    remove={handleRemove}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                listfunction={listDeliveries}
                page={page}
                perpage={parseInt(perPage, 10)}
                totalregisters={deliveriesTotal}
            />
            <Modal
                visible={showModal}
                width="400"
                effect="fadeInUp"
                onClickAway={() => setShowModal(false)}
            >
                {delivery ? (
                    <ModalContent>
                        <h3>Informações da Encomenda</h3>
                        <p>{`${delivery.recipient.address}, ${delivery.recipient.address_number}, ${delivery.recipient.address_complement}`}</p>
                        <p>{`${delivery.recipient.city} - ${delivery.recipient.state}`}</p>
                        <hr />
                        <h3>Datas</h3>
                        <p>
                            <strong>Retirada: </strong> {delivery.start_date}
                        </p>
                        <p>
                            <strong>Entrega: </strong> {delivery.end_date}
                        </p>
                        <hr />
                        <h3>Assinatura do destinatário</h3>
                        {delivery.signature_id ? (
                            <img
                                alt="Assinatura"
                                src={delivery.signature.url}
                            />
                        ) : (
                            <p>Não possui assunatura.</p>
                        )}
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Fechar
                        </button>
                    </ModalContent>
                ) : null}
            </Modal>
        </Container>
    );
}

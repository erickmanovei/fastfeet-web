import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import { toast } from 'react-toastify';
import { Container, Title, ModalContent, Abbreviate } from './styles';
import Actions from '~/components/Actions';
import Pagination from '~/components/Pagination';
import Table from '~/components/Table';
import api from '~/services/api';

export default function Problem() {
    const [problems, setProblems] = useState([]);
    const [problem, setProblem] = useState({});
    const [problemsTotal, setProblemsTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(3);
    const [showModal, setShowModal] = useState(false);

    const listProblems = async (
        _,
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
        const { data } = await api.get(
            `/deliveryproblems?page=${pageSelected}&perPage=${perPageSelected}`
        );
        const { count, rows } = data;

        setProblemsTotal(count);
        setProblems(rows);
    };

    useEffect(() => {
        listProblems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemove = async (id) => {
        try {
            await api.delete(`/problem/${id}/cancel-delivery`);
            listProblems();
            toast.success('Cancelamento realizado com sucesso!');
        } catch (err) {
            toast.error('Erro ao tentar cancelar!');
        }
    };
    const handleShow = async (id) => {
        const [filteredProblem] = problems.filter((e) => e.id === id);
        setProblem(filteredProblem);
        setShowModal(true);
    };
    return (
        <Container>
            <Title>Problemas na Entrega</Title>
            <Table>
                <thead>
                    <tr>
                        <th>Encomenda</th>
                        <th>Problema</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.length === 0 ? (
                        <tr>
                            <td colSpan={3} align="center">
                                Não existem registros.
                            </td>
                        </tr>
                    ) : null}
                    {problems.map((d) => (
                        <tr key={d.id}>
                            <td>#{d.delivery.id}</td>
                            <td>
                                <Abbreviate>{d.description}</Abbreviate>
                            </td>
                            <td>
                                <Actions
                                    id={d.id}
                                    show={handleShow}
                                    remove={handleRemove}
                                    removelabel="Cancelar encomenda"
                                    removeid={d.delivery.id}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                listfunction={listProblems}
                page={parseInt(page, 10)}
                perpage={parseInt(perPage, 10)}
                totalregisters={problemsTotal}
            />
            <Modal
                visible={showModal}
                width="400"
                effect="fadeInUp"
                onClickAway={() => setShowModal(false)}
            >
                {problem ? (
                    <ModalContent>
                        <h3>VISUALIZAR PROBLEMA</h3>
                        <p>{problem.description}</p>
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

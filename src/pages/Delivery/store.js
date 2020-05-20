import React, { useEffect, useState } from 'react';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactSelect from '~/components/ReactSelect';
import {
    Container,
    HeaderActionsStore,
    ButtonActionsStore,
    ContentStore,
    SelectRow,
    SelectItem,
    InputField,
} from './styles';
import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
    recipient_id: Yup.number()
        .required('Campo obrigatório')
        .typeError('Campo obrigatório'),
    deliveryman_id: Yup.number()
        .required('Campo obrigatório')
        .typeError('Campo obrigatório'),
    product: Yup.string().required('Campo obrigatório'),
});

export default function DeliveryStore(props) {
    const [deliverymans, setDeliverymans] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [delivery, setDelivery] = useState({});

    useEffect(() => {
        const { id } = props?.match?.params;
        const getDelivery = async () => {
            const { data } = await api.get(`/deliveries/${id}`);
            setDelivery(data);
        };
        if (id) {
            getDelivery();
        }

        const listRecipients = async () => {
            const { data } = await api.get('/recipients');
            const simpleData = data.rows.map((e) => ({
                id: e.id,
                title: e.name,
            }));
            setRecipients(simpleData);
        };
        listRecipients();

        const listDeliveryman = async () => {
            const { data } = await api.get('/deliverymans');
            const simpleData = data.rows.map((e) => ({
                id: e.id,
                title: e.name,
            }));
            setDeliverymans(simpleData);
        };
        listDeliveryman();
    }, [delivery.deliveryman_id, delivery.recipient_id, props]);

    const handleSubmit = async ({ recipient_id, deliveryman_id, product }) => {
        try {
            if (delivery?.id) {
                await api.put(`/deliveries/${delivery.id}`, {
                    recipient_id,
                    deliveryman_id,
                    product,
                });
                toast.success('Alteração realizada com sucesso!');
            } else {
                await api.post('/deliveries', {
                    recipient_id,
                    deliveryman_id,
                    product,
                });
                toast.success('Cadastro realizado com sucesso!');
                history.push('/delivery');
            }
        } catch (err) {
            toast.error(
                `Ocorreu um erro ao tentar cadastrar/alterar: ${err.message}`
            );
        }
    };

    return (
        <Container>
            <Form
                initialData={delivery}
                schema={schema}
                onSubmit={handleSubmit}
            >
                <HeaderActionsStore>
                    <h1>
                        {delivery?.id
                            ? 'Alterar Encomenda'
                            : 'Cadastro de Encomendas'}
                    </h1>
                    <div>
                        <ButtonActionsStore
                            type="button"
                            back
                            onClick={() => history.push('/delivery')}
                        >
                            <FaArrowLeft />
                            Voltar
                        </ButtonActionsStore>
                        <ButtonActionsStore type="submit">
                            <FaCheck />
                            Salvar
                        </ButtonActionsStore>
                    </div>
                </HeaderActionsStore>
                <ContentStore>
                    <SelectRow>
                        <SelectItem>
                            <ReactSelect
                                name="recipient_id"
                                label="Destinatário"
                                placeholder="Escolha o Destinatário"
                                defaultOptions={recipients}
                            />
                        </SelectItem>
                        <SelectItem>
                            <ReactSelect
                                label="Entregador"
                                name="deliveryman_id"
                                placeholder="Escolha o Entregador"
                                defaultOptions={deliverymans}
                            />
                        </SelectItem>
                    </SelectRow>
                    <InputField>
                        <Input
                            label="Nome do Produto"
                            placeholder="Digite o nome do produto"
                            name="product"
                        />
                    </InputField>
                </ContentStore>
            </Form>
        </Container>
    );
}

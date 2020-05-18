import React, { useEffect, useState } from 'react';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import AsyncSelect from 'react-select/async';
import { toast } from 'react-toastify';
import {
    Container,
    HeaderActionsStore,
    ButtonActionsStore,
    ContentStore,
    SelectRow,
    SelectItem,
    LabelSelect,
    InputField,
    SpanError,
} from './styles';
import history from '~/services/history';
import api from '~/services/api';

export default function DeliveryStore(props) {
    const [deliverymans, setDeliverymans] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [recipient, setRecipient] = useState({});
    const [deliveryman, setDeliveryman] = useState({});
    const [product, setProduct] = useState('');
    const [showRecipientError, setShowRecipientError] = useState(false);
    const [showDeliverymanError, setShowDeliverymanError] = useState(false);
    const [showDProductError, setShowDProductError] = useState(false);
    const [delivery, setDelivery] = useState({});

    const filterRecipient = (inputValue) => {
        return recipients.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
    const promiseOptionsRecipient = (inputValue) =>
        new Promise((resolve) => {
            resolve(filterRecipient(inputValue));
        });

    const filterDeliveryman = (inputValue) => {
        return deliverymans.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
    const promiseOptionsDeliveryman = (inputValue) =>
        new Promise((resolve) => {
            resolve(filterDeliveryman(inputValue));
        });

    useEffect(() => {
        const { id } = props?.match?.params;
        const getDelivery = async () => {
            const { data } = await api.get(`/deliveries/${id}`);
            setDelivery(data);
            setProduct(data.product);
        };
        if (id) {
            getDelivery();
        }

        const listRecipients = async () => {
            const { data } = await api.get('/recipients');
            const simpleData = data.rows.map((e) => ({
                value: e.id,
                label: e.name,
            }));
            setRecipients(simpleData);
            if (id) {
                const [recipientDefault] = simpleData.filter(
                    (e) =>
                        parseInt(e.value, 10) ===
                        parseInt(delivery.recipient_id, 10)
                );
                setRecipient(recipientDefault);
            }
        };
        listRecipients();

        const listDeliveryman = async () => {
            const { data } = await api.get('/deliverymans');
            const simpleData = data.rows.map((e) => ({
                value: e.id,
                label: e.name,
            }));
            setDeliverymans(simpleData);
            if (id) {
                const [deliverymanDefault] = simpleData.filter(
                    (e) =>
                        parseInt(e.value, 10) ===
                        parseInt(delivery.deliveryman_id, 10)
                );
                setDeliveryman(deliverymanDefault);
            }
        };
        listDeliveryman();
    }, [delivery.deliveryman_id, delivery.recipient_id, props]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!recipient?.value) {
            setShowRecipientError(true);
        } else if (!deliveryman?.value) {
            setShowDeliverymanError(true);
        } else if (product === '') {
            setShowDProductError(true);
        } else {
            setShowRecipientError(false);
            setShowDeliverymanError(false);
            setShowDProductError(false);

            try {
                if (delivery?.id) {
                    await api.put(`/deliveries/${delivery.id}`, {
                        recipient_id: recipient.value,
                        deliveryman_id: deliveryman.value,
                        product,
                    });
                    toast.success('Alteração realizada com sucesso!');
                } else {
                    await api.post('/deliveries', {
                        recipient_id: recipient.value,
                        deliveryman_id: deliveryman.value,
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
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
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
                            <LabelSelect>Destinatário</LabelSelect>
                            <AsyncSelect
                                name="recipient_id"
                                placeholder="Escolha o Destinatário"
                                defaultOptions={recipients}
                                defaultValue={recipient}
                                value={recipient?.value ? recipient : null}
                                onChange={(e) => setRecipient(e)}
                                loadOptions={promiseOptionsRecipient}
                            />
                            <SpanError show={showRecipientError}>
                                O destinatário é obrigatorio.
                            </SpanError>
                        </SelectItem>
                        <SelectItem>
                            <LabelSelect>Entregador</LabelSelect>
                            <AsyncSelect
                                name="deliveryman_id"
                                placeholder="Escolha o Entregador"
                                defaultOptions={deliverymans}
                                defaultValue={deliveryman}
                                value={deliveryman?.value ? deliveryman : null}
                                onChange={(e) => setDeliveryman(e)}
                                loadOptions={promiseOptionsDeliveryman}
                            />
                            <SpanError show={showDeliverymanError}>
                                O destinatário é obrigatorio.
                            </SpanError>
                        </SelectItem>
                    </SelectRow>
                    <InputField>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="product">Produto</label>
                        <input
                            label="Nome do Produto"
                            placeholder="Digite o nome do produto"
                            name="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        />
                        <SpanError show={showDProductError}>
                            O destinatário é obrigatorio.
                        </SpanError>
                    </InputField>
                </ContentStore>
            </form>
        </Container>
    );
}

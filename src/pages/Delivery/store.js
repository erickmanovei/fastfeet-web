import React, { useEffect, useState } from 'react';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import * as Yup from 'yup';
import {
    Container,
    HeaderActionsStore,
    ButtonActionsStore,
    ContentStore,
} from './styles';
import history from '~/services/history';
import api from '~/services/api';

export default function DeliveryStore() {
    const [inputValue, setInputValue] = useState('');

    const schema = Yup.object().shape({
        recipient_id: Yup.number().required('Destinatário é obrigatório!'),
        deliveryman_id: Yup.number().required('Entregador é obrigatório!'),
        product: Yup.string().required('O produto é obrigatório.'),
    });

    function handleSubmit({ recipient_id, deliveryman_id, product }) {}

    return (
        <Container>
            <Form schema={schema} onSubmit={handleSubmit}>
                <HeaderActionsStore>
                    <h1>Cadastro de Encomendas</h1>
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
                    <Input
                        name="email"
                        type="email"
                        label="SEU E-MAIL"
                        placeholder="exemplo@email.com"
                    />
                    <Input
                        name="password"
                        type="password"
                        label="SUA SENHA"
                        placeholder="*********"
                    />
                </ContentStore>
            </Form>
        </Container>
    );
}

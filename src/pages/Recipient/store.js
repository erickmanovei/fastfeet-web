import React, { useEffect, useState } from 'react';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import MaskedInput from '../../components/MaskedInput';
import {
    Container,
    HeaderActionsStore,
    ButtonActionsStore,
    ContentStore,
    InputField,
    InputRow,
} from './styles';
import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
    name: Yup.string().min(4).required('Campo obrigatório'),
    address_number: Yup.number().required('Campo obrigatório'),
    zip: Yup.string().required('Campo obrigatório'),
    address: Yup.string(),
    address_complement: Yup.string(),
    district: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
});

export default function RecipientStore(props) {
    const [recipient, setRecipient] = useState({});

    useEffect(() => {
        const { id } = props?.match?.params;
        const getRecipient = async () => {
            const { data } = await api.get(`/recipients/${id}`);
            setRecipient(data);
        };
        if (id) {
            getRecipient();
        }
    }, [props]);

    const handleSubmit = async (data) => {
        try {
            if (recipient?.id) {
                await api.put(`/recipients/${recipient.id}`, {
                    name: data.name,
                    address: data.address,
                    address_number: data.address_number,
                    address_complement: data.address_complement,
                    district: data.district,
                    city: data.city,
                    state: data.state,
                    zip: data.zip,
                });
                toast.success('Alteração realizada com sucesso!');
            } else {
                await api.post('/recipients', {
                    name: data.name,
                    address: data.address,
                    address_number: data.address_number,
                    address_complement: data.address_complement,
                    district: data.district,
                    city: data.city,
                    state: data.state,
                    zip: data.zip,
                });
                toast.success('Cadastro realizado com sucesso!');
                history.push('/recipient');
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
                schema={schema}
                onSubmit={handleSubmit}
                initialData={recipient}
            >
                <HeaderActionsStore>
                    <h1>
                        {recipient?.id
                            ? `Alterar Destinatário`
                            : 'Cadastro de Destinatário'}
                    </h1>
                    <div>
                        <ButtonActionsStore
                            type="button"
                            back
                            onClick={() => history.push('/recipient')}
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
                    <InputRow>
                        <InputField>
                            <Input
                                label="Nome *"
                                placeholder="Digite o nome do destinatário"
                                name="name"
                            />
                        </InputField>
                    </InputRow>
                    <InputRow>
                        <InputField flex={2}>
                            <Input
                                label="Endereço"
                                placeholder="Digite o endereço do destinatário"
                                name="address"
                            />
                        </InputField>
                        <InputField flex={1}>
                            <Input
                                label="Número *"
                                placeholder="Digite o número do destinatário"
                                name="address_number"
                            />
                        </InputField>
                        <InputField flex={1}>
                            <Input
                                label="Complemento"
                                placeholder="Digite o complemento do destinatário"
                                name="address_complement"
                            />
                        </InputField>
                        <InputField flex={1}>
                            <Input
                                label="Bairro"
                                placeholder="Digite o bairro do destinatário"
                                name="district"
                            />
                        </InputField>
                    </InputRow>
                    <InputRow>
                        <InputField flex={1}>
                            <Input
                                label="Cidade"
                                placeholder="Digite a cidade do destinatário"
                                name="city"
                            />
                        </InputField>
                        <InputField flex={1}>
                            <Input
                                label="Estado"
                                placeholder="Digite o estado do destinatário"
                                name="state"
                            />
                        </InputField>
                        <InputField flex={1}>
                            <MaskedInput
                                mask="99999-999"
                                label="CEP *"
                                placeholder="Digite o CEP do destinatário"
                                name="zip"
                            />
                        </InputField>
                    </InputRow>
                </ContentStore>
            </Form>
        </Container>
    );
}

import React, { useEffect, useState } from 'react';
import { FaCheck, FaArrowLeft, FaImage } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import {
    Container,
    HeaderActionsStore,
    ButtonActionsStore,
    ContentStore,
    InputField,
    AddPictureContainer,
} from './styles';
import history from '~/services/history';
import api from '~/services/api';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Ddigite um e-mail válido')
        .required('Campo obrigatório'),
    name: Yup.string().min(4).required('Campo obrigatório'),
});

export default function DeliverymanStore(props) {
    const [avatarId, setAvatarId] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState(0);
    const [deliveryman, setDeliveryman] = useState({});
    const [initialData, setInitialData] = useState({});

    useEffect(() => {
        const { id } = props?.match?.params;
        const getDeliveryman = async () => {
            const { data } = await api.get(`/deliverymans/${id}`);
            setDeliveryman(data);
            setInitialData({ name: data.name, email: data.email });
            if (data.avatar_id) {
                setAvatarId(data?.avatar_id);
                setAvatarUrl(data.avatar.url);
            }
        };
        if (id) {
            getDeliveryman();
        }
    }, [props]);

    const handleSubmit = async (data) => {
        try {
            const avatarIdSelected = avatarId || null;

            if (deliveryman?.id) {
                await api.put(`/deliverymans/${deliveryman.id}`, {
                    name: data.name,
                    email: data.email,
                    avatar_id: avatarIdSelected,
                });
                toast.success('Alteração realizada com sucesso!');
            } else {
                await api.post('/deliverymans', {
                    name: data.name,
                    email: data.email,
                    avatar_id: avatarIdSelected,
                });
                toast.success('Cadastro realizado com sucesso!');
                history.push('/deliveryman');
            }
        } catch (err) {
            toast.error(
                `Ocorreu um erro ao tentar cadastrar/alterar: ${err.message}`
            );
        }
    };

    const handleChangePicture = async (event) => {
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        const { data } = await api.post('/files', formData);
        setAvatarId(data.id);
        setAvatarUrl(data.url);
    };

    return (
        <Container>
            <Form
                schema={schema}
                onSubmit={handleSubmit}
                initialData={initialData}
            >
                <HeaderActionsStore>
                    <h1>
                        {deliveryman?.id
                            ? `Alterar Entregador`
                            : 'Cadastro de Entregador'}
                    </h1>
                    <div>
                        <ButtonActionsStore
                            type="button"
                            back
                            onClick={() => history.push('/deliveryman')}
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
                    <AddPictureContainer image={avatarId ? avatarUrl : null}>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleChangePicture}
                        />
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor="file">
                            <>
                                <FaImage />
                                <span>Adicionar Foto</span>
                            </>
                        </label>
                    </AddPictureContainer>
                    <InputField>
                        <Input
                            label="Nome"
                            placeholder="Digite o nome do entregador"
                            name="name"
                        />
                        <Input
                            type="email"
                            label="E-mail"
                            placeholder="Digite o e-mail do entregador"
                            name="email"
                        />
                    </InputField>
                </ContentStore>
            </Form>
        </Container>
    );
}

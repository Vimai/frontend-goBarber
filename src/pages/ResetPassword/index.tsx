import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useHistory, useLocation } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationsErrors';

import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas precisam ser iguais',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password } = data;
        const token = location.search.replace('?=token', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password: data.password,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error na ao resetar senha',
          description:
            'Ocorreu um erro ao resetar a sua senha, tente novamente',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Resetar senha</h1>
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Nova senha"
              />
              <Input
                name="passwordConfirmation"
                icon={FiLock}
                type="password"
                placeholder="Confirmação da senha"
              />
              <Button type="submit">Alterar senha</Button>
            </Form>
          </AnimationContainer>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ResetPassword;

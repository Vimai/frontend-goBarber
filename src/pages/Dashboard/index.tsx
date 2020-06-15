import React from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointments,
} from './styles';

import logoImage from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImage} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda</span>
          </p>
          <NextAppointments>
            <strong>Atendimento a seguir</strong>
            <div>
              <img src={user.avatar_url} alt={user.name} />
              <strong>vini</strong>
              <span>
                <FiClock />
                9:00
              </span>
            </div>
          </NextAppointments>
        </Schedule>
        <Calendar>a</Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;

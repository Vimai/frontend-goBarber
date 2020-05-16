import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';

interface ToastContainerProps {
  title: string;
  className?: string;
}

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong> Erro</strong>
          <p>Não foi possivel</p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>

      <Toast type="success" hasDescription={false}>
        <FiAlertCircle size={20} />
        <div>
          <strong> Erro</strong>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>

      <Toast type="error" hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong> Erro</strong>
          <p>Não foi possivel</p>
        </div>
        <button type="button">
          <FiXCircle size={20} />
        </button>
      </Toast>
    </Container>
  );
};

export default ToastContainer;

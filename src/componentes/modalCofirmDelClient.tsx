import React, {useState} from 'react';
import {Button, Modal, } from 'react-bootstrap'
import { useAppSelector } from '../redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setExcluir } from '../redux/reducers/clientReducer'

export const ModalConfirmDelClient = () => {

    const storeClient = useAppSelector(state => state.clientReducer);
    const storeUser = useAppSelector(state => state.userLogin);

    const alterStoreClient = useDispatch();

    const [show, setShow] = useState<boolean>(true);
    const offModal = () => {setShow(false);};
    const excluir = () => {alterStoreClient(setExcluir(true)); offModal();};

    return(
        <>
            <Modal show={show} onHide={offModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação de Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Olá {storeUser.nome} deseja realmente excluir o cliente: {storeClient.nome}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={offModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={excluir}>
                        Excluir Registro
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}
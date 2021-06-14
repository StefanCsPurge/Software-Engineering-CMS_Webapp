import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import Modal from 'react-overlays/Modal'
import styled from 'styled-components'
import PacmanLoader from 'react-spinners/PacmanLoader'

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

const PaymentModal = styled(Modal)`
  position: fixed;
  text-align: center;
  width: 50%;
  z-index: 1040;
  top: 25%;
  left: 25%;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
  padding-bottom: 100px;
`;

const PaymentPopUp = ({showPayment, onEnlist, onClose}) => {
    const [loading, setLoading] = useState(false)
    
    const renderBackdrop = (props) => <Backdrop {...props} />;

    const onProceed = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            console.log("closing");
            onEnlist();
            onClose();
        }, 5000)
        
    }

    console.log("Rendering PaymentPopUp");
    return (
        <div className="modal-example">
            <PaymentModal 
                show={showPayment}
                onHide={() => onClose()}
                renderBackdrop={renderBackdrop}
                aria-labelledby="modal-label"
            >
                <div>
                    <h3>{!loading ? "Confirm payment?" : "Payment is being proccessed"}</h3>
                    {!loading && <Button onClick={onProceed} style={{marginTop: "8px"}}>Proceed</Button>}
                    <div style={{marginTop: "50px" }}>
                    <PacmanLoader loading={loading} color={"#4170c7"}></PacmanLoader>
                    </div>
                </div>
            </PaymentModal>
        </div>
    )
}

export default PaymentPopUp

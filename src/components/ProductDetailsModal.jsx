import React, { useContext } from 'react';
import { Dialog, DialogContent, DialogContentText, Button } from '@mui/material';
import { IoClose } from "react-icons/io5";
import ProductZoom from './ProductZoom';
import ProductInfo from './ProductInfo';
import { MyContext } from '../contexts/MyContext';

const ProductDetailsModal = () => {
    // 1. Consume the context values
    const { openProductDetailsModal, setOpenProductDetailsModal } = useContext(MyContext);

    // 2. Local handler to close the modal
    const handleClose = () => {
        setOpenProductDetailsModal({
            open: false,
            product: null
        });
    };

    // Prevent rendering if modal isn't supposed to be open
    if (!openProductDetailsModal.open) return null;

    return (
        <Dialog
            open={openProductDetailsModal.open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth={true}
            className='productDetailsModal'
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <div className="flex items-center w-full productDetailsModalContainer relative">
                        <Button 
                            onClick={handleClose}
                            className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black !absolute !top-[15px] right-[15px] !bg-[#f1f1f1]'
                        >
                            <IoClose className='text-[20px] !text-black cursor-pointer' />
                        </Button>
                        
                        <div className="col1 w-[40%] px-3 py-8">
                            <ProductZoom images={openProductDetailsModal?.product?.images} />
                        </div>
                        
                        <div className="col2 w-[60%] py-8 px-8 pr-16 productContent">
                            <ProductInfo product={openProductDetailsModal?.product} />
                        </div>
                    </div>
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailsModal;
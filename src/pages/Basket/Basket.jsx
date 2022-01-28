import { useRef, useState } from "react";
import {
  Box,
  Image,
  Button,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  Text,
} from "@chakra-ui/react";
import eCommericalServices from "../../Services/eCommercialServices";
import { useBasket } from "../../context/BasketContext";

const Basket = () => {
  const [address, setAddress] = useState("");
  const { basketItem } = useBasket();
  console.log(basketItem.cart);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const total = basketItem.cart.reduce((acc, obj) => acc + (obj.price*obj.count), 0);

  const handleSubmitForm = async () => {
    const itemIds = basketItem.cart.map((item) => item._id);

    const payload = {
      address,
      items: JSON.stringify(itemIds),
    };
    await eCommericalServices.postOrder(payload);
    console.log(itemIds);
  };

  console.log(total);
  console.log(address);
  
  return (
    <>
      {basketItem.cart.length && (
        <>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {basketItem.cart.map((item) => (
              <Box
                key={item._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p="3"
                backgroundColor="purple.100"
              >
                <Image src={item.photos} loading="lazy" />
                <Box p="6">
                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                    {item.title}
                  </Box>
                  <Box>{item.count} Adet</Box>
                  <Box>{item.price} TL</Box>
                </Box>
              </Box>
            ))}
           
          </Grid>

          <Box mt="10">
            <Text fontSize="22">Total: {total} TL</Text>
          </Box>
          <Button onClick={onOpen}>Orderrrr</Button>
          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Order</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Order
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          
        </>
        
      )}
      
    </>
  );
};

export default Basket;

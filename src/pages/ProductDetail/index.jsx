import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import eCommericalServices from "../../Services/eCommercialServices";
import { Box, Button, Text } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from 'react-image-gallery';
import { useBasket } from "../../context/BasketContext";

const  ProductDetail = () => {

  const {addItem} = useBasket();

  const { product_id } = useParams();
  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    eCommericalServices.GetProductDetail(product_id)
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{isError}</div>;

  console.log(data);
  const images = data.photos.map((url) => ({original:url}));

  const handleAddItem = () =>{
    console.log(data);
    addItem(data);
  }


  return (
    <div>
      <Button colorScheme="pink" onClick={()=>{handleAddItem()}}>Add To The Basket</Button>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
      <p>{data.description}</p>
      <Box margin="10">
      <ImageGallery items={images} />
      </Box>
    </div>
  );
};

export default ProductDetail;

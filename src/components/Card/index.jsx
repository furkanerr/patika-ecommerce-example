import React from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

const Card = ({ key, item }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      backgroundColor="purple.300"
    >
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos} loading="lazy" />
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {moment(item.createdTime).format("DD/MM/YYYY")}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box>{item.price} TL</Box>
        </Box>
      </Link>
      <Button colorScheme="pink">Add To Basket</Button>
    </Box>
  );
};

export default Card;

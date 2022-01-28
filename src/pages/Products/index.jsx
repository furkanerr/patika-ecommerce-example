import React from "react";

import Card from "../../components/Card";
import { Grid, Box } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import eCommericalServices from "../../Services/eCommercialServices";
const Products = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", eCommericalServices.GetProducts, {
    getNextPageParam: (lastGroup, allGroup) => {
      const morePageExist = lastGroup?.length === 12;
      if (!morePageExist) {
        return;
      }
      return allGroup.length + 1;
    },
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <>
      {
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {/* {data.map((item, key) => (
          <Card key={key} item={item} />
        ))} */}
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((item) => (
                <Box w="100%" key={item._id}>
                  <Card item={item} />
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      }
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default Products;

import {
  Flex,
  Box,
  FormControl,
  Heading,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validation";
import eCommericalServices from "../../../Services/eCommercialServices";
import { useAuth } from "../../../context/AuthContext";

const SingUp = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const response = await eCommericalServices.Register({
          email: values.email,
          password: values.password,
        });
        console.log(response);
        login(response);
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <Flex
      width={"full"}
      align={"center"}
      justifyContent={"center"}
      marginTop={"250px"}
    >
      <Box pt={10}>
        <Box textAlign={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Box>
        <Box my={5}>
          {formik.errors.general && (
            <Alert status={"error"}>{formik.errors.general}</Alert>
          )}
        </Box>
        <Box my={5} textAlign={"left"}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && formik.errors.email}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && formik.errors.password}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password Confirm</FormLabel>
              <Input
                name="passwordConfirm"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                value={formik.values.passwordConfirm}
                isInvalid={true}
                isInvalid={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
              />
            </FormControl>

            <Button mt="4" width="full" type="submit">
              Sing Up
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export default SingUp;

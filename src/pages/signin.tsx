import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import Meta from "@/components/Meta";
import Link from "next/link";
import SignupOption from "@/components/SignupOption";
import Layout from "@/components/layout/Layout";
import { Google } from "@/components/ButtonIcon";
import SigninOption from "@/components/SigninOption";
import { motion } from "framer-motion";

import {
  ParticleConnect,
  metaMask,
  web3Modal,
} from "@particle-network/connect";
import { Ethereum, EthereumGoerli, BSCTestnet } from "@particle-network/common";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "@particle-network/connect-react-ui";
import { useRouter } from "next/router";

const Signin = () => {
  const [provider, setProvider] = useState<any>();
  const router = useRouter();

  const connectKit = useMemo(() => {
    return new ParticleConnect({
      projectId: "f8dc7e0f-ea6a-469c-8a41-c572ba65e0d2",
      clientKey: "c4mrm5RvfG8T7zsqOqZJtU78rd5M821fe2vMVhy2",
      appId: "0b558c3e-e9e4-4be4-bb7b-f35469b2dfac",
      chains: [Ethereum, EthereumGoerli, BSCTestnet],
      wallets: [metaMask(), web3Modal()],
    });
  }, []);
  

  const account = useAccount();
  console.log(provider)

  useEffect(() => {
    if (provider) {
      window.location.reload()
      router.push("welcome");
    }
  }, [provider, router])

  const connectWallet = async (id: string, options?: any) => {
    console.log("connectWallet", id, options);
    try {
      const connectProvider = await connectKit.connect(id, options);
      setProvider(connectProvider);
    } catch (error) {
      console.error("connectWallet", error);
    }
  };
  return (
    <Layout>
      <Meta page="Sign in" />
      <a title="home" href="./">
        <Image src="/icons/LOGO.svg" alt="signin" />
      </a>
      <Box>
        <Center h="85vh">
          <Flex gap="20">
            <Box>
              <Image src="/images/bro.svg" alt="signin" />
            </Box>
            <motion.div
              initial={{ y: -150, opacity: 0 }}
              animate={{ y: -10, opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 1,
                type: "spring",
                stiffness: 30,
              }}
            >
              <Box
                border="1px solid #FFF7D1"
                boxShadow="0px 23px 57px rgba(255, 247, 209, 0.5)"
                borderRadius={12}
                p="1.5em"
                minW="550px"
                minH="450px"
              >
                <Text color="#A5A1A1" fontSize={12}>
                  Not signed up?{" "}
                  <a href="./signup">
                    <Text as="u" ml="1em" color="#FDD835">
                      Sign up
                    </Text>
                  </a>
                </Text>
                <Text fontWeight={700} fontSize={30} my=".2em">
                  Welcome back
                </Text>
                <Text fontWeight={400} fontSize={14}>
                  Let`s pick up where you left off!
                </Text>
                <Button
                  my="1em"
                  border="1px solid #FDD835"
                  bg="#FBFAF7"
                  w="full"
                  fontSize={14}
                  leftIcon={<Google />}
                  _hover={{ bg: "transparent" }}
                  onClick={() =>
                    connectWallet("particle")
                  }
                >
                  Sign in with Google
                </Button>
                <Flex align="center" gap="5">
                  <Box borderBottom="0.5px solid #000" w="full" />
                  <Text>OR</Text>
                  <Box borderBottom="0.5px solid #000" w="full" />
                </Flex>
                <SigninOption connectWallet={connectWallet} />
              </Box>
            </motion.div>
          </Flex>
        </Center>
      </Box>
    </Layout>
  );
};

export default Signin;

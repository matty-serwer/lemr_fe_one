import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
// styles
import "./globals.css";
// providers
import { Providers } from "./providers";
import Header from "@/app/components/header/Header";
import Footer from "@/app/components/footer/Footer";
import { Container, Flex, VStack } from '@chakra-ui/react';

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LEMR",
  description: "LEMR Project initial UI",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={nunito.className}>
    <Providers>
      <Flex direction="column" minH="100vh">
        <Header />
        <Container maxW={{ base: '100%', md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} py={4} flex={1}>
          {children}
        </Container>
        <Footer />
      </Flex>
    </Providers>
    </body>
    </html>
  );
}
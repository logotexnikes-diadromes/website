import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface User {
  user: {
    displayName: string;
    photoURL: string;
    email: string;
  };
}
export const Notif = ({ user }: User) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="JetBrains Mono"
          fallbackFontFamily="monospace"
          webFont={{
            url: "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOVOVgaY.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Η αίτηση σας έχει εγκριθεί!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto">
          <Container
            className="my-[40px] mx-auto p-[20px] w-[465px]"
            style={{ border: "1px solid #7F7F7F" }}
          >
            <Heading className="font-light text-[#BB4430] my-10">
              Λογοτεχνικές διαδρομές στην ιστορία
            </Heading>
            <Heading className="text-lg mb-4">
              Η αίτηση σας έχει εγκριθεί!
            </Heading>
            <div
              className="flex px-3 mb-2"
              style={{ border: "1px solid #7F7F7F" }}
            >
              <Img
                alt={"εικόνα προφίλ του/ της" + user.displayName}
                src={user.photoURL}
                className="rounded-full w-12 h-12 my-auto"
              />{" "}
              <div className="ml-3">
                <h1 className="text-xl font-medium -mb-3">
                  {user.displayName}
                </h1>
                <p className="text-sm opacity-50">{user.email}</p>
              </div>
            </div>
            <Link
              href="https://logotexnikes-diadromes.gr/creations/creator"
              className="cursor-pointer"
              target="_blank"
            >
              <button
                className="px-5 bg-transparent py-1 my-1"
                style={{ border: "1px solid #7F7F7F" }}
              >
                Ξεκινήστε
              </button>
            </Link>
            <Section className="mt-6">
              <Hr />
              <Heading className="text-lg text-[#7F7F7F]">
                Θέλετε βοήθεια;
              </Heading>
              <Text>
                Επισκεφτείτε την σελίδα{" "}
                <Link
                  href="https://logotexnikes-diadromes.gr/creations/help"
                  target="_blank"
                  className="mr-2"
                >
                  /creations/help
                </Link>
                και αφού συνδεθείτε με τον παραπάνω λογαριασμό Google μπορείτε
                να ανατρέξετε σε αναλυτικούς οδηγούς.
              </Text>
              <Hr />
            </Section>
            <Text className="text-xs text-[#7F7F7F] text-center ">
              - Ευχαριστούμε για την συμμετοχή σας! -
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Notif;

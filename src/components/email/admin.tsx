import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Data {
  name: string;
  photoURL: string;
  email: string;
}
export const AdmitUser = (user: Data, date: string) => {
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
      <Preview>Νέα αίτηση!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto">
          <Container
            className="my-[40px] mx-auto p-[20px] w-[465px]"
            style={{ border: "1px solid #7F7F7F" }}
          >
            <Heading className="font-light text-[#BB4430] mb-10">
              Λογοτεχνικές διαδρομές στην ιστορία
            </Heading>
            <span className="text-lg font-bold">Νέα αίτηση!</span>
            <br />
            <span className="text-[#7F7F7F] text-xs">{date}</span>
            <div
              className="flex px-3 mb-2 mt-4"
              style={{ border: "1px solid #7F7F7F" }}
            >
              <Img
                alt={"εικόνα προφίλ του/ της" + user.name}
                src={user.photoURL}
                className="rounded-full w-12 h-12 my-auto"
              />{" "}
              <Section className="ml-3">
                <h1 className="text-xl font-medium">{user.name}</h1>
                <p className="text-sm opacity-50">{user.email}</p>
              </Section>
            </div>
            <Link
              href="https://console.firebase.google.com"
              className="cursor-pointer"
              target="_blank"
            >
              <button
                className="px-5 bg-transparent py-1 my-1"
                style={{ border: "1px solid #7F7F7F" }}
              >
                Αποδοχή
              </button>
            </Link>
            <Section
              className="mt-10"
              style={{
                borderTop: "1px solid #BB4430",
                borderBottom: "1px solid #BB4430",
              }}
            >
              <Text className="text-sm font-medium">
                Παρακαλώ μην απαντήσετε σε αυτό το mail
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AdmitUser;

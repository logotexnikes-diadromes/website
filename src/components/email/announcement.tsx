import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
} from "@react-email/components";
//@ts-ignore
import { toHTML } from "@portabletext/to-html";

export const Announcement = (
  title: string,
  _createdAt: string,
  content: string
) => {
  const d = new Date(_createdAt);
  const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
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
      <Preview>{`${title.slice(0, 20)} ...`}</Preview>
      <Tailwind>
        <Body style={main}>
          <Container
            className="p-10"
            style={{ border: "1px solid", borderColor: "#00000050" }}
          >
            <Heading
              className="font-light text-[#BB4430] text-xl"
              style={{ marginBottom: 0 }}
            >
              Λογοτεχνικές διαδρομές στην
              <br /> ιστορία
            </Heading>
            <div className="flex relative top-7">
              <p className="ml-3 text-sm opacity-50">Ανακοίνωση  •</p>
              <p
                className=" ml-4  text-sm opacity-50
                "
              >
                {date}
              </p>
            </div>
            <Heading className="font-light ml-3 text-[#BB4430]">
              {title}
            </Heading>
            <i>
              <p
                dangerouslySetInnerHTML={{
                  __html: toHTML(JSON.parse(content)),
                }}
              />
            </i>
            <div
              style={{ borderTop: "1px solid #00000050" }}
              className="relative top-8 pt-1"
            >
              <Link
                href="https://logotexnikes-diadromes.gr"
                className="text-center text-xs text-black"
              >
                logotexnikes-diadromes.gr
              </Link>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Announcement;

const main = {
  backgroundColor: "#ffffff",
};

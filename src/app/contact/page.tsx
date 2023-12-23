"use client";
import { Detail, H1, H2, H3Small } from "@/components/typography";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import pataki from "@/app/assets/pataki.webp";
import metaixmio from "@/app/assets/metaixmio.png";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Gradient } from "@/components/gradient";
import Button from "@/components/button";
import Marquee from "react-fast-marquee";

const recipients = [
  { name: "Υπεύθυνες προγράμματος", value: "managers" },
  { name: "Τεχνική υποστήριξη", value: "technical" },
];

export default function Page() {
  const [recipient, setRecipient] = useState(recipients[0]);
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [slide, setSlide] = useState(0);
  const to = useSearchParams().get("to");
  useEffect(() => {
    if (to === "technical") {
      setRecipient(recipients[1]);
    }
    const gradient: any = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  const questions = [
    {
      question: "Πού θέλετε να στείλετε το μήνυμά σας;".split(" "),
      answer: (
        <Listbox value={recipient} onChange={setRecipient}>
          <Listbox.Button>
            <div className="bg-white px-5 py-1 my-1 border border-black-50 duration-300 hover:tracking-wide">
              {recipient.name}
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition duration-200 "
            enter="transition duration-200 "
            enterFrom="opacity-0 -translate-x-2 -translate-y-9 "
            enterTo=" opacity-100 translate-x-0 -translate-y-9 "
            leaveFrom=" opacity-100 translate-x-0 -translate-y-9 "
            leaveTo=" opacity-0 translate-x-2 -translate-y-9 "
          >
            <div className="relative h-0">
              <Listbox.Options className=" border border-black-50 bg-white w-fit absolute">
                {recipients.map((person, i) => (
                  <Listbox.Option
                    key={i}
                    value={person}
                    className={`${
                      i === 0 && "border-b"
                    } px-5 py-1 my-1 cursor-pointer`}
                  >
                    {person.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Transition>
        </Listbox>
      ),
    },
    {
      question: "Ποιό είναι το email σας;".split(" "),
      answer: (
        <input
          value={message}
          placeholder="example@mail.com"
          onChange={(e) => setMessage(e.target.value)}
          className="bg-white px-5 py-1 my-1 border border-black-50 focus:outline-none"
        />
      ),
    },
    {
      question: "Πληκτρολογήστε το μήνυμά σας.".split(" "),
      answer: (
        <textarea
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="bg-white h-52 max-h-52 min-h-52 w-full  px-5 py-1 my-1 border border-black-50 focus:outline-none"
        />
      ),
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="mx-10">
        <style global jsx>
          {`
            #gradient-canvas {
              width: 100%;
              height: 100%;
              --gradient-color-1: #bb4430;
              --gradient-color-2: #1b1b3a;
              --gradient-color-3: #1b1b3a;
              --gradient-color-4: #bb4430;
            }
          `}
        </style>
        <H1 className="mb-8">Επικοινωνία</H1>
        <p>
          Για περισσότερες πληροφορίες και δηλώσεις συμμετοχής στο πρόγραμμα
          μπορείτε να απευθύνεστε στην Δημοτική Βιβλιοθήκη Πτολεμαΐδας : Σοφία
          Καλμανίδου – 2463055179 Υποστήριξη: εκδόσεις Μεταίχμιο &amp; εκδόσεις
          Πατάκη
        </p>
        <div className="relative border border-black-50 rounded-lg w-full min-h-[500px] pb-20 max-w-3xl">
          <canvas
            id="gradient-canvas"
            className="absolute top-0 left-0 h-full w-full -z-10 rounded-lg"
            data-transition-in
            data-js-darken-top
          />
          <Button
            onClick={() => setSlide(slide - 1)}
            className="absolute bottom-3 left-5 bg-white z-10"
          >
            {"<"}
          </Button>

          <Button
            onClick={() => setSlide(slide + 1)}
            className=" absolute bottom-3 right-5 bg-white z-10"
          >
            {">"}
          </Button>
          {questions.map((q, i) => (
            <Transition
              show={slide === i}
              enter="transition duration-500 "
              leave="transition-opacity duration-500"
              enterFrom="opacity-0 -translate-x-3"
              enterTo="opacity-100 translate-x-0"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-3"
            >
              <section
                className="absolute top-0 left-0 w-full h-full p-5 grid min-h-[500px]"
                key={i}
              >
                <div className="place-self-center w-full">
                  <div>
                    {q.question.map((word: string, key: number) => (
                      <H3Small
                        key={key}
                        className="pr-4 [font-size:_clamp(30px,5vw,40px)] bg-white text-purple inline-block"
                      >
                        {word + " "}
                      </H3Small>
                    ))}
                    <div>{q.answer}</div>
                  </div>
                </div>
              </section>
            </Transition>
          ))}
        </div>
      </div>
      <section className="mt-10 border-t border-black-50 py-3 sm:translate-y-44 px-10 w-full grid grid-cols-2">
        <Image
          src={metaixmio}
          alt="Εκδόσεις Μεταίχμιο"
          width={200}
          className="max-w-[200px] max-h-[80px] object-contain my-auto"
        />
        <Image
          src={pataki}
          alt="Εκδόσεις Πατάκη"
          width={200}
          className="max-w-[200px] max-h-[80px] object-contain"
        />
      </section>
    </div>
  );
}

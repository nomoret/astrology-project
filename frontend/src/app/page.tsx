"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Card from "@/app/components/card";

const defaultCardIdList = [
  { id: 78, direction: 0 },
  { id: 78, direction: 0 },
  { id: 78, direction: 0 },
];

export default function Home() {
  const [meesage, setMessage] = useState("");
  const [answer, setAnswer] = useState("궁금하거나 원하는 것을 질문해주세요.");
  const [randomCardIdList, setRandomCardIdList] =
    useState<any[]>(defaultCardIdList);

  const [resulOfDestiny, setResultOfDestiny] = useState<string>("");

  const onRandomCardId = () => {
    /**
     * 1. 1~78까지의 숫자를 가진 배열을 만든다.
     * 2. 배열을 랜덤하게 섞는다.
     * 3. 3개의 카드를 뽑는다.
     */

    console.time("randomCardId");
    const newRandomCardIdList = [];
    const cardDeck = Array.from({ length: 78 }, (_, i) => i + 1);
    const shuffledDeck = cardDeck.sort(() => Math.random() - 0.5);
    const cardDeckLoopLength = 3;

    for (let i = 0; i < cardDeckLoopLength; i++) {
      const randomCardId = shuffledDeck[i];
      const randomCardDirection = Math.floor(Math.random() * 2);
      newRandomCardIdList.push({
        id: randomCardId,
        direction: randomCardDirection,
      });
    }
    setRandomCardIdList(newRandomCardIdList);
    console.timeEnd("randomCardId");
  };

  const clearDefaultState = () => {
    setAnswer("궁금하거나 원하는 것을 질문해주세요.");
    setRandomCardIdList(defaultCardIdList);
    setResultOfDestiny("");
  };

  const onResultOfDestiny = () => {
    let text = "당신은";
    const randomCardLength = randomCardIdList.length;
    randomCardIdList.forEach((card, index) => {
      text += ` ${card.id}번 카드 ${card.direction === 0 ? "정" : "역"}방향`;
      if (index !== randomCardLength - 1) {
        text += ",";
      }
    });
    text += `를 뽑았습니다.\n`;

    const json_body = JSON.stringify(randomCardIdList);
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
    console.log(json_body);
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json_body,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        text += data.answer;
        setResultOfDestiny(text); // 결과를 보여준다.
      })
      .catch(console.error);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div> */}
      <div>
        <a href="">{`타로 실행`}</a>
      </div>
      <div>
        <form
          className="flex flex-col items-center justify-between p-4"
          onSubmit={(e) => {
            console.log(e.target);
            e.preventDefault();
            setAnswer(`${e.target[0].value}에 대해서 알아봅시다`);
            setMessage("");
          }}
        >
          <input
            type="text"
            value={meesage}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button>타로 실행</button>
        </form>
      </div>
      <div>
        <Image
          src="/crystal_ball.jpeg"
          alt="Picture of the author"
          width={500}
          height={500}
        />
      </div>
      <div>
        <p>{answer}</p>
      </div>
      <div className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
        <button onClick={onRandomCardId}>Click Random Card Number</button>
      </div>
      <div className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
        <button onClick={(e) => clearDefaultState()}>타로 대화 재시작</button>
      </div>
      <div className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
        <button onClick={(e) => onResultOfDestiny()}>결과 확인</button>
      </div>
      <div className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400">
        <Link href={`/dashboard`}>
          <button>모든 카드 보기</button>
        </Link>
      </div>
      {resulOfDestiny && <div className="whitespace-pre">{resulOfDestiny}</div>}
      <div className="flex flex-row justify-between p-12">
        {randomCardIdList &&
          randomCardIdList.map((card, index) => {
            if (card.id === 78) {
              return (
                <div key={index}>
                  <div className="hover:bg-blue-400">
                    {`뒷면 ${card.id} ${card.direction === 0 ? "정" : "역"}`}
                    <Card cardId={card.id} direction={card.direction} />
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <Link href={`/tarot/${card.id}/card`}>
                    <div className="hover:bg-blue-400">
                      {`앞면 ${card.id} ${card.direction === 0 ? "정" : "역"}`}
                      <Card cardId={card.id} direction={card.direction} />
                    </div>
                  </Link>
                </div>
              );
            }
          })}
      </div>
    </main>
  );
}

"use client";
import Image from "next/image";
import { tarotCardList } from "@/app/lib/card";
import { useEffect, useState } from "react";

interface CardData {
  id: string;
  name: string;
  image: string;
}

export const getCard = async (cardId: string) => {
  // const res = await fetch(`https://api.scryfall.com/cards/${cardId}`);
  // const card = await res.json();
  console.log(typeof cardId);
  console.log(`cardId: ${cardId}`);
  console.log(typeof tarotCardList);
  const cardData = tarotCardList[cardId];
  console.log("잘나오냐", cardData);
  const card = {
    id: cardId,
    name: cardData[1],
    // image: `https://upload.wikimedia.org/wikipedia/commons/${cardData[2]}.jpg`,
    image:
      parseInt(cardId) === 78
        ? `/tarot/${cardData[2]}.png`
        : `/tarot/${cardData[2]}.jpg`,
  };

  return card;
};

interface CardData {
  id: string;
  name: string;
  image: string;
}

const Card = ({ cardId, direction }: { cardId: string; direction: string }) => {
  const [card, setCard] = useState<CardData | null>(null);
  useEffect(() => {
    const getCardFinal = async () => {
      console.log(cardId);
      const cardData = await getCard(cardId);
      console.log(cardData);
      setCard(cardData);
    };
    getCardFinal();
  }, [cardId]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-between ">
      {/* <div className={`transform transition duration-500 rotate-y-180`}> */}
      <h1>Card Detail Page</h1>
      <p>Card ID: {card.id}</p>
      <p>Card Name: {card.name}</p>
      <p>
        <Image
          className={`transform backface-hidden transition-transform duration-500 ${
            direction ? "rotate-180" : ""
          } hover:rotate-y-180`}
          // className={`transform transition duration-1500 rotate-y-10`}
          src={card.image}
          alt="Tarot Card Image"
          width={300}
          height={500}
        />
      </p>
    </div>
  );
};

export default Card;

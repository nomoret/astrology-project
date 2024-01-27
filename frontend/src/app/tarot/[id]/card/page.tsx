import { notFound } from "next/navigation";
import { tarotCardList, CardImageList } from "@/app/lib/card";
import Image from "next/image";
import Card from "@/app/components/card";

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
    image: `/tarot/${cardData[2]}.jpg`,
  };

  return card;
};

const Page = ({ params }: any) => {
  const id = params.id;
  // const card = await getCard(id);

  if (id > 77) {
    return notFound();
  }

  return <Card cardId={params.id} />;
};

export default Page;

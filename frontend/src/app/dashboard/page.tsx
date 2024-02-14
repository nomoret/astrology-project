"use client";
import Image from "next/image";
import { tarotCardList } from "@/app/lib/card";
import { useEffect, useState } from "react";
import Card from "@/app/components/card";

const Page = () => {
  return (
    <div>
      <p>대쉬보드</p>
      {tarotCardList.map((v, i) => {
        return <Card key={i} cardId={i} direction={0} />;
      })}
    </div>
  );
};

export default Page;

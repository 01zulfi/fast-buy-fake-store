import { userAgentFromString } from "next/server";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: { rate: number; count: number }
}

export interface ProductStorage extends Product {
  quantity: number;
}

export interface Session {
  sessionId: number;
  userId: number;
  expires: number;
}
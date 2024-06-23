import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, description, quantity } = req.body;

  try {
    const item = await prisma.item.create({
      data: { name, description, quantity },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
}

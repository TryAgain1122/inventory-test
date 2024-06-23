import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const item = await prisma.item.findUnique({
      where: { id: id as string },
    });

    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, description, quantity } = req.body;

  try {
    const item = await prisma.item.update({
      where: { id: id as string },
      data: { name, description, quantity },
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await prisma.item.delete({
      where: { id: id as string },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
}

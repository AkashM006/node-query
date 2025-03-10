import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { successHandler } from "../utils/Response";
import { ResourceNotFoundError } from "../utils/Errors/Errors";

const getAllNotes = async (req: Request, res: Response) => {
  const { limit, page } = req.query;

  let notes = [];
  let count = 0;
  if (limit && page) {
    [count, notes] = await prisma.$transaction([
      prisma.notes.count(),
      prisma.notes.findMany({
        skip: +limit * (+page - 1),
        take: +limit,
      }),
    ]);
  } else
    [count, notes] = await prisma.$transaction([
      prisma.notes.count(),
      prisma.notes.findMany(),
    ]);

  let result = {
    count,
    data: notes,
  };
  successHandler(res, result);
};

const getOneNote = async (req: Request, res: Response) => {
  const id = req.params.id;

  const note = await prisma.notes.findUnique({
    where: {
      id,
    },
  });

  if (!note)
    throw new ResourceNotFoundError(`Note with id ${id} does not exist`);

  successHandler(res, note);
};

const createANote = async (req: Request, res: Response) => {
  const { title, body }: { title: string; body: string } = req.body;

  const createdNote = await prisma.notes.create({
    data: {
      title,
      body,
    },
  });

  successHandler(res, createdNote);
};

const updateANote = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { title, body } = req.body;

  const note = await prisma.notes.findUnique({
    where: {
      id,
    },
  });

  if (!note)
    throw new ResourceNotFoundError(`Note with id ${id} does not exist`);

  const updatedNote = await prisma.notes.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
  });

  successHandler(res, updatedNote);
};

const deleteANote = async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await prisma.notes.findUnique({
    where: {
      id,
    },
  });

  if (!note)
    throw new ResourceNotFoundError(`Note with id ${id} does not exist`);

  await prisma.notes.delete({
    where: {
      id,
    },
  });

  successHandler(res, null);
};

const removeAll = async (req: Request, res: Response) => {
  await prisma.notes.deleteMany();

  successHandler(res, "Successfully deleted all notes");
};

export {
  getAllNotes,
  getOneNote,
  createANote,
  updateANote,
  deleteANote,
  removeAll,
};

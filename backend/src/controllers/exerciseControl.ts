import { Request, Response } from "express";
import mongoose from "mongoose";
import Exercise from "../models/exerciseModel";

export const getExs = async (req: Request, res: Response) => {
  try {
    const exs = await Exercise.find({});
    if (!exs) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json(exs);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getEx = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not Found" });
    }
    const ex = await Exercise.findById(id);

    if (!ex) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json(ex);
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const createEx = async (req: Request, res: Response) => {
  const { title, content, solution } = req.body;
  try {
    const ex = await Exercise.create({ title, content, solution });
    res.status(200).json({ ex });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEx = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ex = await Exercise.findOneAndDelete({ _id: id });

  if (!ex) {
    return res.status(400).json({ error: "No such ex" });
  }

  res.status(200).json(ex);
};

export const updateEx = async (req: Request, res: Response) => {
  const { title, content, solution } = req.body;
  const { id } = req.params;

  try {
    const ex = await Exercise.findByIdAndUpdate(
      id,
      { title, content, solution },
      { new: true, runValidators: true }
    );
    if (ex) {
      return res.status(200).json(ex);
    }
    res.status(404).json({ error: "Not Found" });
  } catch (err) {
    console.log("err:", err);
    return res.status(500).json(err);
  }
};

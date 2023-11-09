import { jest } from "@jest/globals";
import {
  createAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
} from "../services/author.service";

import { db } from "../db";
import testData from "./testCases.json";

jest.mock("../db", () => ({
  db: {
    author: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Author Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an author", async () => {
    const mockAuthor = { id: 1, name: "John Doe" };
    jest.spyOn(db.author, "create").mockResolvedValue(mockAuthor);

    const result = await createAuthor("John Doe");

    expect(result).toEqual(mockAuthor);
    expect(db.author.create).toHaveBeenCalledWith({
      data: { name: "John Doe" },
    });
  });

  it("should get an author by ID", async () => {
    const mockAuthor = { id: 1, name: "John Doe" };
    jest.spyOn(db.author, "findUnique").mockResolvedValue(mockAuthor);

    const result = await getAuthor(1);

    expect(result).toEqual(mockAuthor);
    expect(db.author.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("should get all authors", async () => {
    const mockAuthors = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
    jest.spyOn(db.author, "findMany").mockResolvedValue(mockAuthors);

    const result = await getAuthors();

    expect(result).toEqual(mockAuthors);
    expect(db.author.findMany).toHaveBeenCalled();
  });

  it("should update an author", async () => {
    const mockAuthor = { id: 1, name: "John Doe" };
    jest.spyOn(db.author, "update").mockResolvedValue(mockAuthor);

    const result = await updateAuthor(1, "New Name");

    expect(result).toEqual(mockAuthor);
    expect(db.author.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { name: "New Name" },
    });
  });

  it("should delete an author", async () => {
    const mockAuthor = { id: 1, name: "John Doe" };
    jest.spyOn(db.author, "delete").mockResolvedValue(mockAuthor);

    const result = await deleteAuthor(1);

    expect(result).toEqual(mockAuthor);
    expect(db.author.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("should handle error when creating an author", async () => {
    jest
      .spyOn(db.author, "create")
      .mockRejectedValue(new Error("Failed to create author"));

    await expect(createAuthor("John Doe")).rejects.toThrow(
      "Failed to create author"
    );
  });

  it("should handle error when getting an author by ID", async () => {
    jest
      .spyOn(db.author, "findUnique")
      .mockRejectedValue(new Error("Failed to get author"));

    await expect(getAuthor(1)).rejects.toThrow("Failed to get author");
  });

  it("should handle error when getting all authors", async () => {
    jest
      .spyOn(db.author, "findMany")
      .mockRejectedValue(new Error("Failed to get authors"));

    await expect(getAuthors()).rejects.toThrow("Failed to get authors");
  });

  it("should handle error when updating an author", async () => {
    jest
      .spyOn(db.author, "update")
      .mockRejectedValue(new Error("Failed to update author"));

    await expect(updateAuthor(1, "New Name")).rejects.toThrow(
      "Failed to update author"
    );
  });

  it("should handle error when deleting an author", async () => {
    jest
      .spyOn(db.author, "delete")
      .mockRejectedValue(new Error("Failed to delete author"));

    await expect(deleteAuthor(1)).rejects.toThrow("Failed to delete author");
  });

  testData.forEach(({ id, name }) => {
    it(`should create an author with name ${name}`, async () => {
      const mockAuthor = { id: id, name: name };
      jest.spyOn(db.author, "create").mockResolvedValue(mockAuthor);

      const result = await createAuthor(name);

      expect(result).toEqual(mockAuthor);
      expect(db.author.create).toHaveBeenCalledWith({
        data: { name: name },
      });
    });
  });
});

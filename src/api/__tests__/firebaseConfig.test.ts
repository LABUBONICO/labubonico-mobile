/**
 * @format
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(() => "mockApp"),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => "mockDb"),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => "mockAuth"),
  connectAuthEmulator: jest.fn(),
}));

describe("Firebase Config", () => {
  it("App and Firestore must be initialized correctly", async () => {
    const { app, database } = require("../firebaseConfig");

    expect(initializeApp).toHaveBeenCalledTimes(1);
    expect(getFirestore).toHaveBeenCalledWith("mockApp");

    expect(app).toBe("mockApp");
    expect(database).toBe("mockDb");
  });
});

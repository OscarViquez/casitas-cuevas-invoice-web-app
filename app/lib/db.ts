import { openDB, type DBSchema } from "idb";
import type { Invoice } from "./types";

interface CasitasDB extends DBSchema {
  invoices: {
    key: number;
    value: Invoice;
  };
}

function getDB() {
  return openDB<CasitasDB>("casitas-cuevas", 1, {
    upgrade(db) {
      db.createObjectStore("invoices", { keyPath: "id", autoIncrement: true });
    },
  });
}

export async function getNextInvoiceNumber(): Promise<string> {
  const db = await getDB();
  const count = await db.count("invoices");
  return String(count + 1).padStart(4, "0");
}

export async function saveInvoice(invoice: Omit<Invoice, "id">): Promise<void> {
  const db = await getDB();
  await db.add("invoices", invoice as Invoice);
}

export async function getAllInvoices(): Promise<Invoice[]> {
  const db = await getDB();
  const all = await db.getAll("invoices");
  return all.reverse();
}

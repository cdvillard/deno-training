import { join } from "@std/path";

type Dino = {
  name: string,
  descrption: string,
}

const dataPath = join("data", "data.json");

async function readData(): Promise<Dino[]> {
  const data = await Deno.readTextFile(dataPath);
  return JSON.parse(data);
}

async function writeData(dinos: Dino[]): Promise<void> {
  await Deno.writeTextFile(dataPath, JSON.stringify(dinos, null, 2));
}

export const db = {
  dino: {
    findMany: () => readData(),
    findByName: async (name: string) => {
      const dinos = await readData();
      return dinos.find(dino => dino.name === name);
    },
    create: async (data: Dino) => {
      const dinos = await readData();
      const newDino = { ...data };
      dinos.push(newDino);
      await writeData(dinos);
      return newDino;
    }
  }
}

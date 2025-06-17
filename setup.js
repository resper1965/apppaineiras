const fs = require("fs");
const path = require("path");

// Caminho base do projeto
const basePath = path.join(__dirname, "");

// Estrutura de pastas e arquivos
const structure = {
  "api/notion/notionClient.ts": `import { Client } from "@notionhq/client";

const notionClient = new Client({ auth: process.env.NOTION_API_KEY });

export default notionClient;
`,
  "api/notion/notionTypes.ts": `// Defina os tipos TypeScript para a API do Notion aqui
export interface NotionPage {
  id: string;
  title: string;
}
`,
  "api/notion/notionTransformer.ts": `import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const transformNotionPage = (page: PageObjectResponse) => {
  return {
    id: page.id,
    title: page.properties.Name?.title[0]?.plain_text || "Sem título",
  };
};
`,
  "api/app/appClient.ts": `// Cliente para a API do seu aplicativo
export const appClient = {
  fetchData: async () => {
    // Implemente a lógica de chamada à API aqui
  },
};
`,
  "api/app/appTypes.ts": `// Defina os tipos TypeScript para a API do seu aplicativo aqui
export interface AppData {
  id: string;
  name: string;
}
`,
  "api/app/appTransformer.ts": `// Transformer para a API do seu aplicativo
export const transformAppData = (data: any) => {
  return {
    id: data.id,
    name: data.name,
  };
};
`,
  "providers/AuthProvider.tsx": `import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
`,
  "providers/AtividadesProvider.tsx": `import React, { createContext, useContext, useState } from "react";

interface AtividadesContextType {
  atividades: any[];
  setAtividades: (atividades: any[]) => void;
}

const AtividadesContext = createContext<AtividadesContextType | null>(null);

export const AtividadesProvider = ({ children }: { children: React.ReactNode }) => {
  const [atividades, setAtividades] = useState<any[]>([]);

  return (
    <AtividadesContext.Provider value={{ atividades, setAtividades }}>
      {children}
    </AtividadesContext.Provider>
  );
};

export const useAtividades = () => {
  const context = useContext(AtividadesContext);
  if (!context) {
    throw new Error("useAtividades deve ser usado dentro de um AtividadesProvider");
  }
  return context;
};
`,
  "providers/index.ts": `export { AuthProvider, useAuth } from "./AuthProvider";
export { AtividadesProvider, useAtividades } from "./AtividadesProvider";
`,
  "hooks/useAuth.ts": `import { useAuth } from "../providers/AuthProvider";

export const useAuth = () => {
  return useAuth();
};
`,
  "hooks/useAtividades.ts": `import { useAtividades } from "../providers/AtividadesProvider";

export const useAtividades = () => {
  return useAtividades();
};
`,
  "types/global.d.ts": `// Defina tipos globais aqui
export interface User {
  id: string;
  name: string;
}
`,
  "utils/transformers/notionTransformer.ts": `// Transformer global para a API do Notion
export { transformNotionPage } from "../../api/notion/notionTransformer";
`,
  "utils/transformers/appTransformer.ts": `// Transformer global para a API do seu aplicativo
export { transformAppData } from "../../api/app/appTransformer";
`,
  "utils/helpers.ts": `// Funções utilitárias gerais
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
`,
};

// Função para criar diretórios e arquivos
const createStructure = (basePath, structure) => {
  Object.keys(structure).forEach((filePath) => {
    const fullPath = path.join(basePath, filePath);
    const dir = path.dirname(fullPath);

    // Criar diretório se não existir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Criar arquivo com conteúdo
    fs.writeFileSync(fullPath, structure[filePath]);
    console.log(`Arquivo criado: ${fullPath}`);
  });
};

// Executar a criação da estrutura
createStructure(basePath, structure);

console.log("Estrutura criada com sucesso!");
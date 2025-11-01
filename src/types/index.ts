type Message = {
  role: "user" | "agent";
  content: string;
  timestamp: string;
  file?: {
    uri: string;
    mimeType?: string;
    name?: string;
  };
};

type JSONResponse = {
  extractable: number;
  errorMessage?: string;
  category: string;
  local: string;
  price: number;
  timestamp: Date;
  items?: Array<{ name: string; quantity: number; price: number }>;
};

export { Message, JSONResponse };

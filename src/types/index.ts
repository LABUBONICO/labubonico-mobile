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
  category?: string;
  local?: string;
  price?: string;
  timestamp?: string;
  items?: Array<{ name: string; price: string }>;
};

export { Message, JSONResponse };

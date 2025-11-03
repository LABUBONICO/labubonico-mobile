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
  category: string;
  local: string;
  price: number;
  timestamp: string;
  items?: Array<{ name: string; price: string }>;
  accuracy: number;
  errorMessage?: string;
};

export { Message, JSONResponse };

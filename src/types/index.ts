type Message = {
  type: "message" | "image";
  role: "user" | "agent";
  content: string;
  timestamp: string;
  imageUri?: string | undefined;
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

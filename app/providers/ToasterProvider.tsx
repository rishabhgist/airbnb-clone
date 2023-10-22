"use client";

import { Toaster } from "react-hot-toast";

interface ToasterProviderProps {}
const ToasterProvider: React.FC<ToasterProviderProps> = () => {
  return <Toaster />;
};

export default ToasterProvider;

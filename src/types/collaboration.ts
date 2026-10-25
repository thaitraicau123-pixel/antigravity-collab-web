export interface CursorPosition {
  lineNumber: number;
  column: number;
}

export interface Peer {
  id: string;
  name: string;
  color: string;
  cursor: CursorPosition;
}

export interface RoomInitData {
  code: string;
  language: string;
  currentUser: Peer;
  peers: Peer[];
}

export type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "html"
  | "css"
  | "cpp"
  | "java"
  | "json"
  | "markdown"
  | "sql";

export interface LanguageOption {
  id: SupportedLanguage;
  label: string;
  extension: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { id: "javascript", label: "JavaScript", extension: ".js" },
  { id: "typescript", label: "TypeScript", extension: ".ts" },
  { id: "python", label: "Python", extension: ".py" },
  { id: "html", label: "HTML", extension: ".html" },
  { id: "css", label: "CSS", extension: ".css" },
  { id: "cpp", label: "C++", extension: ".cpp" },
  { id: "java", label: "Java", extension: ".java" },
  { id: "json", label: "JSON", extension: ".json" },
  { id: "markdown", label: "Markdown", extension: ".md" },
  { id: "sql", label: "SQL", extension: ".sql" },
];

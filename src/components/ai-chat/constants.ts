
export const SUGGESTED_QUERIES = [
  {
    label: "CI Setup",
    query: "I would like to set up my CI to work with you, can you please assist me to do it."
  },
  {
    label: "Org Packages",
    query: "What are the most popular package being used in my organization? is it secured?"
  },
  {
    label: "Public package",
    query: "recommend me for a 3 npm packages for making http requests."
  },
  {
    label: "Blocked packages",
    query: "Which packages were blocked in the last 2 weeks?"
  },
  {
    label: "Sbom",
    query: "Please create an Sbom report for me for the packages that are being used in the last 30 days in my organization."
  }
];

export const INITIAL_MESSAGES: Message[] = [];

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

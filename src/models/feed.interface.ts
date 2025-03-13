export interface IFeed {
    id: string;
    title: string;
    description: string;
    url: string;
    source: string;
    date: Date;
    category: "politica" | "deportes" | "tecnologia" | "economia" | "otros";
  }
  
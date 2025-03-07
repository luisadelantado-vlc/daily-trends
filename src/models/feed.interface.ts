export interface IFeed {
    id: string;
    titulo: string;
    descripcion: string;
    url: string;
    fuente: string;
    fecha: Date;
    categoria: "politica" | "deportes" | "tecnologia" | "economia" | "otros";
    imagen?: string;
    destacada: boolean;
  }
  